'use client'
import { useActionState, useEffect } from 'react'
import { FolderPlus, Save } from 'lucide-react'
import { updateKategoriAction } from '@/lib/actions/kategori'
import { toast } from 'sonner'

type Props = {
  id: string
  defaultNama: string
}

const FormEditKategori = ({ id, defaultNama }: Props) => {
  const boundAction = updateKategoriAction.bind(null, id)
  const [state, formAction, isPending] = useActionState(boundAction, null)

  useEffect(() => {
    if (state?.success) toast.success('Kategori berhasil diperbarui!')
    if (state?.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction} className="space-y-6">

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <FolderPlus size={16} className="text-primary" /> Nama Kategori
        </label>
        <input
          type="text"
          name="nama"
          defaultValue={defaultNama}
          placeholder="Masukkan nama kategori"
          className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-primary transition-all text-base font-medium"
          required
        />
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
