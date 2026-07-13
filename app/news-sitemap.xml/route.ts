import { getRecentBeritaForNews } from '@/lib/data/berita'
import { SITE_URL, SITE_NAME } from '@/lib/config/site'

// Regenerate roughly every 10 minutes so the 48h freshness window stays
// accurate without querying the DB on every crawler hit.
export const revalidate = 600

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const beritaList = await getRecentBeritaForNews()

  const urlEntries = beritaList
    .map(
      (b) => `  <url>
    <loc>${SITE_URL}/berita/${b.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_NAME)}</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${b.createdAt.toISOString()}</news:publication_date>
      <news:title>${escapeXml(b.judul)}</news:title>
    </news:news>
  </url>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
