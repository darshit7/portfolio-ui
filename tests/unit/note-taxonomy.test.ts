import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { NOTE_CATEGORIES, NOTE_CATEGORY_SLUGS, getNoteCategory } from '~/data/note-categories'

const NOTES_DIR = join(process.cwd(), 'data/notes')

function mdxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return mdxFiles(full)
    return entry.name.endsWith('.mdx') ? [full] : []
  })
}

/**
 * Reads frontmatter with a regex rather than through contentlayer, matching
 * tests/unit/brand.test.ts. The generated output is what contentlayer already
 * validated; the point here is to catch a note whose frontmatter is wrong
 * before a build has to.
 */
function frontmatter(file: string) {
  const source = readFileSync(file, 'utf8')
  const category = source.match(/^category:\s*['"]?([^'"\n]+)['"]?\s*$/m)?.[1]?.trim()
  const rawTags = source.match(/^tags:\s*\[(.*)\]\s*$/m)?.[1]
  const tags = rawTags
    ? rawTags
        .split(',')
        .map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean)
    : []
  return { category, tags }
}

describe('note taxonomy', () => {
  const files = mdxFiles(NOTES_DIR)

  it('finds notes to check', () => {
    expect(files.length).toBeGreaterThan(0)
  })

  // The contentlayer enum already rejects an unknown category at build time.
  // This fails faster and says which file, which the enum error does not.
  it('every note declares a known category', () => {
    const offenders = files
      .map((file) => ({ file, ...frontmatter(file) }))
      .filter(({ category }) => !category || !NOTE_CATEGORY_SLUGS.includes(category as never))
      .map(({ file, category }) => `${file}: category ${category ?? '(missing)'}`)

    expect(offenders).toEqual([])
  })

  it('every note carries at least one tag', () => {
    const untagged = files.filter((file) => frontmatter(file).tags.length === 0)
    expect(untagged, 'notes with no tags never surface on a topic page').toEqual([])
  })

  it('no tag is empty or whitespace-only', () => {
    const offenders = files.flatMap((file) =>
      frontmatter(file)
        .tags.filter((tag) => tag.trim().length === 0)
        .map(() => file)
    )
    expect(offenders).toEqual([])
  })
})

describe('NOTE_CATEGORIES', () => {
  it('has unique slugs', () => {
    const slugs = NOTE_CATEGORIES.map((c) => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('gives every category a label', () => {
    for (const category of NOTE_CATEGORIES) {
      expect(category.label.trim().length, `${category.slug} has no label`).toBeGreaterThan(0)
    }
  })

  it('resolves a known slug and rejects an unknown one', () => {
    expect(getNoteCategory('space')?.label).toBe('Space')
    expect(getNoteCategory('nonexistent')).toBeUndefined()
  })
})
