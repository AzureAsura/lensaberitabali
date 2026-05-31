"use client";
import React from 'react'
import {
  Plus,
  Megaphone,
  FileText,
  Globe,
  LayoutDashboard
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image';

const DashboardPage = () => {
  return (
    <div className="space-y-8 font-sans select-none">
      <div className="bg-white border-2 border-gray-200 p-8 rounded-[24px] shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6">

        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-[20px] border-2 border-gray-200 bg-gray-50 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
          <Image
            src="/logo.jpeg" 
            alt="Logo Lensa Berita Bali"
            fill
            priority
            className="object-contain " 
          />
        </div>

        <div className="space-y-3 text-center md:text-left">
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-wide">
              Selamat Datang di Lensa Berita Bali
            </h1>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mt-0.5">
              Panel Kontrol Manajemen Konten & Periklanan
            </p>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
            Sistem ini dirancang khusus untuk mengelola seluruh publikasi informasi, artikel berita terkini, serta pengaturan slot media iklan digital secara terpusat. Melalui dashboard ini, Anda dapat menjaga konsistensi distribusi informasi di wilayah Bali secara cepat, responsif, dan efisien demi menyajikan pengalaman membaca terbaik bagi masyarakat.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white border-2 border-gray-200 p-6 rounded-[24px] shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-black text-gray-800 uppercase tracking-wider text-xs mb-4 pb-2 border-b border-gray-100">
              Kelola Konten Sistem
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-normal">
              Gunakan tombol di bawah ini untuk langsung memicu fungsi manipulasi data, baik penambahan konten jurnalisme baru maupun pembaruan materi promosi.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/tambah-berita"
              className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 hover:border-primary text-black hover:bg-gray-50 rounded-xl shadow-md transition-all font-bold text-xs uppercase tracking-wide group"
            >
              <span className="flex items-center gap-2">
                <FileText size={16} className="text-gray-400 group-hover:text-primary" />
                Tambah Berita Baru
              </span>
              <Plus size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/admin/iklan"
              className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 hover:border-primary text-black hover:bg-gray-50 rounded-xl shadow-md transition-all font-bold text-xs uppercase tracking-wide group"
            >
              <span className="flex items-center gap-2">
                <Megaphone size={16} className="text-gray-400 group-hover:text-primary" />
                Atur Ruang Iklan
              </span>
              <Plus size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 p-6 rounded-[24px] shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-black text-gray-800 uppercase tracking-wider text-xs mb-4 pb-2 border-b border-gray-100">
              Pratinjau Navigasi
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-normal">
              Periksa hasil akhir tata letak komponen visual, penempatan banner, dan validasi data tulisan yang telah Anda ubah secara langsung pada halaman publik.
            </p>
          </div>

          <div>
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 p-4 bg-primary text-white hover:bg-primary/90 rounded-xl shadow-lg transition-all font-bold text-xs uppercase tracking-wider text-center"
            >
              <Globe size={16} />
              Lihat Halaman Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardPage