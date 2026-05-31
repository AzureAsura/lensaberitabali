import { Suspense } from 'react'
import BeritaDetail from '@/components/main/BeritaDetail'
import BeritaDetailSkeleton from '@/components/skeletons/BeritaDetailSkeleton'

const ArticleDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <Suspense fallback={<BeritaDetailSkeleton />}>
      <BeritaDetail id={id} />
    </Suspense>
  )
}

export default ArticleDetailPage
