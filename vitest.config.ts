import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('./', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Explicit aliases rather than vite-tsconfig-paths: tsconfig.json has no
    // `baseUrl` (the same gap Contentlayer warns about on every build), and the
    // plugin cannot resolve `~/*` without it.
    alias: [
      // SVGs go through @svgr/webpack in the Next build, which does not exist
      // here. Must precede the `~/` alias so `~/icons/x.svg` hits this first.
      // Must match the *entire* id: Vite does id.replace(find, replacement), so
      // a bare /\.svg$/ would rewrite only the extension and leave the prefix.
      { find: /^.*\.svg$/, replacement: `${root}tests/mocks/svg.tsx` },
      // `contentlayer/generated` is gitignored build output. Point at a fixture
      // so tests are deterministic and do not require a Contentlayer run.
      { find: 'contentlayer/generated', replacement: `${root}tests/mocks/contentlayer.ts` },
      { find: /^~\//, replacement: root },
      { find: /^app\//, replacement: `${root}app/` },
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    // Playwright specs live in e2e/ and are run by `pnpm test:e2e`.
    exclude: ['node_modules', '.next', '.contentlayer', 'e2e'],
  },
})
