'use server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { beritaValidation } from '@/lib/zod'
import { revalidatePath } from 'next/cache'

type ActionState = { error?: string; success?: boolean } | null

export async function createBeritaAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // const session = await auth()
  // if (!session?.user || (session.user as any).role !== 'admin') return { error: 'Unauthorized' }

  const gambar = formData.get('gambar') as string
  if (!gambar) return { error: 'Gambar wajib diupload' }

  const fields = {
    judul: formData.get('judul') as string,
    penulis: formData.get('penulis') as string,
    deskripsiGambar: formData.get('deskripsiGambar') as string,
    konten: formData.get('konten') as string,
    kategori: (formData.get('kategori') as string) || undefined,
  }

  const validated = beritaValidation.safeParse(fields)
  if (!validated.success) return { error: validated.error.issues[0].message }

  try {
    await prisma.berita.create({
      data: {
        ...validated.data,
        deskripsiGambar: validated.data.deskripsiGambar || null,
        kategori: validated.data.kategori || null,
        gambar,
      },
    })
  } catch {
    return { error: 'Gagal menyimpan berita' }
  }

  revalidatePath('/')
  revalidatePath('/admin/berita')
  return { success: true }
}

export async function updateBeritaAction(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') return { error: 'Unauthorized' }

  const fields = {
    judul: formData.get('judul') as string,
    penulis: formData.get('penulis') as string,
    deskripsiGambar: formData.get('deskripsiGambar') as string,
    konten: formData.get('konten') as string,
    kategori: (formData.get('kategori') as string) || undefined,
  }

  const validated = beritaValidation.safeParse(fields)
  if (!validated.success) return { error: validated.error.issues[0].message }

  const gambar = formData.get('gambar') as string | null

  try {
    await prisma.berita.update({
      where: { id },
      data: {
        ...validated.data,
        deskripsiGambar: validated.data.deskripsiGambar || null,
        kategori: validated.data.kategori || null,
        ...(gambar ? { gambar } : {}),
      },
    })
  } catch {
    return { error: 'Gagal memperbarui berita' }
  }

  revalidatePath('/')
  revalidatePath('/admin/berita')
  revalidatePath(`/berita/${id}`)
  return { success: true }
}

export async function deleteBeritaAction(id: string): Promise<ActionState> {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'admin') return { error: 'Unauthorized' }

  try {
    await prisma.berita.delete({ where: { id } })
  } catch {
    return { error: 'Gagal menghapus berita' }
  }

  revalidatePath('/')
  revalidatePath('/admin/berita')
  return { success: true }
}
