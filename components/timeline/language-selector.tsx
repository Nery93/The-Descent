'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Language = 'EN' | 'PT';

interface LanguageSelectorProps {
  language: Language;
  onChange: (lang: Language) => void;
}

export function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const select = (lang: Language) => {
    onChange(lang);
    setOpen(false);
  };

  return (
    <div ref={ref} className="fixed top-4 right-20 z-50">
      {/* Trigger button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-zinc-900/95 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center text-white font-bold text-sm hover:bg-zinc-800 hover:border-white hover:scale-105 transition-all cursor-pointer shadow-lg shadow-black/50"
        aria-label="Select language"
      >
        {language}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-14 right-0 bg-black/90 border border-white/20 rounded-sm overflow-hidden shadow-xl shadow-black/60 min-w-[128px]"
          >
            {(['EN', 'PT'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => select(lang)}
                className="w-full h-10 px-4 flex items-center gap-3 text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span
                  className="font-bold text-xs"
                  style={{ color: lang === language ? 'white' : 'rgba(255,255,255,0.5)' }}
                >
                  {lang}
                </span>
                <span style={{ color: lang === language ? 'white' : 'rgba(255,255,255,0.5)' }}>
                  {lang === 'EN' ? 'English' : 'Português'}
                </span>
                {lang === language && (
                  <svg className="w-3 h-3 text-white ml-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
