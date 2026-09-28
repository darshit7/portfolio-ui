import { clsx } from 'clsx'
import { type Note } from 'contentlayer/generated'
import { NoteIcon } from '~/components/cards/note-icon'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import type { CoreContent } from '~/types/data'
import { formatDate } from '~/utils/misc'

/**
 * One note as a single scannable line.
 *
 * The card grid this replaced cost ~200px per note and two notes per row, so a
 * hundred notes was ten thousand pixels of scroll. A row is ~44px and the whole
 * notebook fits in a handful of screens -- which is what makes the index
 * readable without a filter box.
 *
 * The summary rides on the same line as the heading and truncates with it, so
 * the row height never depends on how much was written in frontmatter. It drops
 * out below `md`, where there is no room for it and the meta wraps underneath.
 *
 * Shares BlogListItem's row rhythm -- `py-2.5`, and `group` driving the
 * underline from anywhere in the row -- so the two list surfaces read as one
 * system. It puts the date on the right rather than in a left column because
 * these rows are grouped by category, not by date: the icon is what you scan
 * down, and a 7rem date gutter on every row would push the headings in for a
 * field that is only ever secondary here.
 */
export function NoteRow({ note }: { note: CoreContent<Note> }) {
  const { icon, heading, summary, title, path, category, date } = note

  return (
    <li>
      <Link
        href={`/${path}`}
        title={title}
        className={clsx([
          'group flex flex-wrap items-center gap-x-3 gap-y-0.5 rounded-md px-2 py-2.5',
          'transition-colors duration-150',
          'hover:bg-gray-50 dark:hover:bg-white/5',
        ])}
      >
        <NoteIcon
          icon={icon}
          category={category}
          className="h-4.5 w-4.5 shrink-0 text-gray-500 dark:text-gray-400"
        />
        <span className="min-w-0 flex-1 truncate">
          <GrowingUnderline className="font-medium group-hover:bg-[length:100%_50%]">
            {heading}
          </GrowingUnderline>
          {summary && (
            <span className="hidden text-gray-500 dark:text-gray-400 md:inline">
              {' — '}
              {summary}
            </span>
          )}
        </span>
        {/* The date alone: reading time was dropped from every note surface.
            w-full wraps this onto its own line below `sm`, indented past the
            icon (1.125rem) and its gap (0.75rem) to sit under the heading. */}
        <span
          className={clsx([
            'w-full shrink-0 pl-[1.875rem] text-xs sm:w-auto sm:pl-0 sm:text-sm',
            'tabular-nums text-gray-500 dark:text-gray-400',
          ])}
        >
          <time dateTime={date}>{formatDate(date)}</time>
        </span>
      </Link>
    </li>
  )
}
