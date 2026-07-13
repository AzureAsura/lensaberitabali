/**
 * Single source of truth for the site's canonical public URL.
 *
 * Canonical version is `www` — the hosting layer 307-redirects the
 * non-www apex (`lensaberitabali.com`) to `www.lensaberitabali.com`,
 * so all metadata/canonical/sitemap references must point at `www`
 * to match what actually gets served (and what Google has indexed).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.lensaberitabali.com'

export const SITE_NAME = 'Lensa Berita Bali'
