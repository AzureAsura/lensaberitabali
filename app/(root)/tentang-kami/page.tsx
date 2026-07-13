import { Suspense } from 'react'
import type { Metadata } from 'next'
import TentangKamiContent from '@/components/main/TentangKamiContent'
import TentangKamiSkeleton from '@/components/skeletons/TentangKamiSkeleton'
import { SITE_URL } from '@/lib/config/site'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Kenali Lensa Berita Bali — visi, misi, layanan, dan cara menghubungi kami.',
  openGraph: {
    title: 'Tentang Kami | Lensa Berita Bali',
    description: 'Kenali Lensa Berita Bali — visi, misi, layanan, dan cara menghubungi kami.',
    url: `${SITE_URL}/tentang-kami`,
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/tentang-kami` },
}

const AboutPage = () => {
  return (
    <Suspense fallback={<TentangKamiSkeleton />}>
      <TentangKamiContent />
    </Suspense>
  )
}

export default AboutPage
