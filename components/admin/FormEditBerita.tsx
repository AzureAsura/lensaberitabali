'use client'
import { useActionState, useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Type, User, ImageIcon, FileText } from 'lucide-react'
import dynamic from 'next/dynamic'
import { updateBeritaAction } from '@/lib/actions/berita'
import Image from 'next/image'

const MdEditor = dynamic(
  () => import('md-editor-rt').then((mod) => mod.MdEditor),
  { ssr: false }
)

const editorClass = `
  border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-primary transition-all
  [&_.md-editor-preview]:p-4
  [&_.md-editor-preview]:font-sans
  [&_.md-editor-preview]:text-foreground
  [&_.md-editor-preview_h1]:type-section-title
  [&_.md-editor-preview_h2]:type-card-title
  [&_.md-editor-preview_h3]:text-lg
  [&_.md-editor-preview_h3]:font-bold
  [&_.md-editor-preview_h3]:text-foreground
  [&_.md-editor-preview_p]:type-body
  [&_.md-editor-preview_ul]:list-disc
  [&_.md-editor-preview_ul]:pl-6
  [&_.md-editor-preview_ul]:space-y-1
  [&_.md-editor-preview_ol]:list-decimal
  [&_.md-editor-preview_ol]:pl-6
  [&_.md-editor-preview_ol]:space-y-1
  [&_.md-editor-preview_li]:type-body
  [&_.md-editor-preview_blockquote]:border-l-4
  [&_.md-editor-preview_blockquote]:border-primary
  [&_.md-editor-preview_blockquote]:pl-4
  [&_.md-editor-preview_blockquote]:italic
  [&_.md-editor-preview_blockquote]:text-muted-foreground
  [&_.md-editor-preview_code]:text-primary
  [&_.md-editor-preview_code]:bg-primary/5
  [&_.md-editor-preview_code]:px-1.5
  [&_.md-editor-preview_code]:py-0.5
  [&_.md-editor-preview_code]:rounded
  [&_.md-editor-preview_code]:text-sm
  [&_.md-editor-preview_a]:text-primary
  [&_.md-editor-preview_a]:underline
  [&_.md-editor-preview_strong]:font-bold
`

type Props = {
  id: string
  defaultValues: {
    judul: string
    penulis: string
    gambar: string
    deskripsiGambar?: string | null
    konten: string
    kategori?: string | null
  }
}

const FormEditBerita = ({ id, defaultValues }: Props) => {
  const [content, setContent] = useState(defaultValues.konten)
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const boundAction = updateBeritaAction.bind(null, id)
  const [state, formAction, isPending] = useActionState(boundAction, null)

  useEffect(() => {
    if (state?.success) toast.success('Berita berhasil diperbarui!')
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
    formData.set('konten', content)
    if (imageUrl) formData.set('gambar', imageUrl)
    return formAction(formData)
  }

  return (
    <form action={handleFormAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <Type size={16} className="text-primary" /> Judul Berita
          </label>
          <input
            type="text"
            name="judul"
            defaultValue={defaultValues.judul}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-primary transition-all text-base font-medium"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <User size={16} className="text-primary" /> Penulis / Jurnalis
          </label>
          <input
            type="text"
            name="penulis"
            defaultValue={defaultValues.penulis}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-primary transition-all text-base font-medium"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <ImageIcon size={16} className="text-primary" /> Ganti Gambar (opsional)
          </label>
          <div className="relative w-full border-2 border-dashed border-gray-200 hover:border-primary rounded-xl transition-all p-4 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer min-h-[110px]">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            {uploading ? (
              <span className="text-sm font-semibold text-gray-500">Mengupload...</span>
            ) : imagePreview ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image src={imagePreview} alt="preview" fill className="object-cover" />
              </div>
            ) : (
              <>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-2">
                  <Image src={defaultValues.gambar} alt="gambar saat ini" fill className="object-cover" />
                </div>
                <span className="text-xs text-gray-500">Klik untuk ganti gambar</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <FileText size={16} className="text-primary" /> Deskripsi Gambar (Caption)
          </label>
          <textarea
            name="deskripsiGambar"
            defaultValue={defaultValues.deskripsiGambar ?? ''}
            rows={3}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-primary transition-all text-base font-medium resize-none h-[110px]"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <FileText size={16} className="text-primary" /> Isi Berita
        </label>
        <div className={editorClass}>
          <MdEditor
            value={content}
            onChange={setContent}
            language="en-US"
            previewTheme="github"
            style={{ height: 350 }}
          />
        </div>
      </div>

      <div className="pt-4 border-t-2 border-gray-100 flex justify-end">
        <button
          type="submit"
          disabled={isPending || uploading}
          className="w-full md:w-auto bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all text-base tracking-wide uppercase shadow-sm disabled:opacity-60"
        >
          {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  )
}

export default FormEditBerita
