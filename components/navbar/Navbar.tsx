import Image from 'next/image'
import NavToggle from './NavToggle'
import NavMenu from './NavMenu'
import NavLinks from './NavLinks'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b-2 border-gray-200 py-4 relative font-sans">
      <div className="flex items-center justify-between max-w-7xl px-4 md:px-6 mx-auto">
        <Link href="/" className="flex items-center space-x-3 cursor-pointer">
          <Image
            src="/logo.jpeg"
            alt="Lensa Berita Bali"
            width={48}
            height={48}
            className="rounded-full shadow-sm"
          />

          <div className="flex flex-col justify-center">
            <span className="text-md font-bold text-primary tracking-wide uppercase leading-tight">
              Lensa Berita
            </span>
            <span className="text-xl font-black text-primary tracking-tight leading-none">
              Bali
            </span>
          </div>
        </Link>

        <NavLinks />

        <div className="hidden md:block">
          <a
            href="https://wa.me/6281936635502"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-sm block text-center text-sm md:text-base"
          >
            Pasang Iklan via WhatsApp
          </a>
        </div>

        <NavToggle />
      </div>

      <NavMenu />
    </nav>
  )
}

export default Navbar
