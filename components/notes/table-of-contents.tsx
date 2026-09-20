import { clsx } from 'clsx'
import type { Toc } from '~/utils/remark-toc-headings'

/**
 * A note's headings. Contentlayer has computed `toc` on every note since the
 * beginning and nothing ever rendered it.
 *
 * Two presentations of the same list, because they belong in different places
 * in the layout: `TocAside` is the second grid column at `xl`, `TocDisclosure`
 * sits above the body everywhere narrower. Each hides itself at the breakpoint
 * the other takes over, so neither needs JavaScript.
 *
 * A list of one heading is not a table of contents -- `hasToc` is the shared
 * predicate, and the layout uses it to decide whether to open the column at all.
 */
export function hasToc(items: Toc): boolean {
  return items.length >= 2
}

const LINK = clsx([
  'block py-1 text-sm',
  'text-gray-600 hover:text-primary-700',
  'dark:text-gray-400 dark:hover:text-primary-400',
  'transition-colors duration-150',
])

function Items({ items }: { items: Toc }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.url}>
          {/* Plain <a>: these are same-page fragments, and routing them through
              next/link would push a history entry per heading. */}
          <a href={item.url} className={clsx(LINK, item.depth > 2 && 'pl-4')}>
            {item.value}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function TocDisclosure({ items }: { items: Toc }) {
  if (!hasToc(items)) return null

  return (
    <details
      className={clsx([
        'group mb-8 rounded-lg xl:hidden',
        'border border-gray-200 dark:border-gray-700',
      ])}
    >
      <summary
        className={clsx([
          'flex cursor-pointer select-none list-none items-center justify-between gap-2',
          'px-4 py-2.5 text-sm font-semibold',
        ])}
      >
        On this page
        <span
          aria-hidden="true"
          className={clsx([
            'text-gray-500 dark:text-gray-400',
            'transition-transform duration-150 group-open:rotate-90',
          ])}
        >
          &rsaquo;
        </span>
      </summary>
      <nav aria-label="Table of contents" className="px-4 pb-3">
        <Items items={items} />
      </nav>
    </details>
  )
}

export function TocAside({ items }: { items: Toc }) {
  if (!hasToc(items)) return null

  return (
    <aside className="hidden xl:block">
      <nav
        aria-label="Table of contents"
        className="sticky top-24 border-l border-gray-200 pl-5 dark:border-gray-700"
      >
        <p
          className={clsx([
            'mb-2 text-xs font-semibold uppercase tracking-wide',
            'text-gray-500 dark:text-gray-400',
          ])}
        >
          On this page
        </p>
        <Items items={items} />
      </nav>
    </aside>
  )
}
