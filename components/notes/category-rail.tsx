import { clsx } from 'clsx'
import { CATEGORY_ICONS } from '~/components/cards/note-icon'
import type { NoteCategory } from '~/data/note-categories'

export type RailSection = {
  slug: NoteCategory
  label: string
  count: number
}

const ITEM = clsx([
  'flex items-center gap-2 py-1.5 pl-3 text-sm',
  'border-l-2 border-gray-200 dark:border-gray-700',
  'text-gray-600 dark:text-gray-400',
  'transition-colors duration-150',
  'hover:border-primary-500 hover:text-primary-700',
  'dark:hover:border-primary-400 dark:hover:text-primary-400',
])

/**
 * The persistent table of contents for the notebook, pinned beside the list.
 *
 * These are same-page fragments, so they are plain `<a>` rather than next/link:
 * a hundred notes is a page you scan by jumping between sections, and routing
 * each jump would push a history entry per click.
 *
 * Anchors rather than filters, as before -- a `?category=` query would make
 * /notes the second dynamic route on the site, and the whole point of rendering
 * every note is that the browser's own find already works.
 *
 * Hidden below `lg`, where the page has no room for a second column; the count
 * pills in the page header carry the same links on narrow screens.
 *
 * Unlabelled on purpose: a list of categories with counts beside a list of
 * notes reads as the way to browse them without a heading saying so.
 */
export function CategoryRail({
  sections,
  total,
  topId,
}: {
  sections: RailSection[]
  total: number
  topId: string
}) {
  return (
    <nav aria-label="Note categories" className="hidden lg:block">
      {/* pt-2.5 lines the first rail item up with the first section
          heading, which sits 10px lower under the sticky bar's pt-3. */}
      <ul className="sticky top-24 pt-2.5">
        <li>
          <a href={`#${topId}`} className={ITEM}>
            <span className="flex-1 truncate">All notes</span>
            <span className="tabular-nums text-gray-500 dark:text-gray-500">{total}</span>
          </a>
        </li>
        {sections.map(({ slug, label, count }) => {
          const Icon = CATEGORY_ICONS[slug]
          return (
            <li key={slug}>
              <a href={`#${slug}`} className={ITEM}>
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                <span className="flex-1 truncate">{label}</span>
                <span className="tabular-nums text-gray-500 dark:text-gray-500">{count}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
