import { describe, expect, it } from 'vitest'
import sitemap from '~/app/sitemap'
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
})
