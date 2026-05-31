import { del } from '@vercel/blob'

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
