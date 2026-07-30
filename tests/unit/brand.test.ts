import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { FILE_NAME_MAP, LANGS_MAP } from '~/components/mdx/code-title'
import { BrandsMap } from '~/components/ui/brand'

const NOTES_DIR = join(process.cwd(), 'data/notes')

function mdxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return mdxFiles(full)
    return entry.name.endsWith('.mdx') ? [full] : []
  })
}

describe('brand registry integrity', () => {
  // 23 — documented footgun: an `icon` value that is not a BrandsMap key
  // destructures from undefined and renders nothing at all, silently.
  it('every note icon is a registered brand', () => {
    const files = mdxFiles(NOTES_DIR)
    expect(files.length).toBeGreaterThan(0)

    const offenders: string[] = []
    for (const file of files) {
      const source = readFileSync(file, 'utf8')
      const match = source.match(/^icon:\s*['"]?([^'"\n]+)['"]?\s*$/m)
      if (!match) {
        offenders.push(`${file}: no icon in frontmatter`)
        continue
      }
      const icon = match[1].trim()
      if (!(icon in BrandsMap)) {
        offenders.push(`${file}: icon "${icon}" is not a BrandsMap key`)
      }
    }

    expect(offenders).toEqual([])
  })

  // 24 — REGRESSION: an unmapped language produced `undefined`, which rendered
  // Brand's hidden fallback span plus an orphan flex gap in the code title bar.
  it('every mapped language and filename points at a registered brand', () => {
    const bad = [...Object.entries(LANGS_MAP), ...Object.entries(FILE_NAME_MAP)].filter(
      ([, brand]) => !(brand in BrandsMap)
    )

    expect(bad).toEqual([])
  })

  it('BrandsMap entries all expose an Icon', () => {
    const withoutIcon = Object.entries(BrandsMap).filter(([, value]) => !value?.Icon)
    expect(withoutIcon.map(([key]) => key)).toEqual([])
  })
})
