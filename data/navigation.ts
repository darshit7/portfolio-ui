import { SITE_METADATA } from './site-metadata'

/**
 * Where the satellite simulator will live once it ships. The nav points at the
 * local `/satlab` teaser until then -- swapping `href` below is the whole
 * migration.
 */
export const SATLAB_URL = 'https://satlab.darshitp.dev'

/**
 * `icon` names a lucide glyph resolved by `components/header/nav-icons.ts`; it
 * is a string rather than a component so this file stays free of React imports.
 * Desktop renders it, mobile renders `emoji` -- that split is the existing
 * convention, not an oversight.
 *
 * The explicit annotation matters: without it TypeScript infers a union of two
 * differently-shaped object literals and `link.icon` stops type-checking.
 */
export type NavLink = {
  href: string
  title: string
  emoji: string
  icon?: NavIconName
  /** Marks the one destination worth advertising. Exactly one at a time. */
  accent?: boolean
}

export type NavIconName = 'satellite'

export const HEADER_NAV_LINKS: NavLink[] = [
  { href: '/blog', title: 'Blog', emoji: 'writing-hand' },
  { href: '/notes', title: 'Notes', emoji: 'spiral-notepad' },
  // twemoji.css carries `ringed-planet` but not `satellite`, so mobile uses the
  // planet and desktop gets the lucide satellite.
  { href: '/satlab', title: 'SatLab', emoji: 'ringed-planet', icon: 'satellite', accent: true },
]

export const FOOTER_PERSONAL_STUFF = [
  { href: SITE_METADATA.analytics.umamiAnalytics.shareUrl, title: 'Analytics' },
]

export const FOOTER_SOCIALS = [
  { href: SITE_METADATA.github, title: 'GitHub' },
  { href: SITE_METADATA.linkedin, title: 'LinkedIn' },
  { href: SITE_METADATA.x, title: 'X' },
  { href: `mailto:${SITE_METADATA.email}`, title: 'Email' },
]
