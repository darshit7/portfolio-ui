import { SITE_METADATA } from '~/data/site-metadata'
import { BriefcaseBusiness, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Fragment } from 'react'
import XIcon from '~/icons/x.svg'
import { Twemoji } from '~/components/ui/twemoji'

function getAccountHandle(url = '') {
  const lastPart = url.split('/').pop()
  if (lastPart) {
    return lastPart
  }
  return url
}

const MY_TIMEZONE = 'Asia/Kolkata'
const MY_TIMEZONE_OFFSET = 5.5 * -60 // UTC+5:30
const SOCIALS = [
  {
    platform: 'github',
    handle: getAccountHandle(SITE_METADATA.github),
    href: SITE_METADATA.github,
    Icon: () => <Github size={20} strokeWidth={1.5} />,
    umamiEvent: 'profile-card-github',
  },
  {
    platform: 'linkedin',
    handle: getAccountHandle(SITE_METADATA.linkedin),
    href: SITE_METADATA.linkedin,
    Icon: () => <Linkedin size={20} strokeWidth={1.5} />,
    umamiEvent: 'profile-card-linkedin',
  },
  {
    platform: 'x',
    handle: getAccountHandle(SITE_METADATA.x),
    href: SITE_METADATA.x,
    Icon: () => <XIcon className="h-4 w-4" fill="#fff" viewBox="0 0 1200 1227" />,
    umamiEvent: 'profile-card-x',
  },
]

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

export function ProfileCardInfo() {
  const { time, diff } = getTime()
  return (
    <div className="hidden py-4 md:block md:px-5">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {SITE_METADATA.firstName} {SITE_METADATA.lastName}
      </h3>
      {/* <h5 className="py-2 text-gray-500 dark:text-gray-400">{SITE_METADATA.headline}</h5> */}
      <div className="mb-2 mt-4 space-y-4">
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <BriefcaseBusiness strokeWidth={1.5} size={20} />
          <p className="flex items-center px-2">
            {SITE_METADATA.jobTitle} @{' '}
            <a
              target="_blank"
              href="https://morganstanley.com"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {SITE_METADATA.organization}
            </a>
          </p>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <MapPin strokeWidth={1.5} size={20} />
          <p className="px-2">
            <a
              target="_blank"
              href="https://en.wikipedia.org/wiki/Bengaluru"
              rel="noreferrer"
              className="underline-offset-4 hover:underline"
            >
              {SITE_METADATA.city}
            </a>
            <span className="absolute ml-1 inline-flex pt-px">
              <a
                target="_blank"
                href="https://en.wikipedia.org/wiki/India"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                <Twemoji emoji="flag-india" />
              </a>
              <span>
                | {time} <span className="text-gray-500 dark:text-gray-400">- {diff}</span>
              </span>
            </span>
          </p>
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-200">
          <Mail strokeWidth={1.5} size={20} />
          <a className="px-2" href={`mailto:${SITE_METADATA.email}`}>
            {SITE_METADATA.email}
          </a>
        </div>
        <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-200">
          {SOCIALS.map(({ platform, handle, href, Icon, umamiEvent }, idx) => (
            <Fragment key={platform}>
              <a
                target="_blank"
                href={href}
                rel="noreferrer"
                className="flex items-center underline-offset-4 hover:underline"
                data-umami-event={umamiEvent}
              >
                <Icon />
                <span className="ml-px text-gray-500">/</span>
                <span className="ml-0.5">{handle}</span>
              </a>
              {idx !== SOCIALS.length - 1 && (
                <span className="text-gray-400 dark:text-gray-500">|</span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
