'use server'
import prisma from '@/lib/prisma'
import { kategoriValidation } from '@/lib/zod'
import { revalidatePath } from 'next/cache'

type ActionState = { error?: string; success?: boolean } | null

export async function createKategoriAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const fields = {
    nama: formData.get('nama') as string,
  }

  const validated = kategoriValidation.safeParse(fields)
  if (!validated.success) return { error: validated.error.issues[0].message }

  try {
    await prisma.kategori.create({ data: validated.data })
  } catch {
    return { error: 'Nama kategori sudah ada atau gagal menyimpan' }
  }

  revalidatePath('/admin/kategori')
  return { success: true }
}

export async function updateKategoriAction(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
  const fields = {
    nama: formData.get('nama') as string,
  }

  const validated = kategoriValidation.safeParse(fields)
  if (!validated.success) return { error: validated.error.issues[0].message }

  try {
    await prisma.kategori.update({ where: { id }, data: validated.data })
  } catch {
    return { error: 'Nama kategori sudah ada atau gagal memperbarui' }
  }

  revalidatePath('/admin/kategori')
  return { success: true }
}

export async function deleteKategoriAction(id: string): Promise<ActionState> {
  try {
    await prisma.kategori.delete({ where: { id } })
  } catch {
    return { error: 'Gagal menghapus kategori' }
  }

  revalidatePath('/admin/kategori')
  return { success: true }
}
