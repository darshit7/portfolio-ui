import { describe, expect, it } from 'vitest'
import { collectTags, filterByTag, tagSlug } from '~/utils/tags'

describe('tagSlug', () => {
  it('lowercases and hyphenates', () => {
    expect(tagSlug('Orbital Mechanics')).toBe('orbital-mechanics')
    expect(tagSlug('Python')).toBe('python')
  })

  // REGRESSION GUARD: github-slugger drops "/" and "+" outright, so "AI/ML"
  // would collapse to "aiml" and "C++" to "c". Converting separators to a
  // hyphen first is the whole reason tagSlug exists rather than calling slug().
  it('keeps the word boundary at a separator', () => {
    expect(tagSlug('AI/ML')).toBe('ai-ml')
  })

  // REGRESSION: the separator replacement left the spaces around it in place,
  // so "Rust & Go" became "Rust - Go" and slugged to "rust---go".
  it('collapses whitespace around a separator', () => {
    expect(tagSlug('Rust & Go')).toBe('rust-go')
    expect(tagSlug('Data / Infra')).toBe('data-infra')
  })

  // "C++" reduces to "c-" once "+" becomes a separator; a trailing hyphen in a
  // URL is just noise.
  it('trims leading and trailing hyphens', () => {
    expect(tagSlug('C++')).toBe('c')
  })

  it('is stable under surrounding whitespace and case', () => {
    expect(tagSlug('  Python  ')).toBe(tagSlug('python'))
  })
})

describe('collectTags', () => {
  const notes = [{ tags: ['Python', 'Concurrency'] }, { tags: ['Python'] }]
  const blogs = [{ tags: ['Python', 'AI/ML'] }, { tags: ['AI/ML'] }]

  it('counts each surface separately and together', () => {
    const python = collectTags(notes, blogs).find((t) => t.slug === 'python')

    expect(python).toMatchObject({ noteCount: 2, blogCount: 1, total: 3, label: 'Python' })
  })

  it('joins the two surfaces on the slug, not the spelling', () => {
    const tags = collectTags([{ tags: ['ai/ml'] }], [{ tags: ['AI/ML'] }])

    expect(tags).toHaveLength(1)
    expect(tags[0]).toMatchObject({ slug: 'ai-ml', noteCount: 1, blogCount: 1, total: 2 })
  })

  it('orders by total descending, then alphabetically', () => {
    expect(collectTags(notes, blogs).map((t) => t.slug)).toEqual([
      'python', // 3
      'ai-ml', // 2
      'concurrency', // 1
    ])
  })

  it('ignores empty and whitespace-only tags', () => {
    expect(collectTags([{ tags: ['', '   '] }], [])).toEqual([])
  })

  it('tolerates a missing tags field on either surface', () => {
    expect(() => collectTags([{}], [{ tags: undefined }])).not.toThrow()
    expect(collectTags([{}], [{}])).toEqual([])
  })
})

describe('filterByTag', () => {
  const items = [
    { id: 1, tags: ['Python', 'AI/ML'] },
    { id: 2, tags: ['python'] },
    { id: 3, tags: ['Space'] },
    { id: 4 },
  ]

  it('matches on the slug regardless of how the tag was spelled', () => {
    expect(filterByTag(items, 'PYTHON').map((i) => i.id)).toEqual([1, 2])
  })

  it('matches a separator tag from either spelling', () => {
    expect(filterByTag(items, 'ai-ml').map((i) => i.id)).toEqual([1])
    expect(filterByTag(items, 'AI/ML').map((i) => i.id)).toEqual([1])
  })

  it('returns nothing for an unknown tag', () => {
    expect(filterByTag(items, 'nonexistent')).toEqual([])
  })
})
