const FormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[0, 1].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-[110px] bg-gray-200 rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-36 bg-gray-200 rounded" />
        <div className="h-[110px] bg-gray-200 rounded-xl" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="h-[350px] bg-gray-200 rounded-xl" />
    </div>
    <div className="pt-4 border-t-2 border-gray-100 flex justify-end">
      <div className="h-12 w-48 bg-gray-200 rounded-xl" />
    </div>
  </div>
)

export default FormSkeleton
