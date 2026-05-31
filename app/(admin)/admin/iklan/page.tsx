import { Suspense } from 'react'
import IklanContent from '@/components/admin/IklanContent'
import FormSkeleton from '@/components/skeletons/FormSkeleton'

const IklanPage = () => {
  return (
    <div className="mx-auto bg-white rounded-[24px] border-2 border-gray-200 p-6 md:p-10 shadow-sm">
      <div className="border-b-2 border-gray-100 pb-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-wide">
          Upload Iklan
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload gambar iklan baru. Iklan sebelumnya akan otomatis dinonaktifkan.
        </p>
      </div>
      <Suspense fallback={<FormSkeleton />}>
        <IklanContent />
      </Suspense>
    </div>
  )
}

export default IklanPage
