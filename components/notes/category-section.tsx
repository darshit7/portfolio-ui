import { type Note } from 'contentlayer/generated'
import { NoteCard } from '~/components/cards/note'
import { CATEGORY_ICONS } from '~/components/cards/note-icon'
import type { NoteCategory } from '~/data/note-categories'
import type { CoreContent } from '~/types/data'

/**
 * One category's worth of notes, headed by its own glyph and blurb.
 *
 * Sectioning rather than one flat grid is what lets a small library read as
 * deliberate: four notes in four labelled sections look like a table of
 * contents, while four notes in a grid look like a page that ran out.
 */
export function CategorySection({
  slug,
  label,
  blurb,
  notes,
}: {
  slug: NoteCategory
  label: string
  blurb: string
  notes: CoreContent<Note>[]
}) {
  const Icon = CATEGORY_ICONS[slug]

  return (
    <section aria-labelledby={`category-${slug}`}>
      {/* scroll-mt clears the sticky header when the count pills jump here. */}
      <div id={slug} className="scroll-mt-24">
        <div className="flex items-center gap-2.5">
          <Icon
            className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 id={`category-${slug}`} className="text-2xl font-bold tracking-tight">
            {label}
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'}
          </span>
        </div>
        <p className="mt-1.5 text-gray-600 dark:text-gray-400">{blurb}</p>
      </div>
      {/* gap-y-12 rather than the grid default: each card's icon overhangs its
          top edge by 20px and would otherwise collide with the row above. */}
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
        {notes.map((note) => (
          <NoteCard note={note} key={note.path} />
        ))}
      </div>
    </section>
  )
}
