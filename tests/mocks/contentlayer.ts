/**
 * Stands in for `contentlayer/generated`, which does not exist until the
 * Contentlayer CLI runs and is gitignored. Aliased in vitest.config.ts so tests
 * never depend on build output.
 *
 * Mirrors the real `Note` shape, including the computed `path` field, which is
 * the flattenedPath and therefore already starts with "notes/".
 */
export const allNotes = [
  {
    _id: 'notes/published-older.mdx',
    _raw: { flattenedPath: 'notes/published-older', sourceFilePath: 'notes/published-older.mdx' },
    type: 'Note',
    body: { raw: 'older body', code: 'older-code' },
    heading: 'Older',
    title: 'An Older Published Note',
    icon: 'Vim',
    date: '2024-01-01T00:00:00.000Z',
    summary: 'The older one.',
    draft: false,
    slug: 'published-older',
    path: 'notes/published-older',
    filePath: 'notes/published-older.mdx',
  },
  {
    _id: 'notes/published-newer.mdx',
    _raw: { flattenedPath: 'notes/published-newer', sourceFilePath: 'notes/published-newer.mdx' },
    type: 'Note',
    body: { raw: 'newer body', code: 'newer-code' },
    heading: 'Newer',
    title: 'A Newer Published Note',
    icon: 'Python',
    date: '2025-06-15T00:00:00.000Z',
    lastmod: '2025-07-01T00:00:00.000Z',
    summary: 'The newer one.',
    draft: false,
    slug: 'published-newer',
    path: 'notes/published-newer',
    filePath: 'notes/published-newer.mdx',
  },
  {
    _id: 'notes/unpublished.mdx',
    _raw: { flattenedPath: 'notes/unpublished', sourceFilePath: 'notes/unpublished.mdx' },
    type: 'Note',
    body: { raw: 'draft body', code: 'draft-code' },
    heading: 'Draft',
    title: 'An Unpublished Draft',
    icon: 'Markdown',
    date: '2025-12-01T00:00:00.000Z',
    summary: 'Must never reach production.',
    draft: true,
    slug: 'unpublished',
    path: 'notes/unpublished',
    filePath: 'notes/unpublished.mdx',
  },
]
