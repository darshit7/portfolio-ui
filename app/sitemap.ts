import { allNotes } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'
import { BLOG_METADATA } from '~/data/blog-metadata'
import { SITE_METADATA } from '~/data/site-metadata'
import { collectTags } from '~/utils/tags'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_METADATA.siteUrl
  const today = new Date().toISOString().split('T')[0]

  const published = allNotes.filter((s) => !s.draft)

  // `path` is the contentlayer flattenedPath, which already starts with "notes/".
  const noteRoutes = published.map(({ path, lastmod, date }) => ({
    url: `${siteUrl}/${path}`,
    lastModified: lastmod || date,
  }))

  // Drafts are excluded above, so a tag carried only by a draft never gets a
  // sitemap entry -- which matches the page, since generateStaticParams builds
  // its registry from the same filtered list.
  const tagRoutes = collectTags(published, BLOG_METADATA).map(({ slug }) => ({
    url: `${siteUrl}/tags/${slug}`,
    lastModified: today,
  }))

  const routes = ['', 'blog', 'notes', 'satlab'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: today,
  }))

  return [...routes, ...noteRoutes, ...tagRoutes]
}
