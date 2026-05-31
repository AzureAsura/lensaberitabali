const BeritaTableSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
    <table className="w-full">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          {['Gambar', 'Judul', 'Penulis', 'Opsi'].map((h) => (
            <th key={h} className="text-left py-4 px-6 text-xs font-black uppercase tracking-wider text-gray-500">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[0, 1, 2, 3, 4].map((i) => (
          <tr key={i} className="border-b border-gray-100">
            <td className="py-3 px-6">
              <div className="w-16 h-10 rounded-lg bg-gray-200 animate-pulse" />
            </td>
            <td className="py-3 px-6">
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            </td>
            <td className="py-3 px-6 hidden md:table-cell">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </td>
            <td className="py-3 px-6">
              <div className="flex justify-end gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
                <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default BeritaTableSkeleton
