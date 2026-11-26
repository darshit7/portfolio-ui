import { allNotes } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'
import { BLOG_METADATA } from '~/data/blog-metadata'
import { SITE_METADATA } from '~/data/site-metadata'
import { collectTags, filterByTag } from '~/utils/tags'

/** The newest of several dates, as an ISO string. */
function latest(dates: (string | Date | undefined)[]): string | undefined {
  const times = dates.filter(Boolean).map((d) => new Date(d as string | Date).getTime())
  return times.length ? new Date(Math.max(...times)).toISOString() : undefined
}

/**
 * Every `lastModified` is the date of the newest content the page shows. It
 * used to be the build date for every static and tag route, so each deploy
 * told crawlers that 25-odd pages had changed when none had -- which teaches
 * them to ignore the field entirely.
 *
 * `/satlab` is deliberately absent while it is an empty, noindexed stub (see
 * app/satlab/page.tsx). Add it back to `STATIC_ROUTES` when its body returns.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_METADATA.siteUrl

  const published = allNotes.filter((s) => !s.draft)
  const noteDate = (n: (typeof published)[number]) => n.lastmod || n.date

  // `path` is the contentlayer flattenedPath, which already starts with "notes/".
  const noteRoutes = published.map((note) => ({
    url: `${siteUrl}/${note.path}`,
    lastModified: noteDate(note),
  }))

  const notesUpdated = latest(published.map(noteDate))
  const blogUpdated = latest(BLOG_METADATA.map((b) => b.date))

  const staticRoutes = [
    { url: `${siteUrl}/`, lastModified: latest([notesUpdated, blogUpdated]) },
    { url: `${siteUrl}/blog`, lastModified: blogUpdated },
    { url: `${siteUrl}/notes`, lastModified: notesUpdated },
  ]

  // Drafts are excluded above, so a tag carried only by a draft never gets a
  // sitemap entry -- which matches the page, since generateStaticParams builds
  // its registry from the same filtered list.
  const tagRoutes = collectTags(published, BLOG_METADATA).map(({ slug }) => ({
    url: `${siteUrl}/tags/${slug}`,
    lastModified: latest([
      ...filterByTag(published, slug).map(noteDate),
      ...filterByTag(BLOG_METADATA, slug).map((b) => b.date),
    ]),
  }))

  return [...staticRoutes, ...noteRoutes, ...tagRoutes]
}
