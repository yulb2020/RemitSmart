'use client';

import { LanguageProvider } from '@/components/language-provider';
import { Header } from '@/components/header';
import { CurrencyConverter } from '@/components/currency-converter';
import { AIPredictionCard } from '@/components/ai-prediction-card';
import { AdBanners } from '@/components/ad-banners';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
          {/* Currency Converter */}
          <CurrencyConverter />
          
          {/* AI Prediction Card */}
          <AIPredictionCard />
          
          {/* Ad Banners */}
          <AdBanners />
        </main>
      </div>
    </LanguageProvider>
  );
}
