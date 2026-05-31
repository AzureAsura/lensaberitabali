'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
]

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex items-center space-x-10">
      {links.map(({ href, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`font-bold text-lg relative pb-1 border-b-2 transition-colors ${
              active
                ? 'text-primary border-primary'
                : 'text-black border-transparent hover:text-primary'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}

export default NavLinks
