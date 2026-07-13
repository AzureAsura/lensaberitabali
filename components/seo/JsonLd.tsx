/**
 * Renders a JSON-LD structured data block.
 *
 * `dangerouslySetInnerHTML` is safe here because `data` is always
 * JSON.stringify'd (no raw user HTML is ever interpolated), and this
 * is the standard Next.js-documented pattern for emitting JSON-LD.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
