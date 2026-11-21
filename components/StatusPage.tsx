const StatusPage = ({
  code,
  title,
  description,
  children,
}: {
  code: string
  title: string
  description: string
  children: React.ReactNode
}) => (
  <div className="flex flex-1 min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="text-7xl font-extrabold text-primary">{code}</p>
    <h1 className="type-page-title">{title}</h1>
    <p className="type-muted max-w-md">{description}</p>
    <div className="mt-2 flex flex-wrap justify-center gap-3">{children}</div>
  </div>
)

export const statusButtonClass =
  'bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-all text-sm tracking-wide uppercase shadow-sm'

export default StatusPage
