import { SITE_METADATA } from './site-metadata'

export const HEADER_NAV_LINKS = [
  { href: '/blog', title: 'Blog', emoji: 'writing-hand' },
  { href: '/notes', title: 'Notes', emoji: 'spiral-notepad' },
]

// Resume first: it is the thing a recruiter is looking for, and the footer is
// the only place it appears.
export const FOOTER_PERSONAL_STUFF = [
  { href: '/static/resume.pdf', title: 'Resume' },
  { href: SITE_METADATA.analytics.umamiAnalytics.shareUrl, title: 'Analytics' },
]

export const FOOTER_SOCIALS = [
  { href: SITE_METADATA.github, title: 'GitHub' },
  { href: SITE_METADATA.linkedin, title: 'LinkedIn' },
  { href: SITE_METADATA.x, title: 'X' },
  { href: `mailto:${SITE_METADATA.email}`, title: 'Email' },
]
