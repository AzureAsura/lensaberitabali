import { del, put } from '@vercel/blob'
import { MAX_IMAGE_SIZE } from '@/lib/config/upload'

/** Validates and uploads an image to Vercel Blob. Returns the public url or an error message. */
export async function uploadImage(file: File): Promise<{ url: string } | { error: string }> {
  if (file.size > MAX_IMAGE_SIZE) return { error: 'Ukuran gambar maksimal 4MB' }
  if (!file.type.startsWith('image/')) return { error: 'File harus berupa gambar' }
  try {
    const blob = await put(file.name, file, { multipart: true, access: 'public', addRandomSuffix: true })
    return { url: blob.url }
  } catch {
    return { error: 'Gagal mengupload gambar' }
  }
}

/**
 * Silently deletes a Vercel Blob image by URL.
 * Errors are logged but never rethrown, so a failed deletion
 * never breaks the caller's DB operation.
 */
export async function deleteImage(url?: string | null) {
  if (!url) return
  try {
    await del(url)
  } catch (error) {
    console.error('deleteImage error:', error)
  }
}
