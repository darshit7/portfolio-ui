import { ExternalLink } from 'lucide-react'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import type { BlogItem } from '~/types/data'

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

export function BlogListItem({ blog }: { blog: BlogItem }) {
  const { title, date, link } = blog
  const publication = getPublication(link)

  return (
    <div className="py-3">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
        {/* Dates are authored as `new Date("YYYY-MM-DD")`, i.e. UTC midnight, so
            they must be formatted in UTC or they render a day early west of it. */}
        <span>{date.toLocaleDateString('en-CA', { timeZone: 'UTC' })}</span>
        {publication && (
          <>
            <span aria-hidden="true">·</span>
            <span>{publication}</span>
          </>
        )}
      </div>
      <Link href={link} className="font-semibold">
        <GrowingUnderline className="inline-flex">
          {title}
          <ExternalLink className="-mt-1 ml-1.5 shrink-0" size={18} strokeWidth={1.5} />
        </GrowingUnderline>
      </Link>
    </div>
  )
}
