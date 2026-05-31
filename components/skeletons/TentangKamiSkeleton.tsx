const TentangKamiSkeleton = () => (
  <main className="w-full min-h-screen bg-white font-sans">
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 space-y-12 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />

      {[0, 1, 2].map((i) => (
        <section key={i} className="space-y-4">
          <div className="h-5 w-56 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
        </section>
      ))}

      <div className="bg-gray-50 rounded-2xl p-6 md:p-8 space-y-4 border border-gray-100">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-4 w-40 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  </main>
)

export default TentangKamiSkeleton
