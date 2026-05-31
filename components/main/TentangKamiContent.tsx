import { getTentangKami } from '@/lib/data/tentangKami'
import MdContent from './MdContent'

const TentangKamiContent = async () => {
  const data = await getTentangKami()

  return (
    <main className="w-full min-h-screen bg-white font-sans text-gray-800 selection:bg-primary/20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-12">

        <section className="space-y-4">
          <h1 className="type-section-title text-center mb-8">Tentang Kami</h1>
          <h2 className="text-lg font-bold text-foreground tracking-tight uppercase">
            TENTANG KAMI – Lensa Berita Bali
          </h2>
          {data?.tentangKami ? (
            <MdContent content={data.tentangKami} />
          ) : (
            <p className="type-body text-muted-foreground">Belum ada deskripsi.</p>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground border-b-2 border-primary/20 pb-2">
            Visi &amp; Misi Kami
          </h2>
          {data?.visiMisi ? (
            <MdContent content={data.visiMisi} />
          ) : (
            <p className="type-body text-muted-foreground">Belum ada visi &amp; misi.</p>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Apa yang Kami Sajikan?</h2>
          {data?.layanan ? (
            <MdContent content={data.layanan} />
          ) : (
            <p className="type-body text-muted-foreground">Belum ada layanan.</p>
          )}
        </section>

        {data && (
          <section className="bg-gray-50 rounded-2xl p-6 md:p-8 space-y-4 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-foreground uppercase tracking-wide text-primary">
              Kontak Kami
            </h2>
            <p className="type-body">
              Jika Anda ingin bekerja sama, memasang iklan, atau mengirim informasi:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 type-body">
              <div className="space-y-2">
                <p><span className="font-semibold text-gray-600">Email:</span>{' '}
                  <a href={`mailto:${data.email}`} className="text-primary hover:underline font-medium break-words">{data.email}</a>
                </p>
                <p><span className="font-semibold text-gray-600">WhatsApp:</span>{' '}
                  <a href={`https://wa.me/${data.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium break-words">{data.whatsapp}</a>
                </p>
                <p><span className="font-semibold text-gray-600">Instagram:</span>{' '}
                  <a href={`https://instagram.com/${data.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium break-words">{data.instagram}</a>
                </p>
              </div>
              <div className="space-y-2">
                <p><span className="font-semibold text-gray-600">Tiktok:</span>{' '}
                  <span className="text-primary font-medium">{data.tiktok}</span>
                </p>
                <p><span className="font-semibold text-gray-600">Youtube:</span>{' '}
                  <a href={`https://youtube.com/${data.youtube.replace('@', '@')}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium break-words">{data.youtube}</a>
                </p>
              </div>
            </div>
          </section>
        )}

      </div>
    </main>
  )
}

export default TentangKamiContent
