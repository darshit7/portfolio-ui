import { allNotes } from 'contentlayer/generated'
import { NOTE_CATEGORIES } from '~/data/note-categories'
import { SITE_METADATA } from '~/data/site-metadata'
import { allCoreContent } from '~/utils/contentlayer'
import { formatDate, sortPosts } from '~/utils/misc'

/**
 * Share cards: the 1200×630 images LinkedIn, X, Slack and search engines show
 * for a link. Every card is drawn by the one route handler at
 * `app/og/[...card]/route.tsx` and prerendered at build.
 *
 * One route rather than an `opengraph-image.tsx` per segment because a file
 * under `app/notes/[...slug]/` would sit after a catch-all, which Next rejects
 * at build time. A registry also gives pages a single helper to call, which
 * matters because Next merges metadata shallowly: a page that sets `openGraph`
 * without `images` silently drops the parent's card.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const

export type OgCard = {
  /** Small label above the title: the section, or the note's category. */
  eyebrow: string
  title: string
  subtitle?: string
}

const STATIC_CARDS = {
  site: {
    eyebrow: 'darshitp.dev',
    title: SITE_METADATA.author,
    subtitle: SITE_METADATA.headline,
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Long-form articles',
    subtitle: 'Python internals, concurrency and AI',
  },
  notes: {
    eyebrow: 'Notes',
    title: 'Working notes',
    subtitle: 'Python, AI agents, code review, orbital mechanics and RF',
  },
} satisfies Record<string, OgCard>

export type StaticOgKey = keyof typeof STATIC_CARDS

function categoryLabel(slug: string) {
  return NOTE_CATEGORIES.find((c) => c.slug === slug)?.label ?? 'Notes'
}

/** Registry key for a note's card. Mirrors the note URL so the two read alike. */
export function noteOgKey(slug: string) {
  return `notes/${slug}`
}

/**
 * Every card, keyed by its path under `/og/`. Built from the same filtered list
 * the note route uses, so a draft never gets a card in production -- just as
 * it never gets a page.
 */
export function ogCards(): Record<string, OgCard> {
  const cards: Record<string, OgCard> = { ...STATIC_CARDS }

  for (const note of allCoreContent(sortPosts(allNotes))) {
    cards[noteOgKey(note.slug)] = {
      eyebrow: `Notes · ${categoryLabel(note.category)}`,
      title: note.title,
      subtitle: formatDate(note.date),
    }
  }

  return cards
}

/**
 * The card's public path. `.png` is appended so the URL reads as an image to
 * the rare scraper that sniffs extensions rather than Content-Type; the route
 * strips it again in `ogKeyFromSegments`.
 */
export function ogImagePath(key: string) {
  return `${process.env.BASE_PATH || ''}/og/${key}.png`
}

/** `openGraph.images` entry for a card. Relative: Next resolves it against `metadataBase`. */
export function ogImage(key: StaticOgKey | (string & {})) {
  const cards = ogCards()
  // An unknown key (a draft in production, a typo) falls back to the site card
  // rather than advertising an image URL that would 404.
  const resolved = key in cards ? key : 'site'
  const card = cards[resolved]
  return {
    url: ogImagePath(resolved),
    ...OG_SIZE,
    alt: card.subtitle ? `${card.title} — ${card.subtitle}` : card.title,
  }
}

/** Route params for a key: `notes/foo` → `['notes', 'foo.png']`. */
export function ogSegments(key: string): string[] {
  const parts = key.split('/')
  parts[parts.length - 1] = `${parts[parts.length - 1]}.png`
  return parts
}

/** Inverse of `ogSegments`. Returns `undefined` for anything not ending in `.png`. */
export function ogKeyFromSegments(segments: string[]): string | undefined {
  const joined = segments.join('/')
  return joined.endsWith('.png') ? joined.slice(0, -'.png'.length) : undefined
}
