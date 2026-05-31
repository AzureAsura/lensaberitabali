"use client";
import React from 'react';
import {
  Newspaper,
  PlusCircle,
  Pencil,
  FileText,
  LogOut,
  LayoutDashboard,
  ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import { signOutFunction } from '@/lib/actions/auth';

const NavLink = ({ href, label, icon: Icon }: any) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-all font-bold text-sm tracking-wide group"
  >
    <Icon size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
    {label}
  </Link>
);

export const AdminSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-16 w-72 h-[calc(100vh-64px)] bg-white border-r-2 border-gray-200 p-6 overflow-y-auto">
      <div className="flex-1 space-y-6">

        <div>
          <p className="px-4 text-xs font-black text-primary uppercase tracking-widest mb-3">
            Utama
          </p>
          <NavLink href="/admin" label="Dashboard" icon={LayoutDashboard} />
        </div>

        <div>
          <p className="px-4 text-xs font-black text-primary uppercase tracking-widest mb-3">
            Aksi
          </p>
          <div className="space-y-1">
            <NavLink href="/admin/tambah-berita" label="Tambah Berita" icon={PlusCircle} />
            <NavLink href="/admin/edit-tentang-kami" label="Edit Tentang Kami" icon={FileText} />
          </div>
        </div>

        <div>
          <p className="px-4 text-xs font-black text-primary uppercase tracking-widest mb-3">
            Data
          </p>
          <div className="space-y-1">
            <NavLink href="/admin/berita" label="Berita" icon={Newspaper} />
          <NavLink href="/admin/iklan" label="Iklan" icon={ImageIcon} />
          </div>
        </div>
      </div>

      <form action={signOutFunction} className="mt-auto pt-4 border-t-2 border-gray-200">
        <button type="submit" className="flex items-center justify-between w-full px-4 py-3 text-primary bg-primary/5 hover:bg-primary hover:text-white rounded-xl transition-all font-bold text-sm tracking-wide group">
          Keluar
          <LogOut size={18} className="text-primary group-hover:text-white transition-all group-hover:translate-x-1" />
        </button>
      </form>
    </aside>
  );
};
