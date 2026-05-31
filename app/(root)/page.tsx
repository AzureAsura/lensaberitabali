import { Suspense } from 'react'
import HeroNews from '@/components/main/Hero'
import HeroSkeleton from '@/components/skeletons/HeroSkeleton'

const Page = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const { page } = await searchParams
  const currentPage = parseInt(page ?? '1')

  return (
    <div>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroNews page={currentPage} />
      </Suspense>
    </div>
  )
}

export default Page
