'use client';

import { useCountUp } from '@/hooks/use-count-up';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface AnimatedStatProps {
  end: number;
  suffix?: string;
  label: string;
  delay: number;
  inView: boolean;
}

function AnimatedStat({ end, suffix = '', label, delay, inView }: AnimatedStatProps) {
  const { formattedValue } = useCountUp({
    end,
    duration: 2500,
    delay,
    easing: 'easeOut',
    enabled: inView,
  });

  const finalFormatted = end.toLocaleString('en-US') + suffix;

  return (
    <div className="text-center">
      <div className="relative inline-block">
        {/* Ghost element reserves width so layout never shifts */}
        <div
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold invisible select-none"
          style={{ fontVariantNumeric: 'tabular-nums' }}
          aria-hidden="true"
        >
          {finalFormatted}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#f5f5f5] tabular-nums"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {formattedValue}{suffix}
        </div>
      </div>
      <div className="text-[10px] sm:text-sm text-[#999] uppercase tracking-wider mt-1 sm:mt-2 leading-tight">
        {label}
      </div>
    </div>
  );
}

interface HeroSectionProps {
  warningAccepted: boolean;
}

export function HeroSection({ warningAccepted }: HeroSectionProps) {
  const t = useTranslations('home');
  const ref = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax effect - background moves slower than content
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Detect when stats are in view for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Detect reduced motion after mount to avoid SSR/client mismatch
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background photo with parallax and Ken Burns effect */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: prefersReducedMotion ? 0 : backgroundY }}
      >
        {/* Historical photo - Liberation at Bergen-Belsen with Ken Burns zoom */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100"
          initial={{ scale: 1 }}
          animate={{ scale: prefersReducedMotion ? 1 : 1.02 }}
          transition={{ 
            duration: 20, 
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: `url('/events/Hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </motion.div>

        {/* Photo description for context */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="hidden sm:block absolute bottom-32 left-1/2 -translate-x-1/2 text-center opacity-40">
            <p className="text-sm text-[#888] italic font-serif max-w-md">
              [Historical Photo: Liberated prisoners behind barbed wire, Bergen-Belsen 1945]
            </p>
          </div>
        </div>
        
        {/* Dark overlay for readability - stronger at 75% */}
        <div className="absolute inset-0 bg-black/75" />
        
        {/* Sepia tint for aged effect */}
        <div className="absolute inset-0 bg-[#704214]/8 mix-blend-overlay" />
      </motion.div>

      {/* Film grain enhanced */}
      <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <filter id="noise-hero">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#noise-hero)" opacity="0.5" />
        </svg>
      </div>

      {/* Vignette enhanced */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity, y: contentY, scale }}
        className="relative z-20 text-center px-5 max-w-4xl mx-auto w-full"
      >
        {/* Top badge — pushed below fixed buttons on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 sm:mb-8 mt-20 sm:mt-0"
        >
          <span className="inline-block px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#8b1a1a] border border-[#8b1a1a]/60 rounded-sm bg-black/30 backdrop-blur-sm">
            {t('subtitle')}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#e8e8e8] leading-[1.1] mb-4 sm:mb-6"
        >
          <span className="block text-balance">{t('title')}</span>
          <span
            className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mt-2 opacity-60"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {t('years')}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base sm:text-xl text-[#b0b4bb] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 text-balance"
        >
          {t('description')}
        </motion.p>

        {/* Stats — 3-column grid on mobile, horizontal row on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-10 sm:mb-16"
          aria-label="Key statistics"
        >
          {/* Mobile: 3-col grid with border dividers */}
          <div className="grid grid-cols-3 sm:hidden border border-[#2a2a2a] rounded-sm overflow-hidden">
            {[
              { end: 6000000, label: t('jewsMurdered'), delay: 0 },
              { end: 27, label: t('yearsCount'), delay: 300 },
              { end: 17, label: t('keyEvents'), delay: 600 },
            ].map((stat, i) => (
              <div
                key={i}
                className={`py-4 px-2 bg-black/40 ${i < 2 ? 'border-r border-[#2a2a2a]' : ''}`}
              >
                <AnimatedStat
                  end={stat.end}
                  label={stat.label}
                  delay={stat.delay}
                  inView={statsInView && warningAccepted}
                />
              </div>
            ))}
          </div>

          {/* Desktop: horizontal flex with vertical dividers */}
          <div className="hidden sm:flex items-center justify-center gap-16 lg:gap-24 max-w-3xl mx-auto">
            <AnimatedStat end={6000000} label={t('jewsMurdered')} delay={0} inView={statsInView && warningAccepted} />
            <div className="w-px h-20 bg-[#333]" aria-hidden="true" />
            <AnimatedStat end={27} label={t('yearsCount')} delay={300} inView={statsInView && warningAccepted} />
            <div className="w-px h-20 bg-[#333]" aria-hidden="true" />
            <AnimatedStat end={17} label={t('keyEvents')} delay={600} inView={statsInView && warningAccepted} />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-[#c9ced6]">
            {t('scrollToBegin')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <svg className="w-6 h-6 text-[#c9ced6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
    </div>
  );
}
