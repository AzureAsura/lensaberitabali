import FormTambahBerita from '@/components/admin/FormTambahBerita'
import { getAllKategori } from '@/lib/data/kategori'

const page = async () => {
  const kategoris = await getAllKategori()

  return (
    <div className=" mx-auto bg-white rounded-[24px] border-2 border-gray-200 p-6 md:p-10 shadow-sm">

      <div className="border-b-2 border-gray-100 pb-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-wide">
          Tambah Berita Baru
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Silakan isi formulir di bawah ini untuk menerbitkan artikel berita terbaru.
        </p>
      </div>

      <FormTambahBerita kategoris={kategoris} />
    </div>
  )
}

export default page