import prisma from '@/lib/prisma'

const LIMIT = 9

export async function getBeritaList(page = 1) {
  try {
    const skip = (page - 1) * LIMIT
    const [data, total] = await Promise.all([
      prisma.berita.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: LIMIT,
        select: { id: true, judul: true, gambar: true, penulis: true, createdAt: true },
      }),
      prisma.berita.count(),
    ])
    return { data, total, totalPages: Math.ceil(total / LIMIT) }
  } catch (error) {
    console.error('getBeritaList error:', error)
    return { data: [], total: 0, totalPages: 0 }
  }
}

export async function getBeritaById(id: string) {
  try {
    return await prisma.berita.findUnique({ where: { id } })
  } catch (error) {
    console.error('getBeritaById error:', error)
    return null
  }
}

export async function getAllBerita() {
  try {
    return await prisma.berita.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, judul: true, gambar: true, penulis: true, createdAt: true },
    })
  } catch (error) {
    console.error('getAllBerita error:', error)
    return []
  }
}
