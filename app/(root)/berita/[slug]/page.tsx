import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BeritaDetail from '@/components/main/BeritaDetail'
import BeritaDetailSkeleton from '@/components/skeletons/BeritaDetailSkeleton'
import JsonLd from '@/components/seo/JsonLd'
import { getBeritaBySlug } from '@/lib/data/berita'
import { SITE_NAME, SITE_URL } from '@/lib/config/site'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const berita = await getBeritaBySlug(slug)

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
      url: `${SITE_URL}/berita/${slug}`,
      type: 'article',
      images: berita.gambar ? [{ url: berita.gambar, alt: berita.judul }] : [],
      publishedTime: berita.createdAt.toISOString(),
      modifiedTime: berita.updatedAt.toISOString(),
      authors: [berita.penulis],
    },
    twitter: {
      card: 'summary_large_image',
      title: berita.judul,
      description,
      images: berita.gambar ? [berita.gambar] : [],
    },
    alternates: { canonical: `${SITE_URL}/berita/${slug}` },
  }
}

const ArticleDetailPage = async ({ params }: Props) => {
  const { slug } = await params
  const berita = await getBeritaBySlug(slug)

  if (!berita) notFound()

  const description = berita.konten
    .replace(/[#*_`>\-\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 155)

  const url = `${SITE_URL}/berita/${slug}`

  const newsArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: berita.judul,
    description,
    image: berita.gambar ? [berita.gambar] : undefined,
    datePublished: berita.createdAt.toISOString(),
    dateModified: berita.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: berita.penulis,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.jpeg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(berita.kategori ? { articleSection: berita.kategori } : {}),
  }

  return (
    <>
      <JsonLd data={newsArticleJsonLd} />
      <Suspense fallback={<BeritaDetailSkeleton />}>
        <BeritaDetail slug={slug} />
      </Suspense>
    </>
  )
}

export default ArticleDetailPage
