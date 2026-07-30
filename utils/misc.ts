import type { MDXDocumentDate } from '~/types/data'

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

/**
 * Whole years elapsed since `startDate`, rolling over on the anniversary
 * rather than on 1 January.
 *
 * Callers are server components on static routes, so this is evaluated at
 * build time — it advances on the first deploy after each anniversary.
 */
export function getYearsSince(startDate: string, now = new Date()): number {
  const start = new Date(startDate)
  let years = now.getFullYear() - start.getFullYear()
  const monthDiff = now.getMonth() - start.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years--
  }
  return years
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
