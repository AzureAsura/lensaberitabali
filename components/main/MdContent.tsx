import ReactMarkdown from 'react-markdown'

const proseClass = `
  [&_p]:type-body [&_p]:mb-3
  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:mb-3
  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_ol]:mb-3
  [&_li]:type-body
  [&_h1]:type-section-title [&_h1]:mb-4
  [&_h2]:type-card-title [&_h2]:mb-3
  [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mb-2
  [&_strong]:font-bold
  [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
  [&_code]:text-primary [&_code]:bg-primary/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
  [&_a]:text-primary [&_a]:underline
`

const MdContent = ({ content }: { content: string }) => {
  return (
    <div className={proseClass}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default MdContent
