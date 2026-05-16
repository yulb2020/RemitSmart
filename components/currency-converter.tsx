'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './language-provider';
import { currencies, getCurrencyByCode } from '@/lib/currencies';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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
  const [amountInput, setAmountInput] = useState('1000');
  const [ratesData, setRatesData] = useState<ExchangeRatesResponse | null>(null);
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [rateError, setRateError] = useState<string | null>(null);

  const fromCurrencyData = getCurrencyByCode(fromCurrency);
  const toCurrencyData = getCurrencyByCode(toCurrency);
  const exchangeRate = ratesData?.rates[toCurrency] ?? null;
  const amount = amountInput === '' ? 0 : Number(amountInput);
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

  const handleAmountChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 20);
    setAmountInput(digitsOnly);
  };

  const getAdaptiveAmountClass = (value: string) => {
    if (value.length > 18) return 'text-xl sm:text-2xl';
    if (value.length > 14) return 'text-2xl sm:text-3xl';
    if (value.length > 10) return 'text-3xl';
    return 'text-4xl';
  };

  const convertedAmountText = convertedAmount === null ? '' : formatNumber(convertedAmount);

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
            <SelectTrigger className="w-auto min-w-[9rem] border-none shadow-none p-0 h-auto bg-transparent gap-3">
              <span className="text-5xl shrink-0">{fromCurrencyData?.flag}</span>
              <span className="font-bold text-xl text-[#0F5132]">{fromCurrency}</span>
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
          <div className="flex-1 min-w-0 text-right">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={20}
              value={amountInput}
              onChange={(e) => handleAmountChange(e.target.value)}
              className={`w-full min-w-0 font-bold text-[#0F5132] text-right bg-transparent border-none outline-none tabular-nums ${getAdaptiveAmountClass(amountInput)}`}
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
            <SelectTrigger className="w-auto min-w-[9rem] border-none shadow-none p-0 h-auto bg-transparent gap-3 text-white [&_svg]:text-white">
              <span className="text-5xl shrink-0">{toCurrencyData?.flag}</span>
              <span className="font-bold text-xl text-white">{toCurrency}</span>
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
          <div className="flex-1 min-w-0 text-right">
            <p className={`max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-[#22C55E] tabular-nums ${getAdaptiveAmountClass(convertedAmountText)}`}>
              {isLoadingRates ? '...' : convertedAmount === null ? '--' : convertedAmountText}
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
