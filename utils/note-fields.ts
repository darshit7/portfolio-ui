import type { Toc } from '~/utils/remark-toc-headings'

/**
 * The note's headings, filtered to the levels worth listing.
 *
 * `h1` is the note title, which the layout already renders, and anything below
 * `h3` turns a contents list into an outline of an outline.
 *
 * Contentlayer emits `toc: json` into the generated types, where `json` is not
 * a real declared type -- it survives only because `skipLibCheck` is on, and it
 * reaches call sites as an implicit `any`. Narrowing through `unknown` here
 * keeps that `any` out of components without an explicit cast, which
 * `@typescript-eslint/no-explicit-any` would reject.
 *
 * `readingTime` is computed the same way and had a sibling accessor here. No
 * note surface renders a reading time any more, so the accessor went with it;
 * the contentlayer field is still computed, and the note card and row tests
 * guard against it being piped back into the UI.
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
