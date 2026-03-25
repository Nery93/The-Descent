'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/messages/en.json';
import pt from '@/messages/pt.json';

export type Locale = 'en' | 'pt';

const messages: Record<Locale, typeof en> = { en, pt };

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale;
    if (saved === 'en' || saved === 'pt') {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('locale', l);
  };

  // Avoid hydration mismatch — render with 'en' on server, update on client
  const activeLocale = mounted ? locale : 'en';

  return (
    <LanguageContext.Provider value={{ locale: activeLocale, setLocale }}>
      <NextIntlClientProvider locale={activeLocale} messages={messages[activeLocale]}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
