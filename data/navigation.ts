import { SITE_METADATA } from './site-metadata'

export const HEADER_NAV_LINKS = [
  { href: '/blog', title: 'Blog', emoji: 'writing-hand' },
  { href: '/notes', title: 'Notes', emoji: 'spiral-notepad' },
]

export const MORE_NAV_LINKS = [
  { href: '/books', title: 'Books', emoji: 'books' },
  { href: '/movies', title: 'Movies', emoji: 'film-frames' },
  { href: '/tags', title: 'Tags', emoji: 'label' },
]

export const FOOTER_NAV_LINKS = [
  { href: '/blog', title: 'Blog' },
  { href: '/notes', title: 'Notes' },
]

export const FOOTER_PERSONAL_STUFF = [
  { href: SITE_METADATA.analytics.umamiAnalytics.shareUrl, title: 'Analytics' },
  { href: '/static/resume.pdf', title: 'Resume' },
]
