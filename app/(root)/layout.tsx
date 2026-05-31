import { Suspense } from 'react'
import Navbar from '@/components/navbar/Navbar'
import IklanPopupWrapper from '@/components/main/IklanPopupWrapper'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Suspense fallback={null}>
        <IklanPopupWrapper />
      </Suspense>
    </div>
  )
}

export default layout
