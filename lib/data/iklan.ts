import prisma from '@/lib/prisma'

export async function getActiveIklan() {
  try {
    return await prisma.iklan.findFirst({ where: { isActive: true } })
  } catch (error) {
    console.error('getActiveIklan error:', error)
    return null
  }
}
