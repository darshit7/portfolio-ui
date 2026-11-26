import { describe, expect, it } from 'vitest'
import robots from '~/app/robots'
import { SITE_METADATA } from '~/data/site-metadata'

describe('robots.txt', () => {
  const result = robots()

  // REGRESSION: `host` emitted "Host: https://www.darshitp.dev", a Yandex-only
  // directive that Google ignores and Yandex rejects with a scheme in it.
  it('emits no Host directive', () => {
    expect(result.host).toBeUndefined()
  })

  it('points crawlers at an absolute sitemap URL on the canonical origin', () => {
    expect(result.sitemap).toBe(`${SITE_METADATA.siteUrl}/sitemap.xml`)
  })

  it('allows crawling everything', () => {
    expect(result.rules).toEqual({ userAgent: '*', allow: '/' })
  })
})
