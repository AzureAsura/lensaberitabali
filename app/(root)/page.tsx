import { Suspense } from 'react'
import type { Metadata } from 'next'
import HeroNews from '@/components/main/Hero'
import HeroSkeleton from '@/components/skeletons/HeroSkeleton'

export const metadata: Metadata = {
  title: 'Berita Terkini Bali',
  description: 'Baca berita terbaru seputar Bali — politik, budaya, wisata, kuliner, dan informasi lokal terpercaya.',
  openGraph: {
    title: 'Berita Terkini Bali | Lensa Berita Bali',
    description: 'Baca berita terbaru seputar Bali — politik, budaya, wisata, kuliner, dan informasi lokal terpercaya.',
    url: 'https://lensaberitabali.com',
    type: 'website',
  },
  alternates: { canonical: 'https://lensaberitabali.com' },
}

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
