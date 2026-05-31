import { Suspense } from 'react'
import type { Metadata } from 'next'
import TentangKamiContent from '@/components/main/TentangKamiContent'
import TentangKamiSkeleton from '@/components/skeletons/TentangKamiSkeleton'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Kenali Lensa Berita Bali — visi, misi, layanan, dan cara menghubungi kami.',
  openGraph: {
    title: 'Tentang Kami | Lensa Berita Bali',
    description: 'Kenali Lensa Berita Bali — visi, misi, layanan, dan cara menghubungi kami.',
    url: 'https://lensaberitabali.com/tentang-kami',
    type: 'website',
  },
  alternates: { canonical: 'https://lensaberitabali.com/tentang-kami' },
}

const AboutPage = () => {
  return (
    <Suspense fallback={<TentangKamiSkeleton />}>
      <TentangKamiContent />
    </Suspense>
  )
}

export default AboutPage
