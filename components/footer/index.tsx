import { clsx } from 'clsx'
import { ExternalLink, Github, Linkedin, Mail } from 'lucide-react'
import { Container } from '~/components/ui/container'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { FOOTER_PERSONAL_STUFF, FOOTER_SOCIALS } from '~/data/navigation'
import { SITE_METADATA } from '~/data/site-metadata'
import XIcon from '~/icons/x.svg'

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: (props) => <Github strokeWidth={1.5} {...props} />,
  LinkedIn: (props) => <Linkedin strokeWidth={1.5} {...props} />,
  X: (props) => <XIcon viewBox="0 0 1200 1227" fill="currentColor" {...props} />,
  Email: (props) => <Mail strokeWidth={1.5} {...props} />,
}

export function Footer() {
  return (
    <Container as="footer" className="mb-0">
      <div
        className={clsx([
          'flex flex-col gap-3 py-5 text-sm',
          'border-t border-gray-200 dark:border-gray-700',
        ])}
      >
        {/* Line 1 — identity, socials */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {SITE_METADATA.firstName} {SITE_METADATA.lastName}
            </span>
            <span className="mx-2 text-gray-400" aria-hidden="true">
              ·
            </span>
            {SITE_METADATA.headline}
          </p>
          <ul className="flex items-center gap-4">
            {FOOTER_SOCIALS.map(({ href, title }) => {
              const Icon = SOCIAL_ICONS[title]
              return (
                <li key={title}>
                  <Link
                    href={href}
                    aria-label={title}
                    data-umami-event={`footer-social-${title.toLowerCase()}`}
                    className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Line 2 — copyright, personal links */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400">
          <span>
            {`© ${new Date().getFullYear()}`}
            <span className="mx-2 text-gray-400" aria-hidden="true">
              ·
            </span>
            {SITE_METADATA.firstName}&apos;s Blog
          </span>
          <ul className="flex items-center gap-4">
            {FOOTER_PERSONAL_STUFF.map((link) => (
              <li key={link.title}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}

function FooterLink({ link }: { link: { href: string; title: string } }) {
  const { href, title } = link
  const isExternal = href.startsWith('http')
  return (
    <Link href={href} data-umami-event={`footer-nav-${title.toLowerCase()}`}>
      <GrowingUnderline className="inline-flex items-center">
        {title}
        {isExternal && <ExternalLink className="-mt-1 ml-1" size={14} strokeWidth={1.5} />}
      </GrowingUnderline>
    </Link>
  )
}
