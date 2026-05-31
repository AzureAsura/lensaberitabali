const BeritaDetailSkeleton = () => (
  <main className="w-full min-h-screen bg-white font-sans">
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      <div className="h-6 w-24 bg-gray-200 rounded-full mb-4 animate-pulse" />

      <div className="space-y-3 mb-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 bg-gray-200 rounded animate-pulse w-4/5" />
      </div>

      <div className="space-y-2 border-b border-gray-100 pb-6 mb-6">
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="w-full aspect-[16/9] md:aspect-[21/10] rounded-[24px] bg-gray-200 mb-8 animate-pulse" />

      <div className="space-y-4">
        {[1, 0.9, 1, 0.85, 1, 0.7].map((w, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded animate-pulse"
            style={{ width: `${w * 100}%` }}
          />
        ))}
      </div>
    </div>
  </main>
)

export default BeritaDetailSkeleton
