import { getBeritaById } from '@/lib/data/berita'
import { getAllKategori } from '@/lib/data/kategori'
import { notFound } from 'next/navigation'
import FormEditBerita from './FormEditBerita'

const EditBeritaContent = async ({ id }: { id: string }) => {
  const [berita, kategoris] = await Promise.all([getBeritaById(id), getAllKategori()])
  if (!berita) notFound()
  return <FormEditBerita id={id} defaultValues={berita} kategoris={kategoris} />
}

export default EditBeritaContent
