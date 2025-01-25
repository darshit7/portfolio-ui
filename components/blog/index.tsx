import { Link } from '~/components/ui/link'
import { ExternalLink } from 'lucide-react'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import type { BlogItem } from '~/types/data'

export function BlogListItem({ blog }: {blog: BlogItem}) {
  const { title, date, link } = blog
  return (
    <div className="py-2">
      <span className="pr-6">{date.toLocaleDateString('en-CA')}</span>
      <Link href={link} className='font-semibold'>
        <GrowingUnderline data-umami-event={``} className="inline-flex">
          {title}
          <ExternalLink className="-mt-1 ml-1.5" size={18} strokeWidth={1.5} />
        </GrowingUnderline>
      </Link>
    </div>
  )
}
