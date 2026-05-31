import { getTentangKami } from '@/lib/data/tentangKami'
import FormEditTentangKami from './FormEditTentangKami'

const EditTentangKamiContent = async () => {
  const data = await getTentangKami()
  return <FormEditTentangKami defaultValues={data ?? undefined} />
}

export default EditTentangKamiContent
