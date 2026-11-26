import { expect, test, type ConsoleMessage, type Page, type Response } from '@playwright/test'

const PAGES = [
  '/',
  '/blog',
  '/notes',
  '/notes/vim-configurations',
  '/satlab',
  // A tag carried by both a note and an article, so the page exercises both
  // halves of the topic route rather than just the notes grid.
  '/tags/python',
]

/** Collects console errors and failed responses for the lifetime of a page. */
function watch(page: Page) {
  const consoleErrors: string[] = []
  const notFound: string[] = []

  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    // "Failed to load resource" carries no URL and always duplicates a
    // response-level failure, which `notFound` records *with* its URL. Dropping
    // it here loses no coverage -- a genuinely missing asset still fails the
    // "no request 404s" test, and does so with something actionable.
    if (text.startsWith('Failed to load resource')) return
    consoleErrors.push(text)
  })
  page.on('pageerror', (err) => consoleErrors.push(String(err)))
  page.on('response', (res: Response) => {
    if (res.status() === 404) {
      notFound.push(`${res.status()} ${res.url()}`)
    }
  })

  return { consoleErrors, notFound }
}

test.describe('rendering', () => {
  // 53 — REGRESSION: the profile card called getTimezoneOffset() during render,
  // so the server (UTC) and the visitor disagreed and React discarded the whole
  // subtree. A hydration mismatch surfaces *only* as a console error.
  test('home page hydrates with no console errors', async ({ page }) => {
    const { consoleErrors } = watch(page)

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hydration = consoleErrors.filter((e) =>
      /hydrat|did not match|Minified React error/i.test(e)
    )
    expect(hydration, 'hydration mismatch on the home page').toEqual([])
    expect(consoleErrors).toEqual([])
  })

  // 54
  for (const path of PAGES) {
    test(`${path} renders without console errors`, async ({ page }) => {
      const { consoleErrors } = watch(page)

      const response = await page.goto(path)
      expect(response?.status(), `${path} did not return 200`).toBe(200)
      await page.waitForLoadState('networkidle')

      expect(consoleErrors, `console errors on ${path}`).toEqual([])
    })
  }

  // 55 — REGRESSION: catches the og:image, favicon and feed-link classes at
  // runtime. socialBanner pointed at a file that did not exist for months.
  test('no request 404s on any page', async ({ page }) => {
    const { notFound } = watch(page)

    for (const path of PAGES) {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
    }

    expect(notFound, 'requests returning 404').toEqual([])
  })

  test('unknown route renders the 404 page', async ({ page }) => {
    const response = await page.goto('/definitely-not-a-real-page')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('link', { name: /back to homepage/i })).toBeVisible()
  })
})

test.describe('mobile navigation', () => {
  // These only make sense where the mobile nav is the visible one.
  test.skip(({ isMobile }) => !isMobile, 'mobile viewport only')

  const openMenu = async (page: Page) => {
    await page.goto('/')
    await page.getByLabel('Toggle Menu').first().click()
    await expect(page.getByRole('link', { name: /^Notes$/ }).last()).toBeVisible()
  }

  // 56 — REGRESSION: the effect had no dependency array, so its cleanup ran
  // after every commit and released the lock the toggle had just installed.
  // The background scrolled behind the open menu on every device.
  test('locks background scroll while the menu is open', async ({ page }) => {
    await openMenu(page)

    const before = await page.evaluate(() => window.scrollY)
    await page.mouse.wheel(0, 600)
    await page.waitForTimeout(300)
    const after = await page.evaluate(() => window.scrollY)

    expect(after, 'background scrolled behind the open menu').toBe(before)
  })

  // 57 — the other half: a lock that never releases is worse than no lock.
  test('restores scrolling and leaves no residual body style on close', async ({ page }) => {
    await openMenu(page)
    await page.getByLabel('Toggle Menu').last().click()

    await page.waitForTimeout(400)

    const overflow = await page.evaluate(() => document.body.style.overflow)
    expect(overflow, 'body left with a residual overflow lock').toBe('')

    await page.mouse.wheel(0, 400)
    await page.waitForTimeout(300)
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  })
})

test.describe('site behaviour', () => {
  // 58 — next-themes plus its inline FOUC script are the only reason
  // 'unsafe-inline' remains in the script-src CSP.
  test('theme choice survives a reload', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Theme switcher').click()
    // Options are a Headless UI RadioGroup nested inside MenuItems. Role+name
    // matching does not resolve them reliably at a phone viewport, so select on
    // the visible label, which is stable and unambiguous.
    await page.getByText('Dark', { exact: true }).click()

    await expect(page.locator('html')).toHaveClass(/dark/)

    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})

test.describe('seo', () => {
  // The origin every page must declare as canonical, and that the apex
  // redirects to. Mirrors SITE_METADATA.siteUrl (not imported: e2e runs
  // without the app's path aliases).
  const ORIGIN = 'https://www.darshitp.dev'

  for (const path of PAGES) {
    // REGRESSION: no page declared a canonical, while apex and www both served
    // every page with a 200, so search engines saw two copies of the site.
    test(`${path} declares exactly one canonical, on www`, async ({ page }) => {
      await page.goto(path)
      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveCount(1)
      expect(await canonical.getAttribute('href')).toBe(path === '/' ? ORIGIN : `${ORIGIN}${path}`)
    })

    test(`${path} has the name in its title`, async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveTitle(/Darshit Patoliya/)
    })

    // REGRESSION: every page shared a 512×512 avatar, which LinkedIn and X
    // render as a thumbnail or not at all. Also catches the shallow-merge trap:
    // a page `openGraph` without `images` silently drops the card.
    test(`${path} advertises a share card that serves a PNG`, async ({ page, request }) => {
      await page.goto(path)
      const content = await page
        .locator('meta[property="og:image"]')
        .first()
        .getAttribute('content')
      expect(content, 'og:image missing').toBeTruthy()
      const url = new URL(content as string)
      expect(url.origin).toBe(ORIGIN)

      const response = await request.get(url.pathname)
      expect(response.status(), `${url.pathname} did not serve`).toBe(200)
      expect(response.headers()['content-type']).toContain('image/png')

      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        'content',
        'summary_large_image'
      )
    })
  }

  const jsonLdTypes = async (page: Page) => {
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
    return blocks.flatMap((b) =>
      (JSON.parse(b)['@graph'] as { '@type': string }[]).map((n) => n['@type'])
    )
  }

  test('home publishes the profile entity graph', async ({ page }) => {
    await page.goto('/')
    expect(await jsonLdTypes(page)).toEqual(
      expect.arrayContaining(['ProfilePage', 'Person', 'WebSite'])
    )
  })

  test('a note publishes its article and breadcrumb', async ({ page }) => {
    await page.goto('/notes/vim-configurations')
    expect(await jsonLdTypes(page)).toEqual(
      expect.arrayContaining(['TechArticle', 'BreadcrumbList'])
    )
  })

  // Empty stub: kept out of the index until its body returns.
  test('/satlab is noindexed', async ({ page }) => {
    await page.goto('/satlab')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('the RSS feed is advertised and serves', async ({ page, request }) => {
    await page.goto('/')
    const href = await page
      .locator('link[rel="alternate"][type="application/rss+xml"]')
      .getAttribute('href')
    expect(href).toBeTruthy()

    const response = await request.get(new URL(href as string, ORIGIN).pathname)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('xml')
    expect(await response.text()).toContain('<rss')
  })

  test('the apex host redirects permanently to www, keeping path and query', async ({
    request,
  }) => {
    const response = await request.get('/notes?x=1', {
      headers: { host: 'darshitp.dev' },
      maxRedirects: 0,
    })
    expect(response.status()).toBe(301)
    expect(response.headers()['location']).toBe(`${ORIGIN}/notes?x=1`)
  })
})
