'use client';

import { useLanguage, type Locale } from '@/components/language-provider';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
      <LangButton code="en" label="EN" current={locale} onSelect={setLocale} />
      <span className="text-white/20 text-xs select-none">|</span>
      <LangButton code="pt" label="PT" current={locale} onSelect={setLocale} />
    </div>
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
