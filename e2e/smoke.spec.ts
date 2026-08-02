import { expect, test, type ConsoleMessage, type Page, type Response } from '@playwright/test'

const PAGES = ['/', '/blog', '/notes', '/notes/vim-configurations']

/**
 * @vercel/analytics fetches /_vercel/insights/script.js, which is injected by
 * Vercel's edge runtime and does not exist under `next start`. Locally it 404s
 * and logs a MIME-type error. Filtered narrowly by path so genuine 404s and
 * console errors still fail the suite.
 */
const isVercelRuntimeNoise = (text: string) => text.includes('_vercel/insights')

/** Collects console errors and failed responses for the lifetime of a page. */
function watch(page: Page) {
  const consoleErrors: string[] = []
  const notFound: string[] = []

  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    if (isVercelRuntimeNoise(text)) return
    // "Failed to load resource" carries no URL and always duplicates a
    // response-level failure, which `notFound` records *with* its URL. Dropping
    // it here loses no coverage -- a genuinely missing asset still fails the
    // "no request 404s" test, and does so with something actionable.
    if (text.startsWith('Failed to load resource')) return
    consoleErrors.push(text)
  })
  page.on('pageerror', (err) => consoleErrors.push(String(err)))
  page.on('response', (res: Response) => {
    if (res.status() === 404 && !isVercelRuntimeNoise(res.url())) {
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
