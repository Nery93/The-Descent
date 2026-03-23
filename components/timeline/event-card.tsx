'use client';

import { motion } from 'framer-motion';
import { TimelineEvent, getPhaseColor } from '@/lib/timeline-data';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: TimelineEvent;
  index: number;
  onClick: () => void;
}

export function EventCard({ event, index, onClick }: EventCardProps) {
  const isLeft = index % 2 === 0;
  const phaseColor = getPhaseColor(event.phase);

  const glowIntensity: Record<number, string> = {
    1: '0 0 40px rgba(59, 76, 92, 0.3)',
    2: '0 0 50px rgba(139, 26, 26, 0.4)',
    3: '0 0 60px rgba(139, 26, 26, 0.5)',
    4: '0 0 45px rgba(74, 85, 104, 0.4)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'relative w-full lg:w-[calc(50%-80px)]',
        isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
      )}
    >
      {/* Connector line to spine (desktop only) */}
      <div
        className={cn(
          'hidden lg:block absolute top-1/2 -translate-y-1/2 h-[3px]',
          isLeft ? 'right-0 w-12' : 'left-0 w-12'
        )}
        style={{
          background: `linear-gradient(${isLeft ? '90deg' : '270deg'}, ${phaseColor}, transparent)`,
        }}
      />

      {/* Spine dot (desktop only) */}
      <motion.div
        className={cn(
          'hidden lg:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center z-20',
          isLeft ? '-right-[72px]' : '-left-[72px]'
        )}
        style={{
          backgroundColor: '#0a0a0a',
          border: `3px solid ${phaseColor}`,
        }}
        whileHover={{
          scale: 1.2,
          boxShadow: `0 0 40px ${phaseColor}`,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: phaseColor }} />
      </motion.div>

      {/* Card */}
      <motion.button
        onClick={onClick}
        className={cn(
          'group w-full text-left rounded-sm overflow-hidden cursor-pointer',
          'bg-[#0a0a0a]/90 backdrop-blur-sm',
          'border border-[#2a2a2a] hover:border-opacity-50',
          'transition-all duration-300',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
        )}
        style={{ '--phase-color': phaseColor } as React.CSSProperties}
        whileHover={{
          y: -8,
          boxShadow: glowIntensity[event.phase],
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Top accent line */}
        <div className="h-1 w-full" style={{ backgroundColor: phaseColor }} />

        <div className="p-6 lg:p-8">
          {/* Year + title + photo */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div
                className="text-sm uppercase tracking-[0.2em] mb-2 font-medium"
                style={{ color: phaseColor }}
              >
                {event.month && `${event.month} `}{event.year}
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#f5f5f5] leading-tight text-balance">
                {event.title}
              </h3>
            </div>

            {/* Photo thumbnail */}
            <div
              className="w-20 h-20 rounded flex-shrink-0 overflow-hidden border border-white/20 bg-cover bg-center"
              style={{
                backgroundImage: event.photos[0]?.src
                  ? `url('${event.photos[0].src}')`
                  : `linear-gradient(135deg, ${phaseColor}20, #0a0a0a)`,
              }}
            />
          </div>

          {/* Subtitle */}
          <p className="text-base lg:text-lg text-[#999] leading-relaxed mb-3">
            {event.subtitle}
          </p>

          {/* Click indicator */}
          <div className="flex items-center gap-2 text-sm mt-4 text-[#9ca3af] group-hover:text-white transition-colors duration-200">
            <span>Click to explore</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
