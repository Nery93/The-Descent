'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Language } from './language-selector';

interface ContentWarningProps {
  onAccept: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function ContentWarning({ onAccept, language, onLanguageChange }: ContentWarningProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-6"
      >
        {/* Subtle film grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full">
            <defs>
              <filter id="noise-warning">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#noise-warning)" opacity="0.5" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative max-w-md w-full text-center"
        >
          {/* Language selector */}
          <div className="flex justify-center gap-3 mb-10">
            {(['EN', 'PT'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className="flex items-center gap-2 px-4 py-2 rounded-sm text-sm transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: lang === language ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: lang === language ? '2px solid white' : '1px solid rgba(255,255,255,0.3)',
                  color: lang === language ? 'white' : 'rgba(255,255,255,0.6)',
                }}
              >
                <span className="font-bold">{lang}</span>
                <span>{lang === 'EN' ? 'English' : 'Português'}</span>
              </button>
            ))}
          </div>

          {/* Warning icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full border border-[#8b1a1a]/60 flex items-center justify-center bg-[#8b1a1a]/10">
              <svg className="w-8 h-8 text-[#8b1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b1a1a] mb-4">
            {language === 'EN' ? 'Content Warning' : 'Aviso de Conteúdo'}
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#e8e8e8] mb-8 leading-snug">
            {language === 'EN' ? (
              <>This digital memorial contains<br />disturbing content</>
            ) : (
              <>Este memorial digital contém<br />conteúdo perturbador</>
            )}
          </h1>

          {/* Warning items */}
          <div className="text-left space-y-3 mb-10 px-4">
            {(language === 'EN' ? [
              'Disturbing historical images',
              'Accounts of violence and genocide',
              'Sensitive content about the Holocaust',
            ] : [
              'Imagens históricas perturbadoras',
              'Relatos de violência e genocídio',
              'Conteúdo sensível sobre o Holocausto',
            ]).map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 h-1 rounded-full bg-[#8b1a1a] mt-[0.45rem]" />
                <p className="text-[#9ca3af] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-xs text-[#555] mb-10 leading-relaxed px-4">
            {language === 'EN'
              ? 'This site was created to educate and honour the victims. We approach this subject with the utmost respect. Recommended for ages 16 and above.'
              : 'Este site foi criado para educar e honrar as vítimas. Abordamos este tema com o máximo respeito. Recomendado para maiores de 16 anos.'}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-[#1a1a1a] mb-8" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onAccept}
              className="px-8 py-3 bg-[#8b1a1a]/20 border border-[#8b1a1a]/60 text-[#e8e8e8] text-sm hover:bg-[#8b1a1a]/30 hover:border-[#8b1a1a] transition-all duration-200 rounded-sm cursor-pointer"
            >
              {language === 'EN' ? 'I understand and wish to continue' : 'Entendo e desejo continuar'}
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 border border-[#333] text-[#555] text-sm hover:text-[#888] hover:border-[#444] transition-all duration-200 rounded-sm cursor-pointer"
            >
              {language === 'EN' ? 'Exit' : 'Sair'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
