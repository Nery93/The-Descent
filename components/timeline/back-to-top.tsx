'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-12 md:h-12 rounded-full 
                     bg-white/10 border border-white/30 backdrop-blur-md
                     flex items-center justify-center
                     hover:bg-white/20 hover:scale-105
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                     transition-all duration-200 ease-out
                     cursor-pointer"
          style={{
            bottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
            right: 'max(24px, env(safe-area-inset-right, 24px))',
          }}
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
