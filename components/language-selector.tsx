'use client';

import { useLanguage } from './language-provider';
import { languages } from '@/lib/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const currentLang = languages.find(l => l.code === language);

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as typeof language)}>
      <SelectTrigger className="w-auto gap-2 border-none bg-transparent shadow-none text-white hover:bg-white/10">
        <Globe className="h-5 w-5" />
        <SelectValue>
          {currentLang?.nativeName}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code} className="text-base">
            <span className="font-medium">{lang.nativeName}</span>
            <span className="text-muted-foreground ml-2">({lang.name})</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
