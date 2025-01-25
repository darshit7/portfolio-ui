import { allNotes } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'
import { SITE_METADATA } from '~/data/site-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_METADATA.siteUrl

  const noteRoutes = allNotes
    .filter((s) => !s.draft)
    .map(({ path, lastmod, date }) => ({
      url: `${siteUrl}/notes/${path}`,
      lastModified: lastmod || date,
    }))

  const routes = ['', 'blog', 'notes'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...noteRoutes]
}
