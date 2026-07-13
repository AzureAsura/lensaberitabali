import type { MetadataRoute } from 'next'
import { getAllBerita } from '@/lib/data/berita'
import { SITE_URL } from '@/lib/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const beritaList = await getAllBerita()

  const beritaEntries: MetadataRoute.Sitemap = beritaList.map((b) => ({
    url: `${SITE_URL}/berita/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...beritaEntries,
  ]
}
