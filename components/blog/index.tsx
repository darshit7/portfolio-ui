import { Link } from '~/components/ui/link'
import { ExternalLink } from 'lucide-react'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import type { BlogItem } from '~/types/data'

export function BlogListItem({ blog }: {blog: BlogItem}) {
  const { title, date, link } = blog
  return (
    <div className="py-2">
      {/* Dates are authored as `new Date("YYYY-MM-DD")`, i.e. UTC midnight, so
          they must be formatted in UTC or they render a day early west of it. */}
      <span className="pr-6">{date.toLocaleDateString('en-CA', { timeZone: 'UTC' })}</span>
      <Link href={link} className="font-semibold">
        <GrowingUnderline className="inline-flex">
          {title}
          <ExternalLink className="-mt-1 ml-1.5" size={18} strokeWidth={1.5} />
        </GrowingUnderline>
      </Link>
    </div>
  )
}
