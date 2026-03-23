'use client';

import { motion } from 'framer-motion';
import { Phase, phaseInfo, getPhaseColor, TimelineEvent } from '@/lib/timeline-data';
import { cn } from '@/lib/utils';

interface BreadcrumbNavProps {
  currentPhase: Phase;
  currentEvent?: TimelineEvent | null;
  visible: boolean;
}

export function BreadcrumbNav({ currentPhase, currentEvent, visible }: BreadcrumbNavProps) {
  const phase = phaseInfo[currentPhase];
  const phaseColor = getPhaseColor(currentPhase);

  if (!visible) return null;

  const scrollToPhase = (phaseNum: Phase) => {
    const phaseSection = document.querySelector(`[data-phase="${phaseNum}"]`);
    if (phaseSection) {
      phaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-14 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-[#1a1a1a]"
      aria-label="Breadcrumb navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <ol className="flex items-center gap-2 text-[14px] flex-wrap">
          {/* Home */}
          <li>
            <button
              onClick={scrollToTop}
              className="text-[#666] hover:text-[#e8e8e8] transition-colors"
            >
              The Descent
            </button>
          </li>

          <li className="text-[#444]" aria-hidden="true">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </li>

          {/* Phase */}
          <li>
            <button
              onClick={() => scrollToPhase(currentPhase)}
              className={cn(
                'font-medium transition-colors hover:opacity-80',
              )}
              style={{ color: phaseColor }}
            >
              {phase.name}
            </button>
          </li>

          {/* Current Event (if any) */}
          {currentEvent && (
            <>
              <li className="text-[#444]" aria-hidden="true">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <span className="text-[#e8e8e8] font-medium">
                  {currentEvent.year}: {currentEvent.title}
                </span>
              </li>
            </>
          )}
        </ol>
      </div>
    </motion.nav>
  );
}
