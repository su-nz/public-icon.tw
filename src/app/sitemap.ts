import type { MetadataRoute } from 'next'
import { toSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: toSiteUrl('/'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: toSiteUrl('/quick'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: toSiteUrl('/manual'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: toSiteUrl('/license'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: toSiteUrl('/author'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
