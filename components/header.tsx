'use client';

import { LanguageSelector } from './language-selector';

export function Header() {
  return (
    <header className="bg-[#0F5132] text-white px-4 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#0F5132] font-bold text-lg">R</span>
          </div>
          <span className="text-xl font-bold">RemitSmart</span>
        </div>

        {/* Language Selector */}
        <LanguageSelector />
      </div>
    </header>
  );
}
