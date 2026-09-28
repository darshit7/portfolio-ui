/**
 * The five things this notebook is for. The order here is the order the
 * sections render in on /notes, so it reads as a deliberate table of contents
 * rather than whatever happened to be written last.
 *
 * This is the single source of truth for the taxonomy: `category` in note
 * frontmatter is a contentlayer enum built from these slugs.
 *
 * A slug and a label is the whole entry. Each category used to carry a blurb
 * rendered under its heading on /notes; it restated the label, so the sections
 * are headed by their name and count alone and a new category needs nothing
 * written for it.
 *
 * **Do not remove an entry to hide notes.** Contentlayer does not reject a note
 * whose category is missing from this list -- it narrows the generated
 * `category` type to the surviving slugs and builds the orphaned notes anyway,
 * so the type stops describing the data and the failures surface somewhere
 * else (`CATEGORY_ICONS`, category filters, the taxonomy tests). To take a note
 * off the live site, set `draft: true` on the note: `allCoreContent` filters
 * drafts in production, and a category with no published notes is already
 * omitted from /notes entirely.
 */
export const NOTE_CATEGORIES = [
  {
    slug: 'engineering',
    label: 'Engineering',
  },
  {
    slug: 'ai',
    label: 'AI & Prompts',
  },
  {
    slug: 'reading',
    label: 'Reading',
  },
  {
    slug: 'practice',
    label: 'Practice',
  },
  // Last on purpose. It is the newest thread and the most specialised, so it
  // reads better as the thing you find at the end than as the second section in.
  {
    slug: 'space',
    label: 'Space',
  },
] as const

export type NoteCategory = (typeof NOTE_CATEGORIES)[number]['slug']

/** The enum options contentlayer validates `category:` frontmatter against. */
export const NOTE_CATEGORY_SLUGS: NoteCategory[] = NOTE_CATEGORIES.map((c) => c.slug)

export function getNoteCategory(slug: string) {
  return NOTE_CATEGORIES.find((c) => c.slug === slug)
}
