'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useNavStore } from '@/store/navStore'

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
]

const NavMenu = () => {
  const { isOpen, close } = useNavStore()
  const pathname = usePathname()

  return (
    <div
      className={`absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-md md:hidden transition-all duration-500 ease-in-out overflow-hidden z-40 ${
        isOpen ? 'max-h-64 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
      }`}
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <div className="flex flex-col items-center space-y-5 px-4 md:px-6">
        {links.map(({ href, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={close}
              className={`font-bold text-lg w-full text-center py-2 transition-colors ${
                active ? 'text-primary' : 'text-black hover:text-primary'
              }`}
            >
              {label}
            </Link>
          )
        })}
        <a
          href="https://wa.me/6281936635502"
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="w-full bg-primary text-white font-semibold py-3 rounded-full text-center text-sm shadow-sm"
        >
          Pasang Iklan via WhatsApp
        </a>
      </div>
    </div>
  )
}

export default NavMenu
