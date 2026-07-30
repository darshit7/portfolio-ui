import { defineConfig, devices } from '@playwright/test'

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    // The scroll-lock specs only make sense at a phone viewport, where the
    // mobile nav is the visible one.
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  // Tests run against a production build: the hydration and static-render
  // behaviour under test does not exist in `next dev`.
  webServer: {
    command: 'pnpm serve',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
