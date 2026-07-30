import { SITE_METADATA } from './site-metadata'

export const HEADER_NAV_LINKS = [
  { href: '/blog', title: 'Blog', emoji: 'writing-hand' },
  { href: '/notes', title: 'Notes', emoji: 'spiral-notepad' },
]

export const FOOTER_NAV_LINKS = [
  { href: '/blog', title: 'Blog' },
  { href: '/notes', title: 'Notes' },
]

// Resume first: it is the thing a recruiter is looking for.
export const FOOTER_PERSONAL_STUFF = [
  { href: '/static/resume.pdf', title: 'Resume' },
  { href: '/feed.xml', title: 'RSS' },
  { href: SITE_METADATA.analytics.umamiAnalytics.shareUrl, title: 'Analytics' },
]

export const FOOTER_SOCIALS = [
  { href: SITE_METADATA.github, title: 'GitHub' },
  { href: SITE_METADATA.linkedin, title: 'LinkedIn' },
  { href: SITE_METADATA.x, title: 'X' },
  { href: `mailto:${SITE_METADATA.email}`, title: 'Email' },
]
