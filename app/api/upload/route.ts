import { del, put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const PUT = async (request: Request) => {
  const form = await request.formData()
  const file = form.get('file') as File

  if (!file || file.size === 0) {
    return NextResponse.json({ message: 'File is required' }, { status: 400 })
  }

  if (file.size > 4000000) {
    return NextResponse.json({ message: "File size can't be more than 4mb" }, { status: 400 })
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ message: 'File must be an image' }, { status: 400 })
  }

  const blob = await put(file.name, file, { multipart: true, access: 'public' })

  return NextResponse.json(blob)
}

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const imgUrl = searchParams.get('imgUrl') as string

  await del(imgUrl)
  return NextResponse.json({ status: 200 })
}
