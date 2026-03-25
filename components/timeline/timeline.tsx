'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timelineEvents, Phase, getPhaseForYear, TimelineEvent } from '@/lib/timeline-data';
import { useLanguage } from '@/components/language-provider';
import { EventCard } from './event-card';
import { EventModal } from './event-modal';
import { PhaseSection } from './phase-section';
import { ProgressIndicator } from './progress-indicator';
import { BreadcrumbNav } from './breadcrumb-nav';
import { HeroSection } from './hero-section';
import { ContentWarning } from './content-warning';
import { LanguageSelector, Language } from './language-selector';
import { SoundToggle } from './sound-toggle';
import { GenocideMap } from './genocide-map';
import { BackToTop } from './back-to-top';

// Group events by phase
const phase1Events = timelineEvents.filter((e) => e.phase === 1);
const phase2Events = timelineEvents.filter((e) => e.phase === 2);
const phase3Events = timelineEvents.filter((e) => e.phase === 3);
const phase4Events = timelineEvents.filter((e) => e.phase === 4);

export function Timeline() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLocale } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [currentYear, setCurrentYear] = useState(1918);
  const [currentPhase, setCurrentPhase] = useState<Phase>(1);
  const [currentEvent, setCurrentEvent] = useState<TimelineEvent | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [warningAccepted, setWarningAccepted] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [language, setLanguage] = useState<Language>('EN');

  // Check localStorage on mount
  useEffect(() => {
    const seen = localStorage.getItem('content-warning-seen');
    if (seen) {
      setWarningAccepted(true);
    } else {
      setWarningVisible(true);
    }
    const savedLang = localStorage.getItem('selected-language') as Language | null;
    if (savedLang === 'EN' || savedLang === 'PT') {
      setLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('selected-language', lang);
    setLocale(lang === 'PT' ? 'pt' : 'en');
  };

  const handleAcceptWarning = () => {
    localStorage.setItem('content-warning-seen', 'true');
    setWarningVisible(false);
    // Small delay so the fade-out animation completes before stats start
    setTimeout(() => setWarningAccepted(true), 800);
  };

  // On load: read ?event= from URL and reopen modal
  useEffect(() => {
    const eventId = searchParams.get('event');
    if (eventId) {
      const event = timelineEvents.find((e) => e.id === eventId);
      if (event) setSelectedEvent(event);
    }
  }, [searchParams]);
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLElement>(null);
  const phase2Ref = useRef<HTMLElement>(null);
  const phase3Ref = useRef<HTMLElement>(null);
  const phase4Ref = useRef<HTMLElement>(null);

  // Parallax scroll effect - track window scroll
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Track scroll position to update current year and phase
  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling past hero
      setShowProgress(window.scrollY > window.innerHeight * 0.5);

      // Find the event card that's most visible
      const eventCards = document.querySelectorAll('[data-event-year]');
      let closestYear = 1918;
      let closestDistance = Infinity;
      let closestEventId: string | null = null;

      eventCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 3);
        if (distance < closestDistance && rect.top < window.innerHeight && rect.bottom > 0) {
          closestDistance = distance;
          closestYear = parseInt(card.getAttribute('data-event-year') || '1918', 10);
          closestEventId = card.getAttribute('data-event-id');
        }
      });

      setCurrentYear(closestYear);
      setCurrentPhase(getPhaseForYear(closestYear));
      
      if (closestEventId) {
        const event = timelineEvents.find(e => e.id === closestEventId);
        setCurrentEvent(event || null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEventClick = useCallback((event: TimelineEvent) => {
    setSelectedEvent(event);
    router.replace(`?event=${event.id}`, { scroll: false });
  }, [router]);

  const handleModalClose = useCallback(() => {
    setSelectedEvent(null);
    router.replace('/', { scroll: false });
  }, [router]);

  const handleNavigate = useCallback((eventId: string) => {
    const event = timelineEvents.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  }, []);

  // Check reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
  <div className="relative">
  {/* Content Warning */}
  {warningVisible && (
    <ContentWarning
      onAccept={handleAcceptWarning}
      language={language}
      onLanguageChange={handleLanguageChange}
    />
  )}

  {/* Language Selector */}
  <LanguageSelector language={language} onChange={handleLanguageChange} />

  {/* Sound Toggle */}
  <SoundToggle />
  
  {/* Back to Top Button */}
  <BackToTop />

      {/* Progress indicator */}
      {showProgress && (
        <ProgressIndicator 
          currentYear={currentYear} 
          currentPhase={currentPhase}
          currentEvent={currentEvent}
        />
      )}

      {/* Breadcrumb Navigation */}
      <BreadcrumbNav 
        currentPhase={currentPhase}
        currentEvent={currentEvent}
        visible={showProgress}
      />

      {/* Hero Section */}
      <HeroSection warningAccepted={warningAccepted} />

      {/* Timeline content */}
      <div ref={timelineRef} className="relative">
        {/* Phase 1: The Seeds of Hatred (1918-1933) */}
        <section 
          ref={phase1Ref}
          data-phase="1"
          className="relative phase-bg-1"
        >
          <PhaseSection phase={1} />
          
          <div className="relative max-w-6xl mx-auto px-4 pb-16">
            {/* Central spine (desktop) - with parallax */}
            <motion.div 
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 rounded-full opacity-30"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, #3b4c5c 10%, #3b4c5c 90%, #8b1a1a 100%)',
                y: prefersReducedMotion ? 0 : parallaxY,
              }}
            />
            
            <div className="space-y-8 lg:space-y-20">
              {phase1Events.map((event, index) => (
                <div 
                  key={event.id} 
                  data-event-year={event.year}
                  data-event-id={event.id}
                  className="relative"
                >
                  <EventCard
                    event={event}
                    index={index}
                    onClick={() => handleEventClick(event)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phase 2: The Persecution (1933-1939) */}
        <section 
          ref={phase2Ref}
          data-phase="2"
          className="relative phase-bg-2"
        >
          <PhaseSection phase={2} />
          
          <div className="relative max-w-6xl mx-auto px-4 pb-16">
            {/* Central spine (desktop) */}
            <motion.div 
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 rounded-full opacity-40"
              style={{
                background: 'linear-gradient(180deg, #3b4c5c 0%, #8b1a1a 20%, #8b1a1a 80%, #4a1515 100%)',
                y: prefersReducedMotion ? 0 : parallaxY,
              }}
            />
            
            <div className="space-y-8 lg:space-y-20">
              {phase2Events.map((event, index) => (
                <div 
                  key={event.id}
                  data-event-year={event.year}
                  data-event-id={event.id}
                  className="relative"
                >
                  <EventCard
                    event={event}
                    index={phase1Events.length + index}
                    onClick={() => handleEventClick(event)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phase 3: The Genocide (1939-1945) */}
        <section 
          ref={phase3Ref}
          data-phase="3"
          className="relative phase-bg-3"
        >
          <PhaseSection phase={3} />
          
          <div className="relative max-w-6xl mx-auto px-4 pb-16">
            {/* Central spine (desktop) - thicker for this phase */}
            <motion.div 
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 rounded-full opacity-50"
              style={{
                background: 'linear-gradient(180deg, #8b1a1a 0%, #4a1515 30%, #1a0a0a 100%)',
                y: prefersReducedMotion ? 0 : parallaxY,
              }}
            />
            
            <div className="space-y-8 lg:space-y-20">
              {phase3Events.map((event, index) => (
                <div 
                  key={event.id}
                  data-event-year={event.year}
                  data-event-id={event.id}
                  className="relative"
                >
                  <EventCard
                    event={event}
                    index={phase1Events.length + phase2Events.length + index}
                    onClick={() => handleEventClick(event)}
                  />
                </div>
              ))}
            </div>
  </div>
  </section>

        {/* Phase 4: Liberation & Justice (1944-1946) */}
        <section 
          ref={phase4Ref}
          data-phase="4"
          className="relative phase-bg-4"
        >
          <PhaseSection phase={4} />
          
          <div className="relative max-w-6xl mx-auto px-4 pb-16">
            {/* Central spine (desktop) - transitions to steel gray */}
            <motion.div 
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 rounded-full opacity-40"
              style={{
                background: 'linear-gradient(180deg, #4a1515 0%, #4a5568 30%, #4a5568 100%)',
                y: prefersReducedMotion ? 0 : parallaxY,
              }}
            />
            
            <div className="space-y-8 lg:space-y-20">
              {phase4Events.map((event, index) => (
                <div 
                  key={event.id}
                  data-event-year={event.year}
                  data-event-id={event.id}
                  className="relative"
                >
                  <EventCard
                    event={event}
                    index={phase1Events.length + phase2Events.length + phase3Events.length + index}
                    onClick={() => handleEventClick(event)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Geography of Genocide Map */}
        <GenocideMap />
  
  {/* Closing section */}
        <section className="relative bg-black py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto px-4 text-center"
          >
  <div className="w-16 h-px bg-[#4a5568] mx-auto mb-8" />
  
  {/* Large typographic quote */}
  <div className="relative mb-8">
  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl font-serif text-[#4a5568]/15">
    {'"'}
  </span>
  <h2 className="font-serif text-2xl lg:text-4xl text-[#e8e8e8] leading-relaxed text-balance">
    Those who cannot remember the past are condemned to repeat it.
  </h2>
  <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-8xl font-serif text-[#4a5568]/15">
    {'"'}
  </span>
  </div>
  
  <p className="text-[#888] mb-4 mt-16">
    — George Santayana
  </p>
  
  <div className="w-8 h-px bg-[#2a2a2a] mx-auto my-12" />
  
  <div className="text-[#999] space-y-6 text-base leading-relaxed max-w-2xl mx-auto">
  <p>
    The Holocaust was not inevitable. At every step, choices were made—by leaders,
    by institutions, by ordinary people. Understanding how it happened is the first
    step in ensuring it never happens again.
  </p>
  <p>
    They stopped it then. People fought, bled, and died to end the genocide. 
    The Nuremberg principles established that some crimes are so terrible that 
    no order justifies them, no government shields the guilty.
  </p>
  <p>
    We remember the six million Jews and millions of others who were murdered.
    We honor the survivors who shared their stories. We honor those who liberated them.
    We commit to vigilance against hatred, discrimination, and the forces that enable genocide.
  </p>
  </div>
  
  <div className="mt-16 pt-8 border-t border-[#2a2a2a]">
  <p className="text-sm text-[#666] uppercase tracking-[0.3em]">
    Never Forget · Never Again
  </p>
  </div>
          </motion.div>
        </section>
      </div>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        onClose={handleModalClose}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
