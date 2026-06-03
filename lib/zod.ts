import { z } from 'zod'

export const signInValidation = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
})

export const registerValidation = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const beritaValidation = z.object({
  judul: z.string().min(1, 'Judul wajib diisi'),
  penulis: z.string().min(1, 'Penulis wajib diisi'),
  deskripsiGambar: z.string().optional(),
  konten: z.string().min(1, 'Isi berita wajib diisi'),
  kategori: z.string().optional(),
})

export const tentangKamiValidation = z.object({
  tentangKami: z.string().min(1, 'Deskripsi wajib diisi'),
  visiMisi: z.string().min(1, 'Visi & misi wajib diisi'),
  layanan: z.string().min(1, 'Layanan wajib diisi'),
  email: z.string().min(1).email('Format email tidak valid'),
  whatsapp: z.string().min(1, 'WhatsApp wajib diisi'),
  instagram: z.string().min(1, 'Instagram wajib diisi'),
  tiktok: z.string().min(1, 'TikTok wajib diisi'),
  youtube: z.string().min(1, 'YouTube wajib diisi'),
})

export const kategoriValidation = z.object({
  nama: z.string().min(1, 'Nama kategori wajib diisi').max(100, 'Nama kategori terlalu panjang'),
})

export type SignInData = z.infer<typeof signInValidation>
export type BeritaData = z.infer<typeof beritaValidation>
export type TentangKamiData = z.infer<typeof tentangKamiValidation>
export type KategoriData = z.infer<typeof kategoriValidation>
