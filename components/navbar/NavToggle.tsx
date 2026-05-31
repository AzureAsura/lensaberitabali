'use client'

import { useNavStore } from '@/store/navStore'

const NavToggle = () => {
  const { isOpen, toggle } = useNavStore()

  return (
    <button
      onClick={toggle}
      className="md:hidden flex flex-col justify-between items-center w-6 h-5 relative z-50 focus:outline-none group"
      aria-label="Toggle Menu"
    >
      <span
        className={`w-full h-[3px] bg-primary rounded-full transform transition-all duration-500 ease-in-out ${
          isOpen ? 'rotate-45 translate-y-[8px]' : ''
        }`}
      />
      <span
        className={`w-full h-[3px] bg-primary rounded-full transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-0 -translate-x-4' : 'opacity-100'
        }`}
      />
      <span
        className={`w-full h-[3px] bg-primary rounded-full transform transition-all duration-500 ease-in-out ${
          isOpen ? '-rotate-45 -translate-y-[9px]' : ''
        }`}
      />
    </button>
  )
}

export default NavToggle
