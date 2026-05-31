'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const IklanPopup = ({ gambar }: { gambar: string }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10_000)
    return () => clearTimeout(timeout)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative rounded-[24px] overflow-hidden shadow-2xl bg-white max-w-[90vw] max-h-[85vh]">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-all"
        >
          <X size={18} className="text-foreground" />
        </button>
        <Image
          src={gambar}
          alt="Iklan"
          width={0}
          height={0}
          sizes="90vw"
          style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '85vh', display: 'block' }}
        />
      </div>
    </div>
  )
}

export default IklanPopup
