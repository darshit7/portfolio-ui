import { ExternalLink } from 'lucide-react'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import type { BlogItem } from '~/types/data'
import { formatDate } from '~/utils/misc'

/**
 * Derives the publication from the article URL. Being published in a named
 * Medium publication is a credibility signal worth surfacing, and the data is
 * already in the link -- nothing new to maintain.
 */
export function getPublication(link: string): string | null {
  if (link.includes('stackademic.com') || link.includes('/stackademic/')) return 'Stackademic'
  if (link.includes('/python-in-plain-english/')) return 'Python in Plain English'
  if (link.includes('medium.com')) return 'Medium'
  return null
}

/**
 * One article, on one line.
 *
 * Three stacked lines (meta, title, tags) read as a card without being one, and
 * eight of them in a column had no rhythm. Everything now sits on a single
 * baseline: date left, title centre, publication right. Only the longest titles
 * wrap, and then to two lines.
 *
 * The tag pills moved out rather than being squeezed in -- the topic pills in
 * the page header link to the same /tags pages, so nothing became unreachable.
 */
export function BlogListItem({ blog }: { blog: BlogItem }) {
  const { title, date, link } = blog
  const publication = getPublication(link)

  return (
    // The whole row is the link, so the click target is the full width rather
    // than just the title. `group` drives the underline from anywhere in it.
    // Stacks below `sm`: a fixed date column on a 368px screen leaves the title
    // about 240px and wraps it four times. Above `sm` it is one row.
    <Link
      href={link}
      className="group flex flex-col gap-y-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-x-4"
    >
      {/* formatDate is pinned to UTC, which is load-bearing: dates are authored
          as `new Date("YYYY-MM-DD")`, i.e. UTC midnight, and render a day early
          west of it otherwise. Same shape as the note cards. */}
      <time
        dateTime={date.toISOString()}
        className="text-sm tabular-nums text-gray-500 dark:text-gray-400 sm:w-28 sm:shrink-0"
      >
        {formatDate(date.toISOString())}
      </time>
      <span className="min-w-0 flex-1 font-medium">
        <GrowingUnderline className="group-hover:bg-[length:100%_50%]">{title}</GrowingUnderline>
        <ExternalLink
          className="ml-1.5 inline shrink-0 align-[-0.15em] text-gray-400 dark:text-gray-500"
          size={15}
          strokeWidth={1.5}
        />
      </span>
      {publication && (
        <span className="hidden shrink-0 text-sm text-gray-500 dark:text-gray-400 sm:block">
          {publication}
        </span>
      )}
    </Link>
  )
}

/**
 * The whole archive as one reverse-chronological list.
 *
 * Grouping by year was tried and reverted: the publishing record has years with
 * a single article in them, and a rail plus a count over one row reads as an
 * empty section rather than as structure. Each row already carries its full
 * date, so nothing was lost.
 */
export function BlogList({ blogs }: { blogs: BlogItem[] }) {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {blogs.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
