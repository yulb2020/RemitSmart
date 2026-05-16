'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { currencies, getCurrencyByCode } from '@/lib/currencies';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ExchangeRatesResponse {
  baseCode: string;
  rates: Record<string, number>;
  timeLastUpdateUnix?: number;
  timeLastUpdateUtc?: string;
  timeNextUpdateUtc?: string;
  error?: string;
}

export function CurrencyConverter() {
  const { t, dir } = useLanguage();
  const [fromCurrency, setFromCurrency] = useState('AED');
  const [toCurrency, setToCurrency] = useState('PKR');
  const [amount, setAmount] = useState(1000);
  const [ratesData, setRatesData] = useState<ExchangeRatesResponse | null>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [rateError, setRateError] = useState<string | null>(null);

  const fromCurrencyData = getCurrencyByCode(fromCurrency);
  const toCurrencyData = getCurrencyByCode(toCurrency);
  const exchangeRate = ratesData?.rates[toCurrency] ?? null;
  const convertedAmount = exchangeRate === null ? null : amount * exchangeRate;

  useEffect(() => {
    const controller = new AbortController();

    async function loadRates() {
      setIsLoadingRates(true);
      setRateError(null);

      try {
        const response = await fetch(`/api/exchange-rates?base=${fromCurrency}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as ExchangeRatesResponse;

        if (!response.ok) {
          throw new Error(data.error ?? 'Unable to load exchange rates.');
        }

        setRatesData(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setRatesData(null);
        setRateError(error instanceof Error ? error.message : 'Unable to load exchange rates.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingRates(false);
        }
      }
    }

    loadRates();

    return () => controller.abort();
  }, [fromCurrency]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatUpdateTime = () => {
    if (ratesData?.timeLastUpdateUnix) {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(ratesData.timeLastUpdateUnix * 1000));
    }

    return ratesData?.timeLastUpdateUtc;
  };

  const lastUpdated = formatUpdateTime();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-4">
      {/* From Card */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
        <p className="text-sm text-gray-500 mb-3 font-medium">{t.send}</p>
        
        <div className="flex items-center gap-4">
          {/* Flag and Currency Selector */}
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="w-auto border-none shadow-none p-0 h-auto bg-transparent gap-2">
              <span className="text-5xl">{fromCurrencyData?.flag}</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code} className="text-lg py-3">
                  <span className="text-2xl mr-3">{currency.flag}</span>
                  <span className="font-bold">{currency.code}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Amount Input */}
          <div className="flex-1 text-right">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full text-4xl font-bold text-[#0F5132] text-right bg-transparent border-none outline-none"
              placeholder="0"
            />
            <p className="text-2xl font-bold text-[#0F5132] mt-1">{fromCurrency}</p>
          </div>
        </div>
      </div>

      {/* Arrow Indicator */}
      <div className="flex justify-center">
        <div className="bg-[#0F5132] text-white rounded-full p-3 shadow-lg">
          <ArrowIcon className="h-6 w-6 rtl-flip" />
        </div>
      </div>

      {/* To Card */}
      <div className="bg-[#0F5132] rounded-2xl p-5 shadow-lg">
        <p className="text-sm text-white/70 mb-3 font-medium">{t.receive}</p>
        
        <div className="flex items-center gap-4">
          {/* Flag and Currency Selector */}
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="w-auto border-none shadow-none p-0 h-auto bg-transparent gap-2 text-white [&_svg]:text-white">
              <span className="text-5xl">{toCurrencyData?.flag}</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code} className="text-lg py-3">
                  <span className="text-2xl mr-3">{currency.flag}</span>
                  <span className="font-bold">{currency.code}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Converted Amount Display */}
          <div className="flex-1 text-right">
            <p className="text-4xl font-bold text-[#22C55E]">
              {isLoadingRates ? '...' : convertedAmount === null ? '--' : formatNumber(convertedAmount)}
            </p>
            <p className="text-2xl font-bold text-white mt-1">{toCurrency}</p>
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-white/80 text-sm">
            {t.rate}: 1 {fromCurrency} ={' '}
            {isLoadingRates ? '...' : exchangeRate === null ? '--' : formatNumber(exchangeRate)} {toCurrency}
          </p>
          {lastUpdated && !rateError && (
            <p className="text-white/60 text-xs mt-1">
              {t.rateUpdated}: {lastUpdated}
            </p>
          )}
          {rateError && (
            <p className="text-red-100 text-xs mt-1">
              {t.rateUnavailable}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
