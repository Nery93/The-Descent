import type { Metadata, Viewport } from 'next'
import { Inter, Crimson_Text, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/components/language-provider'
import { LanguageSwitcher } from '@/components/language-switcher'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const crimsonText = Crimson_Text({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://the-descent.vercel.app'),
  
  title: {
    default: 'The Descent: 1918-1945 | Holocaust Education Timeline',
    template: '%s | The Descent'
  },
  
  description: 'Interactive educational timeline documenting how democracy died and 6 million Jews were murdered during the Holocaust. From WWI to liberation of concentration camps. Digital memorial and historical resource.',
  
  keywords: [
    'Holocaust',
    'Holocaust education',
    'World War 2',
    'WW2 history',
    'Nazi Germany',
    'concentration camps',
    'genocide',
    'Auschwitz',
    'Bergen-Belsen',
    'historical timeline',
    'never again',
    'antisemitism',
    'human rights',
    'war crimes',
    'Nuremberg trials',
    'D-Day',
    'liberation',
    'educational memorial',
    'interactive history'
  ],
  
  authors: [{ name: 'Holocaust Education Project' }],
  creator: 'Holocaust Education Project',
  publisher: 'The Descent Memorial Project',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://the-descent.vercel.app',
    siteName: 'The Descent: 1918-1945',
    title: 'The Descent: 1918-1945 | Interactive Holocaust Education Timeline',
    description: 'Journey through the darkest chapter in human history. Educational timeline showing how democracy died and genocide happened.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Descent: Holocaust Education Timeline 1918-1945',
        type: 'image/jpeg'
      }
    ]
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'The Descent: 1918-1945',
    description: 'Interactive Holocaust education timeline. From the ashes of WWI to the liberation of concentration camps.',
    images: ['/og-image.jpg']
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  
  alternates: {
    canonical: 'https://the-descent.vercel.app'
  },
  
  category: 'education'
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://the-descent.vercel.app/#website',
      url: 'https://the-descent.vercel.app',
      name: 'The Descent: 1918-1945',
      description: 'Interactive Holocaust education timeline',
      inLanguage: 'en-US'
    },
    {
      '@type': 'Organization',
      '@id': 'https://the-descent.vercel.app/#organization',
      name: 'The Descent Memorial Project',
      url: 'https://the-descent.vercel.app'
    },
    {
      '@type': 'EducationalOrganization',
      name: 'The Descent: Holocaust Education',
      description: 'Digital memorial and educational resource about the Holocaust',
      url: 'https://the-descent.vercel.app',
      educationalLevel: 'High School and Above',
      about: {
        '@type': 'Event',
        name: 'The Holocaust',
        startDate: '1933',
        endDate: '1945',
        location: {
          '@type': 'Place',
          name: 'Europe',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 52.0,
            longitude: 19.0
          }
        },
        description: 'Genocide of European Jews during World War II'
      }
    },
    {
      '@type': 'WebPage',
      '@id': 'https://the-descent.vercel.app/#webpage',
      url: 'https://the-descent.vercel.app',
      name: 'The Descent: 1918-1945',
      isPartOf: { '@id': 'https://the-descent.vercel.app/#website' },
      about: { '@id': 'https://the-descent.vercel.app/#organization' },
      description: 'Interactive timeline documenting the Holocaust from 1918 to 1945',
      inLanguage: 'en-US'
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${crimsonText.variable} ${sourceSerif.variable} font-sans antialiased bg-black text-[#e8e8e8] overflow-x-hidden`}>
        <LanguageProvider>
          {children}
          <Footer />
          <LanguageSwitcher />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
