/**
 * Stands in for `contentlayer/generated`, which does not exist until the
 * Contentlayer CLI runs and is gitignored. Aliased in vitest.config.ts so tests
 * never depend on build output.
 *
 * Mirrors the real `Note` shape, including the computed `path` field, which is
 * the flattenedPath and therefore already starts with "notes/", and the two
 * `json` computed fields (`readingTime`, `toc`) that the note card and layout
 * now read.
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
    category: 'engineering',
    tags: ['Vim', 'Python'],
    date: '2024-01-01T00:00:00.000Z',
    summary: 'The older one.',
    draft: false,
    slug: 'published-older',
    path: 'notes/published-older',
    filePath: 'notes/published-older.mdx',
    readingTime: { text: '3 min read', minutes: 3, time: 180000, words: 600 },
    toc: [{ value: 'First', url: '#first', depth: 2 }],
  },
  {
    _id: 'notes/published-newer.mdx',
    _raw: { flattenedPath: 'notes/published-newer', sourceFilePath: 'notes/published-newer.mdx' },
    type: 'Note',
    body: { raw: 'newer body', code: 'newer-code' },
    heading: 'Newer',
    title: 'A Newer Published Note',
    icon: 'Python',
    category: 'space',
    tags: ['Python', 'Space'],
    date: '2025-06-15T00:00:00.000Z',
    lastmod: '2025-07-01T00:00:00.000Z',
    summary: 'The newer one.',
    draft: false,
    slug: 'published-newer',
    path: 'notes/published-newer',
    filePath: 'notes/published-newer.mdx',
    readingTime: { text: '5 min read', minutes: 5, time: 300000, words: 1000 },
    toc: [
      { value: 'One', url: '#one', depth: 2 },
      { value: 'Two', url: '#two', depth: 2 },
    ],
  },
  {
    _id: 'notes/unpublished.mdx',
    _raw: { flattenedPath: 'notes/unpublished', sourceFilePath: 'notes/unpublished.mdx' },
    type: 'Note',
    body: { raw: 'draft body', code: 'draft-code' },
    heading: 'Draft',
    title: 'An Unpublished Draft',
    icon: 'Markdown',
    category: 'practice',
    tags: ['Drafts Only'],
    date: '2025-12-01T00:00:00.000Z',
    summary: 'Must never reach production.',
    draft: true,
    slug: 'unpublished',
    path: 'notes/unpublished',
    filePath: 'notes/unpublished.mdx',
    readingTime: { text: '1 min read', minutes: 1, time: 60000, words: 200 },
    toc: [],
  },
]
