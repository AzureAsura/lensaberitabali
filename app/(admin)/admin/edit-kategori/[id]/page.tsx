import { notFound } from 'next/navigation'
import { getKategoriById } from '@/lib/data/kategori'
import FormEditKategori from '@/components/admin/FormEditKategori'

const EditKategoriPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const kategori = await getKategoriById(id)
  if (!kategori) notFound()

  return (
    <div className="mx-auto bg-white rounded-[24px] border-2 border-gray-200 p-6 md:p-10 shadow-sm">
      <div className="border-b-2 border-gray-100 pb-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-wide">
          Edit Kategori
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Ubah nama kategori yang sudah ada.
        </p>
      </div>

      <FormEditKategori id={id} defaultNama={kategori.nama} />
    </div>
  )
}

export default EditKategoriPage
