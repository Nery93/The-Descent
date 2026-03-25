'use client';

import { useMessages } from 'next-intl';
import { useLanguage } from '@/components/language-provider';
import type { TimelineEvent } from '@/lib/timeline-data';

export function useTranslatedEvent(event: TimelineEvent | null): TimelineEvent | null {
  const { locale } = useLanguage();
  const messages = useMessages() as any;

  if (!event || locale === 'en') return event;

  const pt = messages?.eventData?.[event.id];
  if (!pt) return event;

  return {
    ...event,
    title: pt.title ?? event.title,
    subtitle: pt.subtitle ?? event.subtitle,
    month: pt.month ?? event.month,
    keyFacts: pt.keyFacts ?? event.keyFacts,
    context: pt.context ?? event.context,
    eyewitnessQuote: pt.eyewitnessQuote ?? event.eyewitnessQuote,
    whyThisMatters: pt.whyThisMatters ?? event.whyThisMatters,
    relatedEvents: pt.relatedEvents ?? event.relatedEvents,
    photos: pt.captions
      ? event.photos.map((photo, i) => ({
          ...photo,
          caption: pt.captions[i] ?? photo.caption,
        }))
      : event.photos,
  };
}
