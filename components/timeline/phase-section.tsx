'use client';

import { getPhaseColor, Phase, phaseInfo } from '@/lib/timeline-data';
import { motion } from 'framer-motion';

interface PhaseSectionProps {
  phase: Phase;
}

export function PhaseSection({ phase }: PhaseSectionProps) {
  const info = phaseInfo[phase];
  const color = getPhaseColor(phase);
  
  // Phase 3 and 4 need light text for contrast against dark backgrounds
  const isDarkPhase = phase === 3 || phase === 4;
  const textColor = isDarkPhase ? '#f5f5f5' : color;
  const mutedTextColor = isDarkPhase ? '#cccccc' : '#888';
  const subtleTextColor = isDarkPhase ? '#999999' : '#666';
  
  // Roman numerals for each phase
  const romanNumeral = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV' }[phase];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-16 lg:py-24"
      data-phase={phase}
    >
      {/* Phase divider line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20" style={{ color }} />
      
      <div className="relative max-w-2xl mx-auto text-center px-4">
        {/* Roman numeral */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="text-7xl lg:text-9xl font-serif font-bold mb-4"
          style={{ color: isDarkPhase ? '#f5f5f550' : `${color}60`, opacity: isDarkPhase ? 0.3 : 0.2 }}
        >
          {romanNumeral}
        </motion.div>
        
        {/* Phase name */}
        <h2 
          className="font-serif text-3xl lg:text-5xl font-semibold mb-3"
          style={{ color: textColor }}
        >
          {info.name}
        </h2>
        
        {/* Years */}
        <div 
          className="text-base uppercase tracking-[0.3em] mb-4"
          style={{ color: subtleTextColor }}
        >
          {info.years}
        </div>
        
        {/* Description */}
        <p 
          className="text-lg max-w-lg mx-auto leading-relaxed"
          style={{ color: mutedTextColor }}
        >
          {info.description}
        </p>
        
        {/* Decorative elements */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="w-8 h-px" style={{ backgroundColor: color }} />
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <div className="w-8 h-px" style={{ backgroundColor: color }} />
        </div>
      </div>
    </motion.div>
  );
}
