import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { getBeritaById } from '@/lib/data/berita'



const BeritaDetail = async ({ id }: { id: string }) => {
  const berita = await getBeritaById(id)
  if (!berita) notFound()

  const formattedDate = berita.createdAt.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <main className="w-full min-h-screen bg-white font-sans selection:bg-primary/20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">

        {berita.kategori && (
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
              {berita.kategori}
            </span>
          </div>
        )}

        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
          {berita.judul}
        </h1>

        <div className="flex flex-col space-y-1 text-sm text-gray-600 border-b border-gray-100 pb-6 mb-6">
          <p className="font-medium">
            Oleh : <span className="text-primary font-semibold">{berita.penulis}</span>
          </p>
          <p className="text-gray-500">{formattedDate}</p>
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/10] rounded-[24px] overflow-hidden shadow-sm bg-gray-100 mb-2">
          <Image
            src={berita.gambar}
            alt={berita.deskripsiGambar ?? berita.judul}
            fill
            sizes="(max-width: 1024px) 100vw, 850px"
            className="object-cover"
            priority
          />
        </div>

        {berita.deskripsiGambar && (
          <p className="text-xs text-gray-500 text-center mb-8">{berita.deskripsiGambar}</p>
        )}

        <article className="           prose max-w-none

                        prose-black 

                        prose-strong:font-bold

                        prose-li:marker:text-black

                        prose-blockquote:border-l-black prose-blockquote:text-black prose-blockquote:italic

                        prose-code:text-black prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded

                        space-y-8">
          <ReactMarkdown>{berita.konten}</ReactMarkdown>
        </article>

      </div>
    </main>
  )
}

export default BeritaDetail
