"use client"
import { useActionState, useEffect } from 'react'
import { FolderPlus, Save } from 'lucide-react'
import { createKategoriAction } from '@/lib/actions/kategori'
import { toast } from 'sonner'

const TambahKategoriPage = () => {
  const [state, formAction, isPending] = useActionState(createKategoriAction, null)

  useEffect(() => {
    if (state?.success) toast.success('Kategori berhasil ditambahkan!')
    if (state?.error) toast.error(state.error)
  }, [state])

  return (
    <div className="mx-auto bg-white rounded-[24px] border-2 border-gray-200 p-6 md:p-10 shadow-sm">

      <div className="border-b-2 border-gray-100 pb-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-wide">
            Tambah Kategori
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Silakan isi nama taksonomi baru untuk mengelompokkan arsip artikel berita.
          </p>
        </div>
      </div>

      <form action={formAction} className="space-y-6">

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <FolderPlus size={16} className="text-primary" /> Nama Kategori Baru
          </label>
          <input
            type="text"
            name="nama"
            placeholder="Masukkan nama kategori (Contoh: Kriminal, Budaya, Hiburan)"
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
            {isPending ? 'Menyimpan...' : 'Simpan Kategori'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default TambahKategoriPage
