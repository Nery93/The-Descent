'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phase, getPhaseColor } from '@/lib/timeline-data';

interface TimelineSpineProps {
  totalEvents: number;
  currentPhase: Phase;
}

export function TimelineSpine({ totalEvents, currentPhase }: TimelineSpineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  
  const { scrollYProgress } = useScroll();
  
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setLineHeight(containerRef.current.offsetHeight);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [totalEvents]);

  const phaseColor = getPhaseColor(currentPhase);
  const spineWidth = currentPhase === 3 ? 12 : 8;

  return (
    <div 
      ref={containerRef}
      className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-10 pointer-events-none hidden lg:block"
      style={{ width: spineWidth }}
    >
      {/* Background line (static) */}
      <div 
        className="absolute inset-0 rounded-full scratched-metal"
        style={{ 
          backgroundColor: '#1a1a1a',
          width: spineWidth,
        }}
      />
      
      {/* Animated progress line */}
      <motion.div
        className="absolute top-0 left-0 right-0 rounded-full origin-top"
        style={{
          backgroundColor: phaseColor,
          scaleY: pathLength,
          boxShadow: `0 0 20px ${phaseColor}40, 0 0 40px ${phaseColor}20`,
        }}
      />
      
      {/* SVG for the spine texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="scratches" patternUnits="userSpaceOnUse" width="20" height="40">
            <line x1="0" y1="0" x2="20" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="10" y1="0" x2="30" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#scratches)" />
      </svg>
    </div>
  );
}
