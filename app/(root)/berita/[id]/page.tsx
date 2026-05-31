import { Suspense } from 'react'
import type { Metadata } from 'next'
import BeritaDetail from '@/components/main/BeritaDetail'
import BeritaDetailSkeleton from '@/components/skeletons/BeritaDetailSkeleton'
import { getBeritaById } from '@/lib/data/berita'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const berita = await getBeritaById(id)

  if (!berita) return { title: 'Berita Tidak Ditemukan' }

  const description = berita.konten
    .replace(/[#*_`>\-\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 155)

  return {
    title: berita.judul,
    description,
    openGraph: {
      title: berita.judul,
      description,
      url: `https://lensaberitabali.com/berita/${id}`,
      type: 'article',
      images: berita.gambar ? [{ url: berita.gambar, alt: berita.judul }] : [],
      publishedTime: berita.createdAt.toISOString(),
      authors: [berita.penulis],
    },
    twitter: {
      card: 'summary_large_image',
      title: berita.judul,
      description,
      images: berita.gambar ? [berita.gambar] : [],
    },
    alternates: { canonical: `https://lensaberitabali.com/berita/${id}` },
  }
}

const ArticleDetailPage = async ({ params }: Props) => {
  const { id } = await params

  return (
    <Suspense fallback={<BeritaDetailSkeleton />}>
      <BeritaDetail id={id} />
    </Suspense>
  )
}

export default ArticleDetailPage
