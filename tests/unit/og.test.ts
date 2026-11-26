import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  OG_SIZE,
  noteOgKey,
  ogCards,
  ogImage,
  ogImagePath,
  ogKeyFromSegments,
  ogSegments,
} from '~/utils/og'

describe('share cards', () => {
  const cards = ogCards()

  it('has a card for the site and each section', () => {
    expect(Object.keys(cards)).toEqual(expect.arrayContaining(['site', 'blog', 'notes']))
  })

  it('has a card for every published note', () => {
    expect(cards[noteOgKey('published-older')]).toBeDefined()
    expect(cards[noteOgKey('published-newer')]?.title).toBe('A Newer Published Note')
  })

  // Cards follow the pages: drafts render in dev (so their card is previewable)
  // and vanish in production. `isProduction` is captured at module load in
  // utils/contentlayer.ts, so stub the env before a fresh import.
  describe('drafts', () => {
    afterEach(() => {
      vi.unstubAllEnvs()
      vi.resetModules()
    })

    it('get no card in production', async () => {
      vi.resetModules()
      vi.stubEnv('NODE_ENV', 'production')
      const { ogCards: productionCards, noteOgKey: key } = await import('~/utils/og')
      expect(productionCards()[key('unpublished')]).toBeUndefined()
      expect(productionCards()[key('published-newer')]).toBeDefined()
    })
  })

  it('labels a note card with its category', () => {
    expect(cards[noteOgKey('published-newer')]?.eyebrow).toBe('Notes · Space')
  })

  // LinkedIn and X want 1.91:1; anything else gets cropped or letterboxed.
  it('advertises 1200×630 images at the route that serves them', () => {
    const image = ogImage(noteOgKey('published-newer'))
    expect(image).toMatchObject({ ...OG_SIZE, url: '/og/notes/published-newer.png' })
    expect(image.alt).toContain('A Newer Published Note')
  })

  // A key with no card must not produce an image URL that 404s.
  it('falls back to the site card for an unknown key', () => {
    expect(ogImage('notes/does-not-exist').url).toBe(ogImagePath('site'))
  })

  it('round-trips keys through route segments', () => {
    for (const key of Object.keys(cards)) {
      expect(ogKeyFromSegments(ogSegments(key))).toBe(key)
    }
    expect(ogSegments('notes/foo')).toEqual(['notes', 'foo.png'])
    expect(ogKeyFromSegments(['notes', 'foo'])).toBeUndefined()
  })

  // The route reads these at build time; a missing file fails the build late.
  it('has the font and avatar files the card renderer reads', () => {
    for (const file of [
      'assets/fonts/Nunito-Regular.ttf',
      'assets/fonts/Nunito-ExtraBold.ttf',
      'assets/fonts/OFL.txt',
      'public/static/images/avatar.jpg',
    ]) {
      expect(existsSync(join(process.cwd(), file)), file).toBe(true)
    }
  })
})
