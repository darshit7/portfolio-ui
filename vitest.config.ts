import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('./', import.meta.url))

/**
 * Shared Vite config. Projects do not inherit the root `plugins`/`resolve`, so
 * this is spread into each one rather than declared once above them.
 */
const shared = {
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
}

export default defineConfig({
  ...shared,
  test: {
    // worker_threads rather than forked processes. This repo lives on /mnt/d,
    // a Windows drive reached over 9p, where spawning a node process per test
    // file and re-reading node_modules through it is the dominant cost -- and
    // vitest kills a run whose worker takes longer than a hardcoded 60s to
    // boot, which forked workers on a cold cache intermittently did.
    pool: 'threads',
    globals: true,
    // Split by what each suite actually needs. Building a jsdom and loading
    // @testing-library cost ~35s and ~11s per file, and the eight suites in
    // tests/unit touch no DOM at all -- they were paying both for nothing.
    projects: [
      {
        ...shared,
        test: {
          name: 'unit',
          pool: 'threads',
          environment: 'node',
          globals: true,
          include: ['tests/unit/**/*.test.ts'],
        },
      },
      {
        ...shared,
        test: {
          name: 'components',
          pool: 'threads',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./tests/setup.ts'],
          include: ['tests/components/**/*.test.{ts,tsx}'],
        },
      },
    ],
  },
})
