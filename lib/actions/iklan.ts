'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type ActionState = { error?: string; success?: boolean } | null

export async function uploadIklanAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // const session = await auth()
  // if (!session?.user || (session.user as any).role !== 'admin') return { error: 'Unauthorized' }

  const gambar = formData.get('gambar') as string
  if (!gambar) return { error: 'Gambar wajib diupload' }

  await prisma.iklan.updateMany({ data: { isActive: false } })
  await prisma.iklan.create({ data: { gambar, isActive: true } })

  revalidatePath('/')
  return { success: true }
}

