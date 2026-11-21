'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { deleteImage, uploadImage } from '@/lib/blob'
import { getActiveIklan } from '@/lib/data/iklan'

type ActionState = { error?: string; success?: boolean } | null

export async function uploadIklanAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // const session = await auth()
  // if (!session?.user || (session.user as any).role !== 'admin') return { error: 'Unauthorized' }

  const file = formData.get('gambar')
  if (!(file instanceof File) || file.size === 0) return { error: 'Gambar wajib diupload' }

  // Upload to Blob only on submit, so picking/replacing a file never leaves orphan blobs
  const uploaded = await uploadImage(file)
  if ('error' in uploaded) return { error: uploaded.error }
  const gambar = uploaded.url

  // Grab the currently active iklan before replacing it
  const oldIklan = await getActiveIklan()

  // Create the new active iklan
  try {
    await prisma.iklan.create({ data: { gambar, isActive: true } })
  } catch {
    await deleteImage(gambar)
    return { error: 'Gagal menyimpan iklan' }
  }

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
