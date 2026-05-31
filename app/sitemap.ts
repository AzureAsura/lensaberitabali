import type { MetadataRoute } from 'next'
import { getAllBerita } from '@/lib/data/berita'

const BASE_URL = 'https://lensaberitabali.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const beritaList = await getAllBerita()

  const beritaEntries: MetadataRoute.Sitemap = beritaList.map((b) => ({
    url: `${BASE_URL}/berita/${b.id}`,
    lastModified: b.createdAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...beritaEntries,
  ]
}
