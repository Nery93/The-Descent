'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { TimelineEvent, getPhaseColor } from '@/lib/timeline-data';
import { useTranslatedEvent } from '@/hooks/use-translated-event';
import { ShareModal } from './share-modal';
import { cn } from '@/lib/utils';

interface EventModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onNavigate: (eventId: string) => void;
}

// Custom icons instead of emojis
const FactIcons: Record<string, React.ReactNode> = {
  '✕': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  '⚠': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  '⚖': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  '◆': (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
    </svg>
  ),
  '▶': (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  // Phase 4 icons - Liberation & Justice
  '⚔': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l7.07 7.07M20 4l-7.07 7.07M12 12v9m-4-4l4 4 4-4" />
    </svg>
  ),
  '✓': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  '💀': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H9v-2a3 3 0 016 0v2zM12 17v-3m-3-3a3 3 0 106 0" />
    </svg>
  ),
  '⚕': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
};

export function EventModal({ event, onClose, onNavigate }: EventModalProps) {
  const t = useTranslations('events');
  const translatedEvent = useTranslatedEvent(event);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [revealedPhotos, setRevealedPhotos] = useState<Set<number>>(new Set());

  // Reset photo index and revealed state when event changes
  useEffect(() => {
    setCurrentPhotoIndex(0);
    setRevealedPhotos(new Set());
  }, [event?.id]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showShareModal) {
          setShowShareModal(false);
        } else if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
      if (event && e.key === 'ArrowLeft' && !showShareModal) {
        setCurrentPhotoIndex((i) => (i > 0 ? i - 1 : ev.photos.length - 1));
      }
      if (event && e.key === 'ArrowRight' && !showShareModal) {
        setCurrentPhotoIndex((i) => (i < ev.photos.length - 1 ? i + 1 : 0));
      }
    };

    if (event) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [event, onClose, isLightboxOpen, showShareModal]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!event) return null;

  const ev = translatedEvent ?? event;
  const phaseColor = getPhaseColor(event.phase);
  const currentPhoto = ev.photos[currentPhotoIndex];

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm overflow-y-auto"
          onClick={handleBackdropClick}
        >
          {/* Close button - always visible with dark background */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-110 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/40 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white hover:bg-white/30 hover:border-white hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 shadow-lg shadow-black/50"
            aria-label="Close modal"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="min-h-screen"
          >
            {/* Photo Gallery Section - Top 60% */}
            <section className="relative h-[50vh] lg:h-[60vh] bg-[#0a0a0a]">
              {/* Main Photo */}
              <div
                className="relative h-full w-full cursor-pointer"
                onClick={() => !currentPhoto.sensitive || revealedPhotos.has(currentPhotoIndex) ? setIsLightboxOpen(true) : undefined}
              >
                {/* Photo background */}
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300",
                    currentPhoto.sensitive && !revealedPhotos.has(currentPhotoIndex) && "blur-2xl scale-105"
                  )}
                  style={{
                    backgroundImage: currentPhoto.src
                      ? `url('${currentPhoto.src}')`
                      : `linear-gradient(135deg, ${phaseColor}15, #0a0a0a)`,
                  }}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Aged photo frame effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border-[8px] border-[#1a1a1a] opacity-50" />
                  <div className="absolute inset-[8px] bg-gradient-to-b from-[#704214]/5 to-transparent" />
                </div>

                {/* Sensitive content warning overlay */}
                {currentPhoto.sensitive && !revealedPhotos.has(currentPhotoIndex) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10">
                    <div className="flex flex-col items-center gap-4 text-center px-6">
                      <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-amber-400 text-sm uppercase tracking-[0.2em] font-semibold">
                        Graphic Content
                      </p>
                      <p className="text-[#9ca3af] text-sm max-w-xs">
                        This image contains disturbing historical content that some may find distressing.
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRevealedPhotos((prev) => new Set(prev).add(currentPhotoIndex));
                        }}
                        className="mt-2 px-5 py-2 text-sm border border-white/30 text-white hover:bg-white/10 transition-colors rounded-sm cursor-pointer"
                      >
                        View Image
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Photo caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12">
                <p className="text-base text-[#d1d5db] italic max-w-3xl mx-auto text-center">
                  {currentPhoto.caption}
                </p>
              </div>

              {/* Navigation arrows */}
              {ev.photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPhotoIndex((i) => (i > 0 ? i - 1 : ev.photos.length - 1));
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[#9ca3af] hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPhotoIndex((i) => (i < ev.photos.length - 1 ? i + 1 : 0));
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[#9ca3af] hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
                    aria-label="Next photo"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Thumbnail navigation */}
              {ev.photos.length > 1 && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 bg-black/60 backdrop-blur-sm p-2 sm:p-3 rounded-sm max-w-[calc(100vw-32px)] overflow-x-auto">
                  {ev.photos.map((photo, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPhotoIndex(i);
                      }}
                      className={cn(
                        'relative w-14 h-14 sm:w-20 sm:h-20 rounded-sm overflow-hidden transition-all duration-200 bg-cover bg-center cursor-pointer shrink-0',
                        i === currentPhotoIndex
                          ? 'border-[3px] border-white opacity-100 scale-105'
                          : 'border-2 border-white/50 opacity-70 hover:opacity-100 hover:border-white'
                      )}
                      style={{
                        backgroundImage: photo.src
                          ? `url('${photo.src}')`
                          : `linear-gradient(135deg, ${phaseColor}40, #1a1a1a)`,
                      }}
                      aria-label={`View photo ${i + 1}: ${photo.alt.slice(0, 30)}`}
                    >
                      {photo.sensitive && !revealedPhotos.has(i) && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Content Section - Bottom */}
            <section className="relative bg-[#0a0a0a] border-t border-[#1a1a1a]">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
                {/* Year and Title - Enhanced font sizes */}
                <header className="mb-12">
                  <div
                    className="text-base uppercase tracking-[0.3em] mb-3"
                    style={{ color: phaseColor }}
                  >
                    {ev.month && `${ev.month} `}{event.year}
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f5] leading-tight mb-5 text-balance">
                    {ev.title}
                  </h1>
                  <div 
                    className="w-20 h-1 rounded"
                    style={{ backgroundColor: phaseColor }}
                  />
                </header>

                {/* Key Facts - Larger text */}
                <div className="mb-12">
                  <h2 className="text-sm uppercase tracking-[0.2em] text-[#888] mb-5">
                    {t('keyFacts')}
                  </h2>
                  <div className="grid gap-5">
                    {ev.keyFacts.map((fact, i) => (
                      <div 
                        key={i}
                        className="flex items-start gap-4 text-[#e0e0e0]"
                      >
                        <span 
                          className="flex-shrink-0 w-7 h-7"
                          style={{ color: phaseColor }}
                        >
                          {FactIcons[fact.symbol as keyof typeof FactIcons] || fact.symbol}
                        </span>
                        <span className="text-base lg:text-lg leading-relaxed">
                          {fact.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Context - Larger, more readable text */}
                <div className="mb-12 paper-texture rounded-sm p-8 lg:p-10 bg-[#0d0d0d]">
                  <h2 className="text-sm uppercase tracking-[0.2em] text-[#888] mb-6">
                    {t('historicalContext')}
                  </h2>
                  <div className="space-y-7 font-serif text-[#e0e0e0] text-base lg:text-lg tracking-wide leading-[1.9]">
                    {ev.context.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Eyewitness Quote - Enhanced typography with larger text */}
                <div className="mb-12">
                  <div 
                    className="relative p-8 lg:p-10 bg-[#0a0808] rounded-sm"
                    style={{
                      borderLeft: `6px solid ${phaseColor}`,
                    }}
                  >
                    {/* Large opening quote */}
                    <div 
                      className="absolute -top-6 left-6 text-8xl lg:text-9xl font-serif leading-none opacity-25"
                      style={{ color: phaseColor }}
                    >
                      {'"'}
                    </div>
                    
                    <div className="font-serif text-2xl lg:text-3xl italic text-[#e0e0e0] leading-[1.7] mb-6 pl-6 pt-4">
                      {ev.eyewitnessQuote.text}
                    </div>

                    {/* Large closing quote */}
                    <div
                      className="text-right text-8xl lg:text-9xl font-serif leading-none opacity-25 -mt-10"
                      style={{ color: phaseColor }}
                    >
                      {'"'}
                    </div>

                    <div className="text-base text-[#999] text-right mt-4">
                      <span className="font-medium text-[#ccc]">
                        — {ev.eyewitnessQuote.attribution}
                      </span>
                      {ev.eyewitnessQuote.source && (
                        <span className="text-[#777] block mt-1">
                          {ev.eyewitnessQuote.source}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Why This Matters - Larger and more prominent */}
                <div className="mb-12 relative">
                  <div className="relative p-8 lg:p-10 bg-[#1a1200] border border-[#d97706]/40 rounded-sm shadow-lg shadow-[#d97706]/10">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center bg-[#d97706]/25">
                        <svg 
                          className="w-7 h-7 text-[#d97706]" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base uppercase tracking-[0.15em] text-[#d97706] font-semibold mb-4">
                          {t('whyThisMatters')}
                        </h3>
                        <p className="text-[#e0e0e0] leading-[1.8] text-base lg:text-lg">
                          {ev.whyThisMatters}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Events */}
                {ev.relatedEvents.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[#666] mb-4">
                      {t('relatedEvents')}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {ev.relatedEvents.map((related) => (
                        <button
                          key={related.id}
                          onClick={() => onNavigate(related.id)}
                          className="px-4 py-2 text-sm bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#3a3a3a] rounded-sm text-[#9ca3af] hover:text-white transition-colors cursor-pointer"
                        >
                          {related.label} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Button */}
                <div className="pt-8 border-t border-[#1a1a1a] flex gap-4">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-white transition-colors px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] rounded-sm cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {t('shareEvent')}
                  </button>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {isLightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[120] bg-black/98 flex items-center justify-center p-4"
                onClick={() => setIsLightboxOpen(false)}
              >
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/70 flex items-center justify-center text-white hover:bg-white/30 hover:border-white hover:scale-105 transition-all duration-200 cursor-pointer shadow-lg z-10"
                  aria-label="Close lightbox"
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Prev arrow */}
                {currentPhotoIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPhotoIndex((i) => i - 1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center text-white hover:bg-black/70 hover:scale-105 transition-all duration-200 cursor-pointer z-10"
                    aria-label="Previous photo"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Next arrow */}
                {currentPhotoIndex < ev.photos.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPhotoIndex((i) => i + 1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center text-white hover:bg-black/70 hover:scale-105 transition-all duration-200 cursor-pointer z-10"
                    aria-label="Next photo"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                <div className="max-w-5xl w-full text-center">
                  <div
                    className="aspect-[4/3] w-full rounded-sm mb-4 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: currentPhoto.src
                        ? `url('${currentPhoto.src}')`
                        : `linear-gradient(135deg, ${phaseColor}20, #0a0a0a)`,
                    }}
                  />
                  <p className="text-[#888] italic">{currentPhoto.caption}</p>
                  <p className="text-[#444] text-sm mt-2">
                    {currentPhotoIndex + 1} / {ev.photos.length}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Share Modal */}
          <AnimatePresence>
            {showShareModal && event && (
              <ShareModal 
                event={event} 
                onClose={() => setShowShareModal(false)} 
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
