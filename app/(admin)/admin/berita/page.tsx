import { Suspense } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import BeritaList from '@/components/admin/BeritaList'
import BeritaTableSkeleton from '@/components/skeletons/BeritaTableSkeleton'

const BeritaAdminPage = () => {
  return (
    <div className="mx-auto bg-white rounded-[24px] border-2 border-gray-200 p-6 md:p-10 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-primary uppercase tracking-wide">Daftar Berita</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola seluruh artikel berita yang telah diterbitkan.</p>
        </div>
        <Link href="/admin/tambah-berita">
          <button className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all text-sm">
            <Plus size={16} /> Tambah Berita
          </button>
        </Link>
      </div>
      <Suspense fallback={<BeritaTableSkeleton />}>
        <BeritaList />
      </Suspense>
    </div>
  )
}

export default BeritaAdminPage
