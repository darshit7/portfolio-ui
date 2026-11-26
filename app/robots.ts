import type { MetadataRoute } from 'next'
import { SITE_METADATA } from '~/data/site-metadata'

/**
 * No `host`: it is a Yandex-only directive that Google and Bing ignore, and it
 * was emitted with a scheme, which Yandex rejects anyway. The www origin is
 * enforced by the apex redirect in next.config.js and each page's canonical.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_METADATA.siteUrl}/sitemap.xml`,
  }
}
