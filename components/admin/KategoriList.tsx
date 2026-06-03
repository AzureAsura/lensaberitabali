import { getAllKategori } from '@/lib/data/kategori'
import KategoriTable from './KategoriTable'

const KategoriList = async () => {
  const data = await getAllKategori()
  return <KategoriTable data={data} />
}

export default KategoriList
