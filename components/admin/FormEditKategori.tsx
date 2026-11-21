'use client'
import { useActionState, useEffect } from 'react'
import { FolderPlus, Save } from 'lucide-react'
import { updateKategoriAction } from '@/lib/actions/kategori'
import { toast } from 'sonner'
import { kategoriValidation } from '@/lib/zod'
import { useLiveValidation } from '@/lib/useLiveValidation'
import FieldError from '@/components/admin/FieldError'

type Props = {
  id: string
  defaultNama: string
}

const FormEditKategori = ({ id, defaultNama }: Props) => {
  const boundAction = updateKategoriAction.bind(null, id)
  const [state, formAction, isPending] = useActionState(boundAction, null)
  const v = useLiveValidation(kategoriValidation, state?.fieldErrors)

  useEffect(() => {
    if (state?.success) toast.success('Kategori berhasil diperbarui!')
    if (state?.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction} noValidate onChange={v.onChange} className="space-y-6">

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <FolderPlus size={16} className="text-primary" /> Nama Kategori
        </label>
        <input
          type="text"
          name="nama"
          defaultValue={state?.fields?.nama ?? defaultNama}
          placeholder="Masukkan nama kategori"
          className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-primary transition-all text-base font-medium"
          required
        />
        <FieldError msg={v.error('nama')} />
      </div>

      <div className="pt-4 border-t-2 border-gray-100 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="w-full md:w-auto bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all text-base tracking-wide uppercase shadow-sm disabled:opacity-60 flex items-center justify-center gap-2"
        >
          <Save size={18} />
          {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

    </form>
  )
}

export default FormEditKategori
