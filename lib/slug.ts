import prisma from '@/lib/prisma'

/**
 * Turns a title into a URL-safe slug: lowercase, ASCII, hyphen-separated.
 * e.g. "Jendela Bali Hadirkan Menu & Cocktail Baru!" -> "jendela-bali-hadirkan-menu-cocktail-baru"
 */
const MAX_LENGTH = 80

export function slugify(text: string): string {
  const full = text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (full.length <= MAX_LENGTH) return full

  // Cut at the last whole-word boundary within the limit instead of
  // slicing mid-word (e.g. "...konsep-indonesian-fusion" not "...indonesian-f").
  const truncated = full.slice(0, MAX_LENGTH)
  const lastHyphen = truncated.lastIndexOf('-')
  return (lastHyphen > 0 ? truncated.slice(0, lastHyphen) : truncated).replace(/^-+|-+$/g, '')
}

/**
 * Generates a slug from `title` and appends `-2`, `-3`, ... until it's
 * unique in the berita table. `excludeId` lets an update keep its own slug.
 */
export async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
  const base = slugify(title) || 'berita'
  let slug = base
  let counter = 2

  while (true) {
    const existing = await prisma.berita.findUnique({ where: { slug }, select: { id: true } })
    if (!existing || existing.id === excludeId) return slug
    slug = `${base}-${counter}`
    counter++
  }
}
