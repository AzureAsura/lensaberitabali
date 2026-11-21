import Link from 'next/link'
import StatusPage, { statusButtonClass } from '@/components/StatusPage'

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="Halaman tidak ditemukan"
      description="Halaman yang kamu cari tidak ada atau sudah dipindahkan."
    >
      <Link href="/" className={statusButtonClass}>Kembali ke Beranda</Link>
    </StatusPage>
  )
}
