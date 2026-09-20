import { slug } from 'github-slugger'

/**
 * A topic, as it appears on /tags/[tag]. Tags are authored as display strings
 * ("AI/ML", "Python") in two independent places -- note frontmatter and
 * `BLOG_METADATA` -- so the slug is what joins them, and the first spelling
 * seen wins as the label.
 */
export type TagSummary = {
  slug: string
  label: string
  noteCount: number
  blogCount: number
  /** Notes plus articles. This is what the tag pages and pills count. */
  total: number
}

/**
 * URL form of a tag.
 *
 * `/`, `&` and `+` become separators before slugging: github-slugger drops them
 * outright, which would collapse "AI/ML" to "aiml". Converting them to a hyphen
 * first keeps the word boundary that makes a slug readable.
 *
 * The surrounding whitespace has to go with them -- "Rust & Go" would otherwise
 * become "Rust - Go" and then "rust---go", because the slugger turns each
 * remaining space into its own hyphen. Trailing hyphens are trimmed for the
 * same reason: "C++" reduces to "c-" without it.
 */
export function tagSlug(tag: string): string {
  return slug(tag.trim().replace(/\s*[/&+]+\s*/g, '-')).replace(/^-+|-+$/g, '')
}

type Taggable = { tags?: string[] | null }

/**
 * Builds the tag registry from both content surfaces at once.
 *
 * Pure and data-in so it can be unit tested without contentlayer: callers pass
 * `allCoreContent(allNotes)` and `BLOG_METADATA`. Sorted by total descending,
 * then alphabetically, so the busiest topics lead and ties stay stable across
 * builds (an unstable order would churn the sitemap on every deploy).
 */
export function collectTags(notes: Taggable[], blogs: Taggable[]): TagSummary[] {
  const registry = new Map<string, TagSummary>()

  const add = (tag: string, kind: 'note' | 'blog') => {
    const trimmed = tag.trim()
    if (!trimmed) return

    const key = tagSlug(trimmed)
    if (!key) return

    const existing = registry.get(key) ?? {
      slug: key,
      label: trimmed,
      noteCount: 0,
      blogCount: 0,
      total: 0,
    }

    if (kind === 'note') existing.noteCount += 1
    else existing.blogCount += 1
    existing.total += 1

    registry.set(key, existing)
  }

  for (const note of notes) for (const tag of note.tags ?? []) add(tag, 'note')
  for (const blog of blogs) for (const tag of blog.tags ?? []) add(tag, 'blog')

  return [...registry.values()].sort((a, b) => b.total - a.total || a.label.localeCompare(b.label))
}

/** Everything in `items` carrying `tag`, compared on the slug rather than the spelling. */
export function filterByTag<T extends Taggable>(items: T[], tag: string): T[] {
  const target = tagSlug(tag)
  return items.filter((item) => (item.tags ?? []).some((t) => tagSlug(t) === target))
}
