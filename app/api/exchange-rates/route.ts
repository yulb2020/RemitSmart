import { NextResponse } from 'next/server';

import { isSupportedCurrency } from '@/lib/currencies';

interface ExchangeRateApiResponse {
  result: 'success' | 'error';
  documentation?: string;
  terms_of_use?: string;
  time_last_update_unix?: number;
  time_last_update_utc?: string;
  time_next_update_unix?: number;
  time_next_update_utc?: string;
  base_code?: string;
  conversion_rates?: Record<string, number>;
  'error-type'?: string;
}

export async function GET(request: Request) {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Exchange rate API key is not configured.' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const base = searchParams.get('base')?.toUpperCase() ?? 'AED';

  if (!isSupportedCurrency(base)) {
    return NextResponse.json(
      { error: `Unsupported base currency: ${base}` },
      { status: 400 },
    );
  }

  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`,
    {
      next: { revalidate: 60 * 60 },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Unable to fetch exchange rates.' },
      { status: 502 },
    );
  }

  const data = (await response.json()) as ExchangeRateApiResponse;

  if (data.result !== 'success' || !data.conversion_rates) {
    return NextResponse.json(
      {
        error: 'Exchange rate provider returned an error.',
        providerError: data['error-type'],
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    baseCode: data.base_code ?? base,
    rates: data.conversion_rates,
    timeLastUpdateUnix: data.time_last_update_unix,
    timeLastUpdateUtc: data.time_last_update_utc,
    timeNextUpdateUnix: data.time_next_update_unix,
    timeNextUpdateUtc: data.time_next_update_utc,
  });
}
