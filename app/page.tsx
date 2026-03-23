import { Timeline } from '@/components/timeline/timeline';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'The Descent: 1918-1945 | A Holocaust Memorial Timeline',
  description: 'An immersive digital memorial experience tracing the path from the end of World War I to the liberation of the concentration camps. Never forget. Never again.',
  keywords: ['Holocaust', 'memorial', 'history', 'education', 'World War II', 'genocide', 'remembrance'],
  openGraph: {
    title: 'The Descent: 1918-1945',
    description: 'A digital memorial journey through the darkest chapter in human history.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Film grain overlay - intensity controlled via CSS based on phase */}
      <div className="film-grain" aria-hidden="true" />
      
      {/* Vignette effect - intensifies during genocide phase */}
      <div className="vignette" aria-hidden="true" />
      
      {/* Main timeline */}
      <Timeline />
      
      {/* Accessibility announcement for screen readers */}
      <div className="sr-only" role="status" aria-live="polite">
        Holocaust Memorial Timeline: An educational journey through the events of 1918 to 1945. 
        This site contains sensitive historical content. Navigate using keyboard or scroll.
      </div>
    </main>
  );
}
