import { Suspense } from 'react'
import EditTentangKamiContent from '@/components/admin/EditTentangKamiContent'
import FormSkeleton from '@/components/skeletons/FormSkeleton'

const EditAboutPage = () => {
  return (
    <div className="mx-auto bg-white rounded-[24px] border-2 border-gray-200 p-6 md:p-10 shadow-sm">
      <div className="border-b-2 border-gray-100 pb-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-wide">
          Edit Halaman Tentang Kami
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Perbarui informasi profil media, visi misi, layanan, serta tautan media sosial.
        </p>
      </div>
      <Suspense fallback={<FormSkeleton />}>
        <EditTentangKamiContent />
      </Suspense>
    </div>
  )
}

export default EditAboutPage
