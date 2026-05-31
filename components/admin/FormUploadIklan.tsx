'use client'
import { useActionState, useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Upload, ImageIcon } from 'lucide-react'
import { uploadIklanAction } from '@/lib/actions/iklan'
import Image from 'next/image'

const FormUploadIklan = ({ currentIklan }: { currentIklan?: string | null }) => {
  const [state, formAction, isPending] = useActionState(uploadIklanAction, null)
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state?.success) toast.success('Iklan berhasil diupload!')
    if (state?.error) toast.error(state.error)
  }, [state])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImagePreview(URL.createObjectURL(file))
    setUploading(true)

    const fd = new FormData()
    fd.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'PUT', body: fd })
      const blob = await res.json()
      if (!res.ok) throw new Error(blob.message)
      setImageUrl(blob.url ?? '')
    } catch {
      setImageUrl('')
      setImagePreview(null)
      toast.error('Gagal mengupload gambar')
    } finally {
      setUploading(false)
    }
  }

  const handleFormAction = (formData: FormData) => {
    formData.set('gambar', imageUrl)
    return formAction(formData)
  }

  return (
    <form action={handleFormAction} className="space-y-6">
      <div className="flex flex-col space-y-3">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <ImageIcon size={16} className="text-primary" /> Upload Gambar Iklan
        </label>
        <div className="relative w-full border-2 border-dashed border-gray-200 hover:border-primary rounded-xl transition-all p-6 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer min-h-[160px]">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          {uploading ? (
            <span className="type-muted font-medium text-center">Mengupload...</span>
          ) : (
            <>
              <Upload size={28} className="text-gray-400 mb-2" />
              <span className="type-muted font-medium text-center">
                {imagePreview ? 'Klik untuk ganti gambar' : 'Klik atau drag gambar iklan di sini'}
              </span>
            </>
          )}
        </div>
      </div>

      {imagePreview && (
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Preview Baru</p>
          <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border-2 border-gray-200">
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
          </div>
        </div>
      )}

      {currentIklan && !imagePreview && (
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Iklan Aktif Sekarang</p>
          <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border-2 border-gray-200">
            <Image src={currentIklan} alt="Iklan aktif" fill className="object-cover" />
          </div>
        </div>
      )}

      <div className="pt-4 border-t-2 border-gray-100 flex justify-end">
        <button
          type="submit"
          disabled={isPending || uploading}
          className="w-full md:w-auto bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all text-base tracking-wide uppercase shadow-sm disabled:opacity-60"
        >
          {isPending ? 'Menyimpan...' : 'Upload Iklan'}
        </button>
      </div>
    </form>
  )
}

export default FormUploadIklan
