'use client'
import { useActionState, useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Upload, ImageIcon } from 'lucide-react'
import { uploadIklanAction } from '@/lib/actions/iklan'
import { MAX_IMAGE_SIZE } from '@/lib/config/upload'
import Image from 'next/image'

const FormUploadIklan = ({ currentIklan }: { currentIklan?: string | null }) => {
  const [state, formAction, isPending] = useActionState(uploadIklanAction, null)
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state?.success) toast.success('Iklan berhasil diupload!')
    if (state?.error) toast.error(state.error)
  }, [state])

  // Image is only previewed locally; it is uploaded to Blob by the server action on submit
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0]
    if (!picked) return
    if (picked.size > MAX_IMAGE_SIZE) {
      e.target.value = ''
      return toast.error('Ukuran gambar maksimal 4MB')
    }
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setFile(picked)
    setImagePreview(URL.createObjectURL(picked))
  }

  const handleFormAction = (formData: FormData) => {
    if (file) formData.set('gambar', file)
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
          <Upload size={28} className="text-gray-400 mb-2" />
          <span className="type-muted font-medium text-center">
            {imagePreview ? 'Klik untuk ganti gambar' : 'Klik atau drag gambar iklan di sini'}
          </span>
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
          disabled={isPending}
          className="w-full md:w-auto bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all text-base tracking-wide uppercase shadow-sm disabled:opacity-60"
        >
          {isPending ? 'Menyimpan...' : 'Upload Iklan'}
        </button>
      </div>
    </form>
  )
}

export default FormUploadIklan
