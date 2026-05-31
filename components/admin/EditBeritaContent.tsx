import { getBeritaById } from '@/lib/data/berita'
import { notFound } from 'next/navigation'
import FormEditBerita from './FormEditBerita'

const EditBeritaContent = async ({ id }: { id: string }) => {
  const berita = await getBeritaById(id)
  if (!berita) notFound()
  return <FormEditBerita id={id} defaultValues={berita} />
}

export default EditBeritaContent
