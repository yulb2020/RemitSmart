export interface Currency {
  code: string;
  name: string;
  flag: string;
  symbol: string;
}

export const currencies: Currency[] = [
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', symbol: '﷼' },
  { code: 'KWD', name: 'Kuwaiti Dinar', flag: '🇰🇼', symbol: 'د.ك' },
  { code: 'QAR', name: 'Qatari Riyal', flag: '🇶🇦', symbol: 'ر.ق' },
  { code: 'OMR', name: 'Omani Rial', flag: '🇴🇲', symbol: 'ر.ع' },
  { code: 'BHD', name: 'Bahraini Dinar', flag: '🇧🇭', symbol: 'ب.د' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
  { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰', symbol: '₨' },
  { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭', symbol: '₱' },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩', symbol: '৳' },
  { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬', symbol: 'ج.م' },
  { code: 'NPR', name: 'Nepalese Rupee', flag: '🇳🇵', symbol: 'रू' },
];

export const currencyCodes = currencies.map((currency) => currency.code);

export function isSupportedCurrency(code: string): code is Currency['code'] {
  return currencyCodes.includes(code);
}

export function getCurrencyByCode(code: string): Currency | undefined {
  return currencies.find(c => c.code === code);
}
