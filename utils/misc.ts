import type { MDXDocumentDate } from '~/types/data'

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

/**
 * Sorts a list of MDX documents by date in descending order.
 * Copies first — callers pass the contentlayer `allNotes` singleton, which is
 * shared across every render and request in the process.
 */
export function sortPosts<T extends MDXDocumentDate>(allBlogs: T[], dateKey: string = 'date'): T[] {
  return [...allBlogs].sort((a, b) => dateSortDesc(a[dateKey], b[dateKey]))
}

function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}
