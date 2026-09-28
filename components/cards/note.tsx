import { clsx } from 'clsx'
import { type Note } from 'contentlayer/generated'
import { GradientBorder } from '~/components/ui/gradient-border'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { Pill } from '~/components/ui/pill'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'
import { getNoteCategory } from '~/data/note-categories'
import type { CoreContent } from '~/types/data'
import { formatDate } from '~/utils/misc'
import { NoteIcon } from './note-icon'

export function NoteCard({ note }: { note: CoreContent<Note> }) {
  const { icon, heading, summary, title, path, category, date } = note
  const categoryMeta = getNoteCategory(category)

  return (
    <GradientBorder className="rounded-2xl">
      <Link
        href={`/${path}`}
        title={title}
        className={clsx([
          'relative flex h-full flex-col rounded-2xl',
          'bg-gray-50 dark:bg-white/5',
          'transition-shadow hover:shadow-md',
          'hover:shadow-zinc-900/5 dark:hover:shadow-black/15',
        ])}
      >
        <TiltedGridBackground className="inset-0" />
        <NoteIcon
          icon={icon}
          category={category}
          className="absolute -top-5 left-4 z-10 h-12 w-12 text-gray-900 dark:text-white"
        />
        <div className="relative flex w-full flex-1 flex-col px-4 pb-4 pt-6">
          <div className="mt-4 pb-4">
            {categoryMeta && (
              <Pill size="sm" className="mb-2">
                {categoryMeta.label}
              </Pill>
            )}
            <h3 className="text-xl font-semibold leading-7">
              <GrowingUnderline>{heading}</GrowingUnderline>
            </h3>
            {summary && (
              <p className="mt-1.5 line-clamp-2 text-gray-600 dark:text-gray-400">{summary}</p>
            )}
          </div>
          {/* Pushed to the foot so cards in a row align on their meta line even
              when the headings wrap to different heights. */}
          <div
            className={clsx([
              'mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-3',
              'border-t border-gray-200 dark:border-gray-700',
              'text-sm text-gray-600 dark:text-gray-400',
            ])}
          >
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
        </div>
      </Link>
    </GradientBorder>
  )
}
