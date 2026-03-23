import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://the-descent.vercel.app'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/#phase-1`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/#phase-2`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/#phase-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/#phase-4`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/#map`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]
}
