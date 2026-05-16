'use client';

import { useLanguage } from './language-provider';
import { Sparkles } from 'lucide-react';

export function AIPredictionCard() {
  const { t } = useLanguage();

  return (
    <div className="bg-amber-400 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-amber-500 rounded-full p-2">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-amber-900">{t.aiPredictionTitle}</h3>
      </div>
      <p className="text-xl font-semibold text-amber-900 leading-relaxed">
        {t.aiPrediction}
      </p>
    </div>
  );
}
