'use server'
import prisma from '@/lib/prisma'
import { tentangKamiValidation } from '@/lib/zod'
import { revalidatePath } from 'next/cache'

type ActionState = { error?: string; success?: boolean } | null

export async function updateTentangKamiAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // const session = await auth()
  // if (!session?.user || (session.user as any).role !== 'admin') return { error: 'Unauthorized' }

  const body = {
    tentangKami: formData.get('tentangKami') as string,
    visiMisi: formData.get('visiMisi') as string,
    layanan: formData.get('layanan') as string,
    email: formData.get('email') as string,
    whatsapp: formData.get('whatsapp') as string,
    instagram: formData.get('instagram') as string,
    tiktok: formData.get('tiktok') as string,
    youtube: formData.get('youtube') as string,
  }

  const validated = tentangKamiValidation.safeParse(body)
  if (!validated.success) return { error: validated.error.issues[0].message }

  const existing = await prisma.tentangKami.findFirst()

  if (existing) {
    await prisma.tentangKami.update({ where: { id: existing.id }, data: validated.data })
  } else {
    await prisma.tentangKami.create({ data: validated.data })
  }

  revalidatePath('/tentang-kami')
  return { success: true }
}

