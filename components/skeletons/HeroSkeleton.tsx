const HeroSkeleton = () => (
  <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 font-sans">
    <div className="h-8 w-48 bg-gray-200 rounded-full mx-auto mb-10 animate-pulse" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col space-y-4">
          <div className="w-full aspect-[16/10] rounded-[24px] bg-gray-200 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/5" />
          </div>
        </div>
      ))}
    </div>
  </section>
)

export default HeroSkeleton
