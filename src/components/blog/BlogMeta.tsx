import type { BlogMetaProps } from '@/types/components'
import { formatDate } from '@/utils/date'
import { Twemoji } from '@/components/Twemoji'

export function BlogMeta({ date, slug, readingTime }: BlogMetaProps) {
  return (
    <dd className="flex flex-wrap text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 md:text-base">
      <time dateTime={date} className="flex items-center justify-center">
        <Twemoji emoji="calendar" size="" />
        <span className="ml-1.5 md:ml-2">{formatDate(date)}</span>
      </time>
      <span className="mx-2">{` • `}</span>
      <div className="flex items-center">
        <Twemoji emoji="hourglass-not-done" size="" />
        <span className="ml-1.5 md:ml-2">
            {readingTime}
        </span>
      </div>
      <span className="mx-2">{` • `}</span>
      <div className="flex items-center">
        <Twemoji emoji="eye" size="" />
      </div>
    </dd>
  )
}