import { clsx } from 'clsx'
import { type Note } from 'contentlayer/generated'
import { CATEGORY_ICONS } from '~/components/cards/note-icon'
import { NoteRow } from '~/components/notes/note-row'
import type { NoteCategory } from '~/data/note-categories'
import type { CoreContent } from '~/types/data'

/**
 * One category's worth of notes, as a dense list under its own heading.
 *
 * The heading sticks below the site header while its rows scroll past, so a
 * long section never leaves you reading titles with no idea which category you
 * are in. 4.5rem clears the site header, which bottoms out at 68px (`top-2` +
 * a 44px logo + `py-2`) and 72px from `lg` (`top-3`). `z-10` keeps it under
 * the header's `z-50`, so it slides beneath rather than over.
 *
 * The heading and its count are the whole section chrome: a descriptive subline
 * under each one was tried and dropped. It restated the label, and on a sticky
 * bar it was the part that scrolled away first anyway.
 */
export function CategorySection({
  slug,
  label,
  notes,
}: {
  slug: NoteCategory
  label: string
  notes: CoreContent<Note>[]
}) {
  const Icon = CATEGORY_ICONS[slug]

  return (
    <section aria-labelledby={`category-${slug}`}>
      {/* scroll-mt clears the sticky header when the rail or the count pills
          jump here. The bar spans the full column width so rows pass under it
          fully covered -- any inset would show a sliver of text through. */}
      <div
        id={slug}
        className={clsx([
          'sticky top-[4.5rem] z-10 scroll-mt-24 px-2 pb-2 pt-3',
          'bg-white/85 backdrop-blur dark:bg-dark/85',
          'border-b border-gray-200 dark:border-gray-700',
        ])}
      >
        <div className="flex items-center gap-2.5">
          <Icon
            className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 id={`category-${slug}`} className="text-lg font-bold tracking-tight">
            {label}
          </h2>
          <span className="text-sm tabular-nums text-gray-500 dark:text-gray-400">
            {notes.length}
          </span>
        </div>
      </div>
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {notes.map((note) => (
          <NoteRow note={note} key={note.path} />
        ))}
      </ul>
    </section>
  )
}
