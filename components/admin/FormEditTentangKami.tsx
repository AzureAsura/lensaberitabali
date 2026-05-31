'use client'
import { useActionState, useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Mail, Phone, FileText, Save, Info } from 'lucide-react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import { updateTentangKamiAction } from '@/lib/actions/tentangKami'

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
  defaultValues?: {
    tentangKami?: string
    visiMisi?: string
    layanan?: string
    email?: string
    whatsapp?: string
    instagram?: string
    tiktok?: string
    youtube?: string
  }
}

const FormEditTentangKami = ({ defaultValues }: Props) => {
  const [aboutUs, setAboutUs] = useState(defaultValues?.tentangKami ?? '')
  const [visionMission, setVisionMission] = useState(defaultValues?.visiMisi ?? '')
  const [services, setServices] = useState(defaultValues?.layanan ?? '')
  const [state, formAction, isPending] = useActionState(updateTentangKamiAction, null)

  useEffect(() => {
    if (state?.success) toast.success('Perubahan berhasil disimpan!')
    if (state?.error) toast.error(state.error)
  }, [state])

  const handleFormAction = (formData: FormData) => {
    formData.set('tentangKami', aboutUs)
    formData.set('visiMisi', visionMission)
    formData.set('layanan', services)
    return formAction(formData)
  }

  return (
    <form action={handleFormAction} className="space-y-10">

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <Info size={16} className="text-primary" /> Deskripsi Tentang Kami
        </label>
        <div className={editorClass}>
          <MdEditor value={aboutUs} onChange={setAboutUs} language="en-US" previewTheme="github" style={{ height: 300 }} />
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <FileText size={16} className="text-primary" /> Visi &amp; Misi Kami
        </label>
        <div className={editorClass}>
          <MdEditor value={visionMission} onChange={setVisionMission} language="en-US" previewTheme="github" style={{ height: 300 }} />
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <FileText size={16} className="text-primary" /> Apa yang Kami Sajikan?
        </label>
        <div className={editorClass}>
          <MdEditor value={services} onChange={setServices} language="en-US" previewTheme="github" style={{ height: 300 }} />
        </div>
      </div>

      <div className="border-t-2 border-gray-100 pt-8 space-y-4">
        <label className="text-sm font-bold text-primary uppercase tracking-wider block">
          Pengaturan Kontak Kami
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
              <Mail size={14} /> Email Media
            </span>
            <input type="email" name="email" defaultValue={defaultValues?.email ?? ''}
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
              <Phone size={14} /> Nomor WhatsApp
            </span>
            <input type="text" name="whatsapp" defaultValue={defaultValues?.whatsapp ?? ''}
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
              <FaInstagram size={14} /> Username Instagram
            </span>
            <input type="text" name="instagram" defaultValue={defaultValues?.instagram ?? ''}
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="font-extrabold text-xs">𝞃</span> Username Tiktok
            </span>
            <input type="text" name="tiktok" defaultValue={defaultValues?.tiktok ?? ''}
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
          </div>
          <div className="flex flex-col space-y-1.5 md:col-span-2">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
              <FaYoutube size={14} /> Username / URL Youtube
            </span>
            <input type="text" name="youtube" defaultValue={defaultValues?.youtube ?? ''}
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
          </div>
        </div>
      </div>


      <div className="pt-6 border-t-2 border-gray-100 flex justify-end">
        <button type="submit" disabled={isPending}
          className="w-full md:w-auto bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-all text-base tracking-wide uppercase shadow-sm flex items-center justify-center gap-2 disabled:opacity-60">
          <Save size={18} /> {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

    </form>
  )
}

export default FormEditTentangKami
