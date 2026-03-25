'use client';

import { motion } from 'framer-motion';

export type Language = 'EN' | 'PT';

interface LanguageSelectorProps {
  language: Language;
  onChange: (lang: Language) => void;
}

export function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="flex items-center h-12 bg-zinc-900/95 backdrop-blur-sm border-2 border-white/60 rounded-full shadow-lg shadow-black/50"
    >
      <button
        onClick={() => onChange('EN')}
        className={`px-4 h-full text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer rounded-l-full ${
          language === 'EN' ? 'text-white' : 'text-white/35 hover:text-white/65'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="w-px h-4 bg-white/30 shrink-0" />
      <button
        onClick={() => onChange('PT')}
        className={`px-4 h-full text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer rounded-r-full ${
          language === 'PT' ? 'text-white' : 'text-white/35 hover:text-white/65'
        }`}
        aria-label="Switch to Português"
      >
        PT
      </button>
    </motion.div>
  );
}
