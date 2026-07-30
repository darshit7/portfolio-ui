import { clsx } from 'clsx'
import { ExternalLink, Github, Linkedin, Mail } from 'lucide-react'
import { Fragment } from 'react'
import { Container } from '~/components/ui/container'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { FOOTER_NAV_LINKS, FOOTER_PERSONAL_STUFF, FOOTER_SOCIALS } from '~/data/navigation'
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
          'grid grid-cols-1 gap-x-8 gap-y-8 py-8 md:grid-cols-2 xl:grid-cols-3',
          'border-t border-gray-200 dark:border-gray-700',
        ])}
      >
        <div className="space-y-3">
          <div className="font-semibold">
            {SITE_METADATA.firstName} {SITE_METADATA.lastName}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{SITE_METADATA.headline}</p>
          <ul className="flex items-center gap-4 pt-1">
            {FOOTER_SOCIALS.map(({ href, title }) => {
              const Icon = SOCIAL_ICONS[title]
              return (
                <li key={title}>
                  <Link
                    href={href}
                    aria-label={title}
                    data-umami-event={`footer-social-${title.toLowerCase()}`}
                    className="text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <FooterColumn heading="Sitemap" links={FOOTER_NAV_LINKS} />
        <FooterColumn heading="Personal stuff" links={FOOTER_PERSONAL_STUFF} />
      </div>

      <div
        className={clsx([
          'py-4 text-sm text-gray-500 dark:text-gray-400',
          'border-t border-gray-200 dark:border-gray-700',
        ])}
      >
        {`Copyright © ${new Date().getFullYear()}`}
        {` • `}
        {SITE_METADATA.firstName}&apos;s Blog
      </div>
    </Container>
  )
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string
  links: readonly { href: string; title: string }[]
}) {
  return (
    <div className="space-y-3">
      <div className="font-semibold">{heading}</div>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:gap-3">
        {links.map((link, idx) => (
          <Fragment key={link.title}>
            <li>
              <FooterLink link={link} />
            </li>
            {idx !== links.length - 1 && <span className="text-gray-400 md:hidden">/</span>}
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

function FooterLink({ link }: { link: { href: string; title: string } }) {
  const { href, title } = link
  const isExternal = href.startsWith('http')
  return (
    <Link href={href} data-umami-event={`footer-nav-${title.toLowerCase()}`}>
      <GrowingUnderline className="inline-flex items-center">
        {title}
        {isExternal && <ExternalLink className="-mt-1 ml-1.5" size={18} strokeWidth={1.5} />}
      </GrowingUnderline>
    </Link>
  )
}
