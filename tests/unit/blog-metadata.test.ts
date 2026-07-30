import { describe, expect, it } from 'vitest'
import { getPublication } from '~/components/blog'
import { BLOG_METADATA } from '~/data/blog-metadata'

describe('getPublication', () => {
  // 25
  it('recognises a Medium-hosted Stackademic URL', () => {
    expect(getPublication('https://medium.com/stackademic/exploring-metaprogramming-x')).toBe(
      'Stackademic'
    )
  })

  // 26 — the second Stackademic URL shape; easy to miss when only one is handled.
  it('recognises the standalone blog.stackademic.com host', () => {
    expect(getPublication('https://blog.stackademic.com/exploring-generators-y')).toBe(
      'Stackademic'
    )
  })

  // 27
  it('recognises Python in Plain English', () => {
    expect(getPublication('https://medium.com/python-in-plain-english/beyond-the-gil-z')).toBe(
      'Python in Plain English'
    )
  })

  // 28 — a personal Medium post must not be attributed to a publication.
  it('falls back to Medium for a personal post', () => {
    expect(getPublication('https://medium.com/@darshit7/riding-the-deepseek-wave-a')).toBe('Medium')
  })

  // 29 — no badge is better than a wrong one.
  it('returns null for a non-Medium host', () => {
    expect(getPublication('https://example.com/some-article')).toBeNull()
  })
})

describe('BLOG_METADATA', () => {
  // 30 — used directly as the React key in app/blog/page.tsx.
  it('has unique ids', () => {
    const ids = BLOG_METADATA.map((b) => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  // 31 — an invalid Date renders the literal string "Invalid Date" to users.
  it('has a valid date on every entry', () => {
    for (const entry of BLOG_METADATA) {
      expect(entry.date instanceof Date, `${entry.title} has a non-Date date`).toBe(true)
      expect(Number.isNaN(entry.date.getTime()), `${entry.title} has an invalid date`).toBe(false)
    }
  })

  it('has a non-empty title and an absolute link on every entry', () => {
    for (const entry of BLOG_METADATA) {
      expect(entry.title.trim().length).toBeGreaterThan(0)
      expect(entry.link).toMatch(/^https?:\/\//)
    }
  })
})
