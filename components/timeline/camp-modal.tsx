'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Camp, campTypeInfo, formatDeaths } from '@/lib/camp-data';
import { timelineEvents } from '@/lib/timeline-data';

interface CampModalProps {
  camp: Camp | null;
  onClose: () => void;
}

export function CampModal({ camp, onClose }: CampModalProps) {
  const router = useRouter();
  const t = useTranslations('map');
  const tDesc = useTranslations('campDescriptions');
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && camp) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camp, onClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (camp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [camp]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Get related timeline event if exists
  const relatedEvent = camp?.relatedEventId 
    ? timelineEvents.find(e => e.id === camp.relatedEventId)
    : null;

  if (!camp) return null;

  const typeInfo = campTypeInfo[camp.type];

  return (
    <AnimatePresence>
      {camp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#2a2a2a] rounded-sm shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:scale-110 transition-all duration-200"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-6 lg:p-8 border-b border-[#1a1a1a]">
              <div className="flex items-start gap-4">
                <div
                  className="w-4 h-4 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: typeInfo.color }}
                />
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: typeInfo.color }}>
                    {t(camp.type as 'death' | 'concentration' | 'transit' | 'labor')}
                  </p>
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#e8e8e8] mb-2">
                    {camp.name}
                  </h2>
                  <p className="text-[#888]">
                    {camp.location}, {camp.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 lg:p-8 bg-[#0d0d0d] border-b border-[#1a1a1a]">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#666] mb-1">{t('deaths')}</p>
                <p className="text-xl font-bold text-[#dc2626] tabular-nums">
                  {camp.deaths.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#666] mb-1">{t('operational')}</p>
                <p className="text-lg text-[#e8e8e8]">{camp.operationalDates}</p>
              </div>
              {camp.liberatedBy && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#666] mb-1">{t('liberatedBy')}</p>
                  <p className="text-sm text-[#aaa]">{camp.liberatedBy}</p>
                </div>
              )}
              {camp.liberationDate && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#666] mb-1">{t('liberationDate')}</p>
                  <p className="text-sm text-[#aaa]">{camp.liberationDate}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="p-6 lg:p-8">
              <h3 className="text-xs uppercase tracking-wider text-[#666] mb-4">{t('historicalContext')}</h3>
              <p className="text-[#ccc] leading-relaxed text-lg">
                {tDesc(camp.id as any)}
              </p>
            </div>

            {/* Coordinates */}
            <div className="px-6 lg:px-8 pb-4">
              <p className="text-xs text-[#555]">
                Coordinates: {camp.coordinates[1].toFixed(4)}°N, {camp.coordinates[0].toFixed(4)}°E
              </p>
            </div>

            {/* Related Timeline Event */}
            {relatedEvent && (
              <div className="p-6 lg:p-8 border-t border-[#1a1a1a] bg-[#0d0d0d]">
                <h3 className="text-xs uppercase tracking-wider text-[#666] mb-4">{t('relatedEvent')}</h3>
                <div className="flex items-center justify-between bg-[#1a1a1a] rounded-sm p-4">
                  <div>
                    <p className="text-sm text-[#aaa]">{relatedEvent.month} {relatedEvent.year}</p>
                    <p className="text-[#e8e8e8] font-medium">{relatedEvent.title}</p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      router.push(`/?event=${relatedEvent.id}`);
                    }}
                    className="text-xs text-[#aaa] hover:text-white bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#3a3a3a] px-3 py-1 rounded-sm transition-all cursor-pointer"
                  >
                    {t('viewInTimeline')} →
                  </button>
                </div>
              </div>
            )}

            {/* Footer - Death Toll Context */}
            <div className="p-6 lg:p-8 border-t border-[#1a1a1a]">
              <div className="flex items-start gap-3 p-4 bg-[#1a0a0a] border border-[#3a1515] rounded-sm">
                <svg className="w-5 h-5 text-[#dc2626] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm text-[#ccc] leading-relaxed">
                    <strong className="text-[#dc2626]">{formatDeaths(camp.deaths)}</strong>{' '}
                    {t('deathTollNote', { name: camp.name })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
