import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ page, totalPages }: { page: number; totalPages: number }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2 mt-12 select-none">

      {page > 1 ? (
        <Link
          href={`/?page=${page - 1}`}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border-2 border-gray-200 text-black shadow-lg hover:bg-gray-50 transition-all duration-200"
        >
          <ChevronLeft size={18} />
        </Link>
      ) : (
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 border-2 border-gray-100 text-gray-400 cursor-not-allowed shadow-inner">
          <ChevronLeft size={18} />
        </div>
      )}

      {pageNumbers.map((p) => {
        const isActive = p === page
        return isActive ? (
          <span
            key={p}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary text-white font-bold text-base shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all duration-200 cursor-default"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={`/?page=${p}`}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border-2 border-gray-200 text-black font-bold text-base hover:bg-gray-50 shadow-lg transition-all duration-200"
          >
            {p}
          </Link>
        )
      })}

      {page < totalPages ? (
        <Link
          href={`/?page=${page + 1}`}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border-2 border-gray-200 text-black shadow-lg hover:bg-gray-50 transition-all duration-200"
        >
          <ChevronRight size={18} />
        </Link>
      ) : (
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 border-2 border-gray-100 text-gray-400 cursor-not-allowed shadow-inner">
          <ChevronRight size={18} />
        </div>
      )}

    </div>
  )
}

export default Pagination