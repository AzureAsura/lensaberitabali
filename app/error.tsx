'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import StatusPage, { statusButtonClass } from '@/components/StatusPage'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <StatusPage
      code="500"
      title="Terjadi kesalahan"
      description="Maaf, ada masalah saat memuat halaman ini. Silakan coba lagi."
    >
      <button onClick={() => unstable_retry()} className={statusButtonClass}>Coba Lagi</button>
      <Link href="/" className={`${statusButtonClass} !bg-white !text-primary border-2 border-primary hover:!bg-gray-50`}>
        Ke Beranda
      </Link>
    </StatusPage>
  )
}
