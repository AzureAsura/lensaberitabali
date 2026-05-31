import { Suspense } from 'react'
import Navbar from '@/components/navbar/Navbar'
import IklanPopupWrapper from '@/components/main/IklanPopupWrapper'
import Footer from '@/components/Footer'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      
      <Suspense fallback={null}>
        <IklanPopupWrapper />
      </Suspense>
    </div>
  )
}

export default layout