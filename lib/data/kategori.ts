import prisma from '@/lib/prisma'

export async function getAllKategori() {
  try {
    return await prisma.kategori.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('getAllKategori error:', error)
    return []
  }
}

export async function getKategoriById(id: string) {
  try {
    return await prisma.kategori.findUnique({ where: { id } })
  } catch (error) {
    console.error('getKategoriById error:', error)
    return null
  }
}
