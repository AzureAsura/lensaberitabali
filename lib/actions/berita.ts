'use server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { z } from 'zod'
import { beritaValidation } from '@/lib/zod'
import { revalidatePath } from 'next/cache'
import { deleteImage, uploadImage } from '@/lib/blob'
import { generateUniqueSlug } from '@/lib/slug'

// fields: echoed back on failure so the form can repopulate (React resets uncontrolled inputs after an action)
type ActionState = { error?: string; fieldErrors?: Record<string, string[] | undefined>; success?: boolean; fields?: Record<string, string | undefined> } | null

export async function createBeritaAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // const session = await auth()
  // if (!session?.user || session.user.role !== 'admin') return { error: 'Unauthorized' }

  const fields = {
    judul: formData.get('judul') as string,
    penulis: formData.get('penulis') as string,
    deskripsiGambar: formData.get('deskripsiGambar') as string,
    konten: formData.get('konten') as string,
    kategori: (formData.get('kategori') as string) || undefined,
  }

  const validated = beritaValidation.safeParse(fields)
  if (!validated.success) return { fieldErrors: z.flattenError(validated.error).fieldErrors, fields }

  // Upload only after validation passes, so failed submits never leave orphan blobs
  const file = formData.get('gambar')
  if (!(file instanceof File) || file.size === 0) return { error: 'Gambar wajib diupload', fields }
  const uploaded = await uploadImage(file)
  if ('error' in uploaded) return { error: uploaded.error, fields }
  const gambar = uploaded.url

  try {
    const slug = await generateUniqueSlug(validated.data.judul)
    await prisma.berita.create({
      data: {
        ...validated.data,
        deskripsiGambar: validated.data.deskripsiGambar || null,
        kategori: validated.data.kategori || null,
        gambar,
        slug,
      },
    })
  } catch {
    await deleteImage(gambar)
    return { error: 'Gagal menyimpan berita', fields }
  }

  revalidatePath('/')
  revalidatePath('/admin/berita')
  return { success: true }
}

export async function updateBeritaAction(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') return { error: 'Unauthorized' }

  const fields = {
    judul: formData.get('judul') as string,
    penulis: formData.get('penulis') as string,
    deskripsiGambar: formData.get('deskripsiGambar') as string,
    konten: formData.get('konten') as string,
    kategori: (formData.get('kategori') as string) || undefined,
  }

  const validated = beritaValidation.safeParse(fields)
  if (!validated.success) return { fieldErrors: z.flattenError(validated.error).fieldErrors, fields }

  // Image is optional on edit: upload only when a new file was picked
  const file = formData.get('gambar')
  let gambar: string | null = null
  if (file instanceof File && file.size > 0) {
    const uploaded = await uploadImage(file)
    if ('error' in uploaded) return { error: uploaded.error, fields }
    gambar = uploaded.url
  }

  // Fetch the current image URL so we can delete the old blob after a successful update
  const existing = gambar
    ? await prisma.berita.findUnique({ where: { id }, select: { gambar: true } })
    : null

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
    await deleteImage(gambar)
    return { error: 'Gagal memperbarui berita', fields }
  }

  // Delete the old blob now that the DB is updated (errors are swallowed inside deleteImage)
  if (gambar && existing?.gambar && existing.gambar !== gambar) {
    await deleteImage(existing.gambar)
  }

  revalidatePath('/')
  revalidatePath('/admin/berita')
  revalidatePath('/admin/edit-berita/[id]', 'page')
  revalidatePath('/berita/[slug]', 'page')
  return { success: true }
}

export async function deleteBeritaAction(id: string): Promise<ActionState> {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') return { error: 'Unauthorized' }

  let gambar: string | undefined
  try {
    const deleted = await prisma.berita.delete({ where: { id } })
    gambar = deleted.gambar
  } catch {
    return { error: 'Gagal menghapus berita' }
  }

  // Delete the image from Vercel Blob after a successful DB deletion
  await deleteImage(gambar)

  revalidatePath('/')
  revalidatePath('/admin/berita')
  return { success: true }
}
