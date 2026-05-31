import { Suspense } from 'react'
import EditBeritaContent from '@/components/admin/EditBeritaContent'
import FormSkeleton from '@/components/skeletons/FormSkeleton'

const EditBeritaPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <div className="mx-auto bg-white rounded-[24px] border-2 border-gray-200 p-6 md:p-10 shadow-sm">
      <div className="border-b-2 border-gray-100 pb-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-wide">
          Edit Berita
        </h1>
      </div>
      <Suspense fallback={<FormSkeleton />}>
        <EditBeritaContent id={id} />
      </Suspense>
    </div>
  )
}

export default EditBeritaPage
