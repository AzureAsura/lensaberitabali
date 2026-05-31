import { getActiveIklan } from '@/lib/data/iklan'
import FormUploadIklan from './FormUploadIklan'

const IklanContent = async () => {
  const iklan = await getActiveIklan()
  return <FormUploadIklan currentIklan={iklan?.gambar} />
}

export default IklanContent
