import { allNotes } from 'contentlayer/generated'
import { SITE_METADATA } from '~/data/site-metadata'
import { allCoreContent } from '~/utils/contentlayer'
import { sortPosts } from '~/utils/misc'

/**
 * RSS 2.0 feed of published notes. Advertised from the root layout through
 * `alternates.types`, which is how feed readers, aggregators and search
 * engines discover it. Medium articles are not included: they live, and are
 * syndicated, on Medium.
 */

// Prerender alongside the rest of the site instead of rendering per request.
export const dynamic = 'force-static'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const { siteUrl, title, description, language, author, email } = SITE_METADATA
  const notes = allCoreContent(sortPosts(allNotes))

  // `path` is the contentlayer flattenedPath and already starts with "notes/".
  const items = notes
    .map((note) => {
      const url = `${siteUrl}/${note.path}`
      return [
        '    <item>',
        `      <title>${escapeXml(note.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(note.description ?? note.summary ?? '')}</description>`,
        `      <pubDate>${new Date(note.date).toUTCString()}</pubDate>`,
        `      <author>${escapeXml(`${email} (${author})`)}</author>`,
        ...(note.tags ?? []).map((tag) => `      <category>${escapeXml(tag)}</category>`),
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  // The newest note's date, not the build time: a feed that claims to change on
  // every deploy gets polled harder and trusted less.
  const newest = notes[0]
  const lastBuildDate = new Date(newest ? newest.lastmod || newest.date : 0).toUTCString()

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(`${title} — Notes`)}</title>`,
    `    <link>${escapeXml(`${siteUrl}/notes`)}</link>`,
    `    <description>${escapeXml(description)}</description>`,
    `    <language>${escapeXml(language)}</language>`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(`${siteUrl}/feed.xml`)}" rel="self" type="application/rss+xml"/>`,
    items,
    '  </channel>',
    '</rss>',
  ].join('\n')

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
