import type { Metadata } from 'next'
import { SITE_METADATA } from '~/data/site-metadata'

type PageSEOProps = {
  title: string
  description?: string
  image?: string
} & Omit<Metadata, 'title' | 'description'>

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    description: description || SITE_METADATA.description,
    openGraph: {
      title: `${title} | ${SITE_METADATA.title}`,
      description: description || SITE_METADATA.description,
      url: './',
      siteName: SITE_METADATA.title,
      images: image ? [image] : [SITE_METADATA.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    ...rest,
  }
}
