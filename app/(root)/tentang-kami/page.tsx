import { Suspense } from 'react'
import TentangKamiContent from '@/components/main/TentangKamiContent'
import TentangKamiSkeleton from '@/components/skeletons/TentangKamiSkeleton'

const AboutPage = () => {
  return (
    <Suspense fallback={<TentangKamiSkeleton />}>
      <TentangKamiContent />
    </Suspense>
  )
}

export default AboutPage
