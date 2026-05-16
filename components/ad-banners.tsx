'use client';

import { useLanguage } from './language-provider';

export function AdBanners() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Ad Banner 1 */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 min-h-[120px] flex flex-col justify-between border border-gray-200">
        <span className="text-[10px] text-gray-400 uppercase tracking-wide">{t.sponsored}</span>
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-500 text-xs">AD</span>
            </div>
            <p className="text-xs text-gray-500">Your Ad Here</p>
          </div>
        </div>
      </div>

      {/* Ad Banner 2 */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 min-h-[120px] flex flex-col justify-between border border-gray-200">
        <span className="text-[10px] text-gray-400 uppercase tracking-wide">{t.sponsored}</span>
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-gray-500 text-xs">AD</span>
            </div>
            <p className="text-xs text-gray-500">Your Ad Here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
