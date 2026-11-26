import type { Metadata } from 'next'
import { SITE_METADATA } from '~/data/site-metadata'
import { ogImage, type StaticOgKey } from '~/utils/og'

type PageSEOProps = {
  title: string
  description?: string
  /** Which share card to use. Defaults to the site card. */
  ogCard?: StaticOgKey
} & Omit<Metadata, 'title' | 'description' | 'openGraph' | 'alternates' | 'twitter'>

/**
 * Metadata for a static page.
 *
 * Next merges metadata shallowly, one top-level key at a time, so what this
 * leaves out matters as much as what it sets:
 *
 * - `openGraph` replaces the root layout's object wholesale, so it must carry
 *   its own `images`, or the page shares with no card.
 * - `alternates` and `twitter` are inherited from the root layout untouched.
 *   Setting `alternates` here would drop the canonical (`'./'`, resolved per
 *   page), and twitter already picks up `openGraph.images`. Both are excluded
 *   from the props type so a caller cannot pass them by accident.
 */
export function genPageMetadata({
  title,
  description,
  ogCard = 'site',
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    description: description || SITE_METADATA.description,
    openGraph: {
      title,
      description: description || SITE_METADATA.description,
      url: './',
      siteName: SITE_METADATA.author,
      images: [ogImage(ogCard)],
      locale: 'en_US',
      type: 'website',
    },
    ...rest,
  }
}
