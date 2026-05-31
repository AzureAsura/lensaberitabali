import prisma from '@/lib/prisma'

export async function getTentangKami() {
  try {
    return await prisma.tentangKami.findFirst()
  } catch (error) {
    console.error('getTentangKami error:', error)
    return null
  }
}
