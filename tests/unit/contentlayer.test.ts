import { afterEach, describe, expect, it, vi } from 'vitest'

const doc = (over: Record<string, unknown> = {}) =>
  ({
    _id: 'notes/x.mdx',
    _raw: { flattenedPath: 'notes/x' },
    body: { raw: 'raw', code: 'code' },
    title: 'A Note',
    summary: 'A summary',
    icon: 'Vim',
    date: '2024-01-01',
    ...over,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

/**
 * `isProduction` is captured at module load in utils/contentlayer.ts, so the
 * env must be stubbed *before* a fresh import -- setting process.env.NODE_ENV
 * inside a test would have no effect on the already-evaluated module.
 */
async function loadWithEnv(nodeEnv: string) {
  vi.resetModules()
  vi.stubEnv('NODE_ENV', nodeEnv)
  return import('~/utils/contentlayer')
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe('coreContent', () => {
  // 9 — these fields are large and internal; they reach the client through
  // /search.json if the omit ever regresses.
  it('strips body, _raw and _id', async () => {
    const { coreContent } = await loadWithEnv('development')
    const result = coreContent(doc())

    expect(result).not.toHaveProperty('body')
    expect(result).not.toHaveProperty('_raw')
    expect(result).not.toHaveProperty('_id')
  })

  // 10 — an over-eager omit would silently drop the fields cards render.
  it('preserves every other field', async () => {
    const { coreContent } = await loadWithEnv('development')
    const result = coreContent(doc())

    expect(result).toMatchObject({
      title: 'A Note',
      summary: 'A summary',
      icon: 'Vim',
      date: '2024-01-01',
    })
  })

  it('does not mutate the document it is given', async () => {
    const { coreContent } = await loadWithEnv('development')
    const input = doc()
    coreContent(input)

    expect(input).toHaveProperty('body')
    expect(input).toHaveProperty('_id')
  })
})

describe('allCoreContent', () => {
  // 11 — drafts must stay visible while writing.
  it('keeps drafts outside production', async () => {
    const { allCoreContent } = await loadWithEnv('development')
    const result = allCoreContent([doc({ title: 'live' }), doc({ title: 'wip', draft: true })])

    expect(result.map((d) => d.title)).toEqual(['live', 'wip'])
  })

  // 12 — an unpublished draft reaching the live site is the worst content
  // failure available here.
  it('removes drafts in production', async () => {
    const { allCoreContent } = await loadWithEnv('production')
    const result = allCoreContent([doc({ title: 'live' }), doc({ title: 'wip', draft: true })])

    expect(result.map((d) => d.title)).toEqual(['live'])
  })

  it('keeps documents with draft explicitly false in production', async () => {
    const { allCoreContent } = await loadWithEnv('production')
    const result = allCoreContent([doc({ title: 'live', draft: false })])

    expect(result.map((d) => d.title)).toEqual(['live'])
  })
})
