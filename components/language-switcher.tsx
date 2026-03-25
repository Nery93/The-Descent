'use client';

import { useLanguage, type Locale } from '@/components/language-provider';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1"></div>
  );
}

function LangButton({
  code,
  label,
  current,
  onSelect,
}: {
  code: Locale;
  label: string;
  current: Locale;
  onSelect: (l: Locale) => void;
}) {
  const isActive = current === code;
  return (
    <button
      onClick={() => onSelect(code)}
      aria-label={`Switch to ${label}`}
      aria-pressed={isActive}
      className={`text-xs font-medium tracking-widest px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
        isActive
          ? 'text-white'
          : 'text-white/40 hover:text-white/70'
      }`}
    >
      {label}
    </button>
  );
}
