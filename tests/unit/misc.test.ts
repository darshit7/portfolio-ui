import { describe, expect, it } from 'vitest'
import { formatDate, getYearsSince, sortPosts } from '~/utils/misc'

// Minimal stand-in for the contentlayer document shape sortPosts accepts.
type Post = { date: string; lastmod?: string; title: string }
const post = (title: string, date: string, lastmod?: string) =>
  ({ title, date, lastmod }) as unknown as Parameters<typeof sortPosts>[0][number]

describe('getYearsSince', () => {
  const START = '2015-07-01'

  // 1
  it('returns 11 years as of 2026-07-30', () => {
    expect(getYearsSince(START, new Date('2026-07-30'))).toBe(11)
  })

  // 2 — a naive getFullYear() diff would wrongly return 11 here.
  it('does not roll over before the anniversary', () => {
    expect(getYearsSince(START, new Date('2026-06-30'))).toBe(10)
  })

  // 3
  it('rolls over on the anniversary', () => {
    expect(getYearsSince(START, new Date('2027-07-01'))).toBe(12)
  })

  // 4 — the anniversary itself counts as complete.
  it('counts the anniversary day as inclusive', () => {
    expect(getYearsSince(START, new Date('2026-07-01'))).toBe(11)
  })
})

describe('sortPosts', () => {
  // 5 — REGRESSION: this mutated the contentlayer `allNotes` singleton, which is
  // shared across every render and request in the process.
  it('does not mutate its input', () => {
    const input = [post('old', '2020-01-01'), post('new', '2024-01-01')]
    const snapshot = input.map((p) => (p as unknown as Post).title)

    const result = sortPosts(input)

    expect(input.map((p) => (p as unknown as Post).title)).toEqual(snapshot)
    expect(result).not.toBe(input)
  })

  // 6
  it('orders newest first', () => {
    const result = sortPosts([
      post('middle', '2022-01-01'),
      post('oldest', '2020-01-01'),
      post('newest', '2024-01-01'),
    ])
    expect(result.map((p) => (p as unknown as Post).title)).toEqual(['newest', 'middle', 'oldest'])
  })

  // 7
  it('sorts by a custom dateKey', () => {
    const result = sortPosts(
      [post('a', '2020-01-01', '2024-06-01'), post('b', '2024-01-01', '2020-06-01')],
      'lastmod'
    )
    expect(result.map((p) => (p as unknown as Post).title)).toEqual(['a', 'b'])
  })
})

describe('formatDate', () => {
  // The whole suite runs under TZ=America/Los_Angeles (see the `test` script).
  // Node resolves the timezone once at startup, so it cannot be changed from
  // inside a test -- assigning process.env.TZ here would silently do nothing
  // and the assertion would pass against the broken implementation in CI.
  // getTimezoneOffset() is positive west of UTC. The off-by-one only manifests
  // west of UTC, so an east-of-UTC run (e.g. IST) would pass against the broken
  // implementation and prove nothing.
  it('runs west of UTC, so these assertions are meaningful', () => {
    expect(
      new Date().getTimezoneOffset(),
      'suite must run west of UTC -- check the TZ in the `test` script'
    ).toBeGreaterThan(0)
  })

  // 8 — REGRESSION: contentlayer dates parse as UTC midnight. Without
  // timeZone: 'UTC' this rendered the previous day for every visitor west of
  // UTC, in every kbar search result subtitle. Verified to fail against the
  // pre-fix implementation ('Apr 27, 2024').
  it('renders the authored date, not the host-local one', () => {
    expect(formatDate('2024-04-28')).toBe('Apr 28, 2024')
  })

  it('does not shift a new year boundary backwards', () => {
    expect(formatDate('2024-01-01')).toBe('Jan 01, 2024')
  })
})
