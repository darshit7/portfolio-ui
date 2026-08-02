import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { FOOTER_PERSONAL_STUFF } from '~/data/navigation'
import { SITE_METADATA } from '~/data/site-metadata'

const ROOT = process.cwd()
const PUBLIC = join(ROOT, 'public')

const resolvePublic = (webPath: string) => join(PUBLIC, webPath.replace(/^\//, ''))

describe('asset integrity', () => {
  // 17 — REGRESSION: socialBanner pointed at /static/images/projects/darshit-blog.png,
  // a directory that does not exist. It is the og:image fallback in
  // app/layout.tsx, app/seo.tsx and the note route, so every share of every
  // page rendered with no preview card.
  it('socialBanner resolves to a file that exists', () => {
    const path = resolvePublic(SITE_METADATA.socialBanner)
    expect(existsSync(path), `missing og:image asset: ${SITE_METADATA.socialBanner}`).toBe(true)
  })

  // 18 — same class; renders on the profile card.
  it('siteLogo resolves to a file that exists', () => {
    const path = resolvePublic(SITE_METADATA.siteLogo)
    expect(existsSync(path), `missing siteLogo asset: ${SITE_METADATA.siteLogo}`).toBe(true)
  })

  // 19 — REGRESSION: catches both the missing safari-pinned-tab.svg and the
  // feed.xml <link> that outlived its route, in one assertion. Scans the layout
  // source rather than a hand-maintained list so new references are covered
  // automatically.
  it('every local asset referenced in app/layout.tsx exists', () => {
    const source = readFileSync(join(ROOT, 'app/layout.tsx'), 'utf8')

    // Two forms appear in the head: template literals like
    // href={`${basePath}/static/favicons/favicon_32.png`} -- which a single
    // regex cannot span because of the ${} -- and plain href="/feed.xml".
    const staticRefs = [...source.matchAll(/\/static\/[\w./-]+\.\w+/g)].map((m) => m[0])
    const rootRefs = [...source.matchAll(/(?:href|src)=["'](\/[\w-]+\.\w+)["']/g)].map((m) => m[1])
    const referenced = [...new Set([...staticRefs, ...rootRefs])]

    expect(referenced.length).toBeGreaterThan(0)

    const missing = referenced.filter((p) => !existsSync(resolvePublic(p)))
    expect(missing, `referenced in app/layout.tsx but absent from public/`).toEqual([])
  })

  // 20 — REGRESSION: the manifest pointed at /favicon.png, which is absent.
  it('every icon in site.webmanifest exists', () => {
    const manifestPath = join(PUBLIC, 'static/favicons/site.webmanifest')
    expect(existsSync(manifestPath)).toBe(true)

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
    const missing = (manifest.icons ?? [])
      .map((icon: { src: string }) => icon.src)
      .filter((src: string) => !existsSync(resolvePublic(src)))

    expect(missing, 'manifest icons absent from public/').toEqual([])
  })

  // 21 — REGRESSION: both were empty strings, so the install prompt was unnamed.
  it('site.webmanifest has a name and short_name', () => {
    const manifest = JSON.parse(
      readFileSync(join(PUBLIC, 'static/favicons/site.webmanifest'), 'utf8')
    )

    expect(manifest.name?.trim()).toBeTruthy()
    expect(manifest.short_name?.trim()).toBeTruthy()
  })

  // 22 — nothing else checks that a footer link pointing at public/ has a file
  // behind it. Vacuous while every footer link is external; kept as the guard
  // for whenever a local one is added back.
  it('every local footer link resolves on disk', () => {
    const localLinks = FOOTER_PERSONAL_STUFF.filter((l) => l.href.startsWith('/'))

    const missing = localLinks.filter((l) => !existsSync(resolvePublic(l.href)))
    expect(
      missing.map((l) => l.href),
      'footer links with no file behind them'
    ).toEqual([])
  })
})
