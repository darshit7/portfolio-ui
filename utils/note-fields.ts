import type { ReadTimeResults } from 'reading-time'
import type { Toc } from '~/utils/remark-toc-headings'

/**
 * Accessors for the two contentlayer `json` computed fields.
 *
 * Contentlayer emits `readingTime: json` and `toc: json` into the generated
 * types, where `json` is not a real declared type -- it survives only because
 * `skipLibCheck` is on, and it reaches call sites as an implicit `any`. Both
 * fields were computed on every note and rendered nowhere until now, so nothing
 * had forced the question.
 *
 * Narrowing through `unknown` here keeps the `any` out of components without an
 * explicit cast, which `@typescript-eslint/no-explicit-any` would reject.
 */
export function readingTimeText(value: unknown): string | null {
  if (!value || typeof value !== 'object') return null
  const { text } = value as Partial<ReadTimeResults>
  return typeof text === 'string' && text.length > 0 ? text : null
}

/**
 * The note's headings, filtered to the levels worth listing.
 *
 * `h1` is the note title, which the layout already renders, and anything below
 * `h3` turns a contents list into an outline of an outline.
 */
export function tocItems(value: unknown, { minDepth = 2, maxDepth = 3 } = {}): Toc {
  if (!Array.isArray(value)) return []
  return (value as Toc).filter(
    (item) =>
      item &&
      typeof item.value === 'string' &&
      typeof item.url === 'string' &&
      item.depth >= minDepth &&
      item.depth <= maxDepth
  )
}
