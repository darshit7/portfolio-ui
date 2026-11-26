import { describe, expect, it } from 'vitest'
import sitemap from '~/app/sitemap'
import { BLOG_METADATA } from '~/data/blog-metadata'
import { SITE_METADATA } from '~/data/site-metadata'

const entries = sitemap()
const urls = entries.map((e) => e.url)

describe('sitemap', () => {
  // 13 — REGRESSION: `path` is the contentlayer flattenedPath and already
  // begins with "notes/". Prefixing it again shipped
  // https://www.darshitp.dev/notes/notes/vim-configurations to Google, so every
  // note was indexed under a URL that 404s.
  it('emits exactly one /notes/ segment per note URL', () => {
    const noteUrls = urls.filter((u) => u.includes('/notes/'))

    expect(noteUrls.length).toBeGreaterThan(0)
    for (const url of noteUrls) {
      expect(url).not.toContain('/notes/notes/')
      expect(url.match(/\/notes\//g)).toHaveLength(1)
    }
  })

  // 14
  it('includes the static routes', () => {
    expect(urls).toEqual(
      expect.arrayContaining([
        `${SITE_METADATA.siteUrl}/`,
        `${SITE_METADATA.siteUrl}/blog`,
        `${SITE_METADATA.siteUrl}/notes`,
      ])
    )
  })

  // 15 — a draft must never be submitted for indexing.
  it('excludes draft notes', () => {
    expect(urls.some((u) => u.includes('unpublished'))).toBe(false)
    expect(urls.some((u) => u.includes('published-newer'))).toBe(true)
  })

  // 16 — crawlers silently ignore relative sitemap entries.
  it('emits only absolute URLs under the site origin', () => {
    for (const url of urls) {
      expect(url.startsWith(SITE_METADATA.siteUrl)).toBe(true)
    }
  })

  it('gives every entry a lastModified value', () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeTruthy()
    }
  })

  // REGRESSION: static and tag routes were stamped with the build date, so
  // every deploy claimed ~25 unchanged pages had changed. Each date must now
  // be the newest content the page shows. Compared against fixture values, not
  // "not today": the newest Medium article can legitimately be dated today.
  describe('lastModified comes from content, not the build', () => {
    const lastModified = (path: string) =>
      entries.find((e) => e.url === `${SITE_METADATA.siteUrl}${path}`)?.lastModified

    const newestArticle = new Date(
      Math.max(...BLOG_METADATA.map((b) => b.date.getTime()))
    ).toISOString()

    it('/notes is the newest published note, by lastmod', () => {
      // published-newer: lastmod 2025-07-01. The draft (2025-12-01) must not count.
      expect(lastModified('/notes')).toBe('2025-07-01T00:00:00.000Z')
    })

    it('/blog is the newest article', () => {
      expect(lastModified('/blog')).toBe(newestArticle)
    })

    it('/ is the newest of the two', () => {
      const newest = [newestArticle, '2025-07-01T00:00:00.000Z'].sort().at(-1)
      expect(lastModified('/')).toBe(newest)
    })

    it('a tag is its own newest item, not the site-wide newest', () => {
      // Only published-older (2024-01-01) carries Vim; no article does.
      expect(lastModified('/tags/vim')).toBe('2024-01-01T00:00:00.000Z')
    })

    it('a note is its own lastmod, falling back to its date', () => {
      expect(lastModified('/notes/published-newer')).toBe('2025-07-01T00:00:00.000Z')
      expect(lastModified('/notes/published-older')).toBe('2024-01-01T00:00:00.000Z')
    })
  })

  // /satlab is an empty, noindexed stub: submitting it for indexing contradicts
  // its own robots meta. Remove this test when the page gets real content.
  it('omits the noindexed /satlab stub', () => {
    expect(urls).not.toContain(`${SITE_METADATA.siteUrl}/satlab`)
  })
})
