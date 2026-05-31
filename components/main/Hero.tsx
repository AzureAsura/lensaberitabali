import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getBeritaList } from '@/lib/data/berita'
import Pagination from './Pagination'

const HeroNews = async ({ page = 1 }: { page?: number }) => {
  const { data: berita, totalPages } = await getBeritaList(page)

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 font-sans">
      <h2 className="type-section-title text-center mb-10">Berita Terbaru</h2>

      {berita.length === 0 ? (
        <p className="type-body text-center text-muted-foreground">Belum ada berita.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {berita.map((item: { id: string; judul: string; gambar: string }) => (
            <div key={item.id} className="group cursor-pointer flex flex-col space-y-4">
              <Link href={`/berita/${item.id}`} className="relative w-full aspect-[16/10] overflow-hidden rounded-[24px] shadow-sm bg-gray-100">
                <Image
                  src={item.gambar}
                  alt={item.judul}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-in-out"
                />
              </Link>
              <Link href={`/berita/${item.id}`}>
                <h3 className="type-card-title line-clamp-3 group-hover:underline">
                  {item.judul}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </section>
  )
}

export default HeroNews
