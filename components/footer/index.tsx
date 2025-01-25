import { clsx } from 'clsx'
import { ExternalLink } from 'lucide-react'
import { Container } from '~/components/ui/container'
import { SITE_METADATA } from '~/data/site-metadata'
import { Link } from '~/components/ui/link'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { FOOTER_NAV_LINKS, FOOTER_PERSONAL_STUFF } from '~/data/navigation'

export function Footer() {
  return (
    <Container as="footer" className="mb-0">
      <div
        className={clsx([
          'grid grid-cols-1 gap-x-8 gap-y-4 py-4 md:grid-cols-2 xl:grid-cols-3',
          'border-t border-gray-200 dark:border-gray-700',
        ])}
      >
        <div className="col-span-1 space-y-4 xl:col-span-2">
          <div className="space-y-1 md:space-y-4">
            <div className="flex h-11 font-semibold">
              <span>
                {`Copyright © ${new Date().getFullYear()}`}
                {` • `}
                {SITE_METADATA.firstName}&apos;s Blog
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-1 md:flex-row md:justify-end md:gap-24 md:px-0 md:text-right">
          <div className="space-y-1 md:space-y-4">
            <div className="flex h-11 font-semibold">
              <FooterLink link={FOOTER_PERSONAL_STUFF[0]} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

function FooterLink({ link }: { link: (typeof FOOTER_NAV_LINKS)[0] }) {
  const { href, title } = link
  const isExternal = href.startsWith('http')
  return (
    <Link href={href}>
      <GrowingUnderline
        data-umami-event={`footer-nav-${href.replace('/', '')}`}
        className="inline-flex"
      >
        {title}
        {isExternal && <ExternalLink className="-mt-1 ml-1.5" size={18} strokeWidth={1.5} />}
      </GrowingUnderline>
    </Link>
  )
}
