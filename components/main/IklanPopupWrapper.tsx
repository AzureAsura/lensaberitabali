import { getActiveIklan } from '@/lib/data/iklan'
import IklanPopup from './IklanPopup'

const IklanPopupWrapper = async () => {
  const iklan = await getActiveIklan()
  if (!iklan) return null
  return <IklanPopup gambar={iklan.gambar} />
}

export default IklanPopupWrapper
