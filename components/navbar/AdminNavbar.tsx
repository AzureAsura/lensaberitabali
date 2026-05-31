"use client";
import React, { useState } from 'react';
import {
  Menu, X, Plus, List,
  ChevronRight, LogOut
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { signOutFunction } from '@/lib/actions/auth';

export const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className="flex items-center justify-between py-3 px-4 hover:bg-primary/5 rounded-xl transition-all group"
    >
      <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">
        {label}
      </span>
      <ChevronRight size={16} className="text-gray-400 group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
    </Link>
  );

  return (
    <>
      <header className="sticky top-0 z-[60] bg-white border-b-2 border-gray-200 h-16 px-4 md:px-6 flex items-center justify-between">
        <Link href='/admin' className="flex items-center cursor-pointer select-none">
          <div className="flex flex-col justify-center md:pl-4">
            <span className="text-xs font-black text-primary uppercase tracking-wider leading-tight">
              Lensa Berita Bali
            </span>
            <span className="text-base font-black text-gray-900 tracking-tight leading-none uppercase">
              Admin Panel
            </span>
          </div>
        </Link>

        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-primary bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-b-2 border-gray-200 shadow-xl lg:hidden flex flex-col overflow-y-auto max-h-[calc(100vh-64px)] animate-in slide-in-from-right duration-300">
            <div className="p-6 space-y-4">

              <div className="border-b border-gray-100 pb-2">
                <NavLink href="/admin" label="Dashboard" />
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-1 text-xs font-black uppercase text-primary tracking-widest">
                    <div className="flex items-center gap-2">
                      <Plus size={16} /> Aksi
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-3 space-y-1">
                    <NavLink href="/admin/tambah-berita" label="Tambah Berita" />
                    <NavLink href="/admin/edit-tentang-kami" label="Edit Tentang Kami" />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-none">
                  <AccordionTrigger className="hover:no-underline py-3 px-1 text-xs font-black uppercase text-primary tracking-widest">
                    <div className="flex items-center gap-2">
                      <List size={16} /> Data
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-3 space-y-1">
                    <NavLink href="/admin/berita" label="Berita" />
                    <NavLink href="/admin/iklan" label="Iklan" />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <form action={signOutFunction} className="pt-4 border-t border-gray-100">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full justify-between h-12 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-sm tracking-wide transition-all"
                >
                  Keluar <LogOut size={16} />
                </Button>
              </form>

            </div>
          </div>
        )}
      </header>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-50 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};
