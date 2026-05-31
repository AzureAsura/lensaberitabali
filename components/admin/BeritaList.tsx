import { getBeritaList } from '@/lib/data/berita'
import BeritaTable from './BeritaTable'

const BeritaList = async () => {
  const { data } = await getBeritaList()
  return <BeritaTable data={data} />
}

export default BeritaList
