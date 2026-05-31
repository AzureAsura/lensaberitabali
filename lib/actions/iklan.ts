'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { deleteImage } from '@/lib/blob'
import { getActiveIklan } from '@/lib/data/iklan'

type ActionState = { error?: string; success?: boolean } | null

export async function uploadIklanAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // const session = await auth()
  // if (!session?.user || (session.user as any).role !== 'admin') return { error: 'Unauthorized' }

  const gambar = formData.get('gambar') as string
  if (!gambar) return { error: 'Gambar wajib diupload' }

  // Grab the currently active iklan before replacing it
  const oldIklan = await getActiveIklan()

  // Create the new active iklan
  await prisma.iklan.create({ data: { gambar, isActive: true } })

  // Delete the old iklan row and its blob (only one iklan should ever exist)
  if (oldIklan) {
    await prisma.iklan.delete({ where: { id: oldIklan.id } })
    await deleteImage(oldIklan.gambar)
  }

  // Revalidate admin preview + the public layout that renders the iklan popup
  revalidatePath('/admin/iklan')
  revalidatePath('/', 'layout')
  return { success: true }
}
