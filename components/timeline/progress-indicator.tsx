'use client';

import { getPhaseColor, Phase, phaseInfo, TimelineEvent } from '@/lib/timeline-data';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProgressIndicatorProps {
  currentYear: number;
  currentPhase: Phase;
  currentEvent?: TimelineEvent | null;
}

export function ProgressIndicator({ currentYear, currentPhase, currentEvent }: ProgressIndicatorProps) {
  // Track window scroll - no container target needed
  const { scrollYProgress } = useScroll();
  
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  const phaseColor = getPhaseColor(currentPhase);
  const phase = phaseInfo[currentPhase];

  // Calculate progress position (1918-1946 range to include Nuremberg Trials)
  const yearProgress = Math.min(Math.max((currentYear - 1918) / (1946 - 1918), 0), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b-4 border-white/20"

    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Current year - Large display */}
          <div className="flex items-center gap-4">
            <motion.span
              key={currentYear}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              style={{
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {currentYear}
            </motion.span>
            
            <div className="hidden sm:block">
              <motion.div 
                key={currentPhase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs uppercase tracking-wider text-white/70 font-medium"
              >
                Phase {currentPhase} of 4
              </motion.div>
              <motion.div 
                key={phase.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium text-[#d1d5db]"
              >
                {phase.name}
              </motion.div>
            </div>
          </div>
          
          {/* Progress bar with year markers */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              {/* Year labels */}
              <div
                className="flex items-center justify-between text-sm mb-2"
                style={{ color: '#9ca3af', textShadow: '0 0 8px rgba(255,255,255,0.3)' }}
              >
                <span className="tabular-nums">1918</span>
                <span className="tabular-nums">1933</span>
                <span className="tabular-nums">1939</span>
                <span className="tabular-nums">1944</span>
                <span className="tabular-nums">1946</span>
              </div>
              
              {/* Progress track */}
              <div className="relative h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                {/* Phase sections: 1918-1933 (54%), 1933-1939 (21%), 1939-1944 (18%), 1944-1946 (7%) */}
                <div className="absolute inset-0 flex">
                  <div className="h-full bg-[#3b4c5c]/20" style={{ width: '54%' }} />
                  <div className="h-full bg-[#8b1a1a]/20" style={{ width: '21%' }} />
                  <div className="h-full bg-[#4a1515]/20" style={{ width: '18%' }} />
                  <div className="h-full bg-[#4a5568]/20" style={{ width: '7%' }} />
                </div>
                
                {/* Progress fill */}
                <motion.div
                  className="absolute h-full rounded-full origin-left"
                  style={{
                    width: `${yearProgress * 100}%`,
                    background: `linear-gradient(90deg, #3b4c5c, #8b1a1a 54%, #4a1515 75%, #4a5568 93%)`,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                
                {/* Current position dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg"
                  style={{
                    left: `calc(${yearProgress * 100}% - 8px)`,
                    backgroundColor: phaseColor,
                    boxShadow: `0 0 12px ${phaseColor}`,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              
              {/* Phase divider lines */}
              <div className="absolute top-6 left-[54%] w-px h-3 bg-[#3a3a3a]" />
              <div className="absolute top-6 left-[75%] w-px h-3 bg-[#3a3a3a]" />
              <div className="absolute top-6 left-[93%] w-px h-3 bg-[#3a3a3a]" />
            </div>
          </div>
          
          {/* Phase indicators */}
          <div className="hidden lg:flex items-center gap-3">
            {([1, 2, 3, 4] as Phase[]).map((p) => (
              <div key={p} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 hover:opacity-100 ${
                    p === currentPhase
                      ? 'scale-125 border-2 border-white opacity-100 ring-2 ring-white/20'
                      : 'border-2 border-white/40 opacity-60 hover:border-white'
                  }`}
                  style={{
                    backgroundColor: p === currentPhase ? getPhaseColor(p) : 'transparent',
                  }}
                  title={`Phase ${p}: ${phaseInfo[p].name}`}
                  aria-label={`Phase ${p}: ${phaseInfo[p].name}${p === currentPhase ? ' (current)' : ''}`}
                  role="img"
                />
                {p < 4 && <div className="w-3 h-px bg-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Thin progress line at very top */}
      <motion.div
        className="absolute top-0 left-0 h-[6px]"
        style={{
          width: progressWidth,
          background: `linear-gradient(90deg, #6b9ab8, #dc2626 50%, #991b1b 75%, #9ca3af 93%)`,
        }}
      />
    </motion.div>
  );
}
