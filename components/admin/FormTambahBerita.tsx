'use client'
import { useActionState, useState, useEffect, useRef } from 'react'
import { Type, User, ImageIcon, Upload, FileText, Tag } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { createBeritaAction } from '@/lib/actions/berita'
import { toast } from 'sonner'
import { MAX_IMAGE_SIZE } from '@/lib/config/upload'

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

type Kategori = { id: string; nama: string }

const FormTambahBerita = ({ kategoris }: { kategoris: Kategori[] }) => {
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [state, formAction, isPending] = useActionState(createBeritaAction, null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state?.success) toast.success('Berita berhasil diterbitkan!')
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
    formData.set('konten', content)
    if (file) formData.set('gambar', file)
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
            defaultValue={state?.fields?.judul ?? ''}
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
            defaultValue={state?.fields?.penulis ?? ''}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-primary transition-all text-base font-medium"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <ImageIcon size={16} className="text-primary" /> Unggah Gambar Utama
          </label>
          <div className="relative w-full border-2 border-dashed border-gray-200 hover:border-primary rounded-xl transition-all p-4 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer min-h-[110px]">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image src={imagePreview} alt="preview" fill className="object-cover" />
              </div>
            ) : (
              <>
                <Upload size={24} className="text-gray-400 mb-1" />
                <span className="text-sm font-semibold text-gray-600 text-center">Pilih gambar</span>
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
            defaultValue={state?.fields?.deskripsiGambar ?? ''}
            rows={3}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-primary transition-all text-base font-medium resize-none h-[110px]"
          />
        </div>
      </div>

      {/* <div className="flex flex-col space-y-2">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <Tag size={16} className="text-primary" /> Kategori
        </label>
        <select
          name="kategori"
          className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-primary transition-all text-base font-medium bg-white"
        >
          <option value="">-- Pilih Kategori --</option>
          {kategoris.map((k) => (
            <option key={k.id} value={k.nama}>{k.nama}</option>
          ))}
        </select>
      </div> */}

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
          disabled={isPending}
          className="w-full md:w-auto bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all text-base tracking-wide uppercase shadow-sm disabled:opacity-60"
        >
          {isPending ? 'Menerbitkan...' : 'Terbitkan Berita'}
        </button>
      </div>
    </form>
  )
}

export default FormTambahBerita
