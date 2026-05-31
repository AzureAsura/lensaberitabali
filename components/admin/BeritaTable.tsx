'use client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteBeritaAction } from '@/lib/actions/berita'
import Link from 'next/link'
import Image from 'next/image'

type Berita = {
  id: string
  judul: string
  gambar: string
  penulis: string
  createdAt: Date
}

const BeritaTable = ({ data }: { data: Berita[] }) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = (id: string) => {
    if (!confirm('Yakin hapus berita ini?')) return
    startTransition(async () => {
      const result = await deleteBeritaAction(id)
      if (result?.success) toast.success('Berita berhasil dihapus!')
      if (result?.error) toast.error(result.error)
    })
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full caption-bottom text-sm select-none">
        
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            {/* TAMBAHAN 1: Kolom Nomor */}
            <th className="h-12 px-4 text-center align-middle type-muted font-black uppercase tracking-wider text-foreground w-[50px] min-w-[50px]">
              No
            </th>
            <th className="h-12 px-6 text-left align-middle type-muted font-black uppercase tracking-wider text-foreground w-[100px] min-w-[100px]">
              Gambar
            </th>
            <th className="h-12 px-6 text-left align-middle type-muted font-black uppercase tracking-wider text-foreground min-w-[300px]">
              Judul
            </th>
            <th className="h-12 px-6 text-left align-middle type-muted font-black uppercase tracking-wider text-foreground hidden md:table-cell min-w-[150px]">
              Penulis
            </th>
            {/* TAMBAHAN 2: Kolom Tanggal */}
            <th className="h-12 px-6 text-left align-middle type-muted font-black uppercase tracking-wider text-foreground min-w-[140px]">
              Tanggal
            </th>
            <th className="h-12 px-6 text-right align-middle type-muted font-black uppercase tracking-wider text-foreground min-w-[100px]">
              Opsi
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {data.length === 0 && (
            <tr>
              {/* colSpan diubah menjadi 6 mengikuti total kolom baru */}
              <td colSpan={6} className="py-10 text-center align-middle type-muted font-medium">
                Belum ada berita.
              </td>
            </tr>
          )}
          
          {data.map((item, index) => (
            <tr 
              key={item.id} 
              className="transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-muted border-b border-gray-100"
            >
              {/* Render nomor urut otomatis */}
              <td className="p-4 align-middle text-center font-bold text-gray-400 text-xs">
                {index + 1}
              </td>

              <td className="p-6 align-middle">
                <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <Image src={item.gambar} alt={item.judul} fill className="object-cover" />
                </div>
              </td>

              <td className="p-6 align-middle">
                <p className="type-muted font-bold text-foreground line-clamp-2">
                  {item.judul}
                </p>
              </td>

              <td className="p-6 align-middle type-muted hidden md:table-cell font-medium">
                {item.penulis}
              </td>

              {/* Render format tanggal buatan javascript lokal */}
              <td className="p-6 align-middle text-gray-500 font-medium text-xs whitespace-nowrap">
                {new Date(item.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </td>

              <td className="p-6 align-middle text-right">
                <div className="flex items-center justify-end gap-1">
                  <Link href={`/admin/edit-berita/${item.id}`}>
                    <button className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                      <Pencil size={15} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                    className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default BeritaTable