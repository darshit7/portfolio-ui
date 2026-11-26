import type { Graph } from 'schema-dts'
import { serializeJsonLd } from '~/utils/json-ld'

/**
 * Renders structured data. A JSON-LD block is data, not an executable script,
 * so it needs no CSP allowance of its own.
 */
export function JsonLd({ data }: { data: Graph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
