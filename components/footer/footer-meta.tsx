'use client'

import { Clock, Github } from 'lucide-react'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { SITE_METADATA } from '~/data/site-metadata'

const TIME_IS = 'https://time.is/Hanoi'
const MY_TIMEZONE = 'Asia/Ho_Chi_Minh'
const MY_TIMEZONE_OFFSET = 7 * -60 // UTC+7

function getTime() {
  const date = new Date()
  const visitorTimezoneOffset = date.getTimezoneOffset()
  const hoursDiff = (visitorTimezoneOffset - MY_TIMEZONE_OFFSET) / 60
  const diff =
    hoursDiff === 0
      ? 'same time'
      : hoursDiff > 0
        ? `${hoursDiff}h ahead`
        : `${hoursDiff * -1}h behind`

  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: MY_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)

  return { time, diff }
}

export function FooterMeta() {
  const { time, diff } = getTime()
  const siteRepo = SITE_METADATA.siteRepo.replace('https://github.com/', '')
  const repoName = siteRepo.split('/')[1]

  return (
    <div className="space-y-2 py-1.5 text-gray-800 dark:text-gray-200">
      <div className="flex items-center gap-1 font-medium">
        <Github className="h-5 w-5" />
        <Link href={SITE_METADATA.siteRepo} className="ml-1">
          <GrowingUnderline data-umami-event="view-repo">{repoName}</GrowingUnderline>
        </Link>
        <span>-</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5" />
        <Link href={TIME_IS}>
          <GrowingUnderline className="font-medium" data-umami-event="footer-time">
            {time} <span className="text-gray-500 dark:text-gray-400">- {diff}</span>
          </GrowingUnderline>
        </Link>
      </div>
    </div>
  )
}
