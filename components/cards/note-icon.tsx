import { BookOpen, Code2, Compass, Satellite, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Brand, BrandsMap } from '~/components/ui/brand'
import type { NoteCategory } from '~/data/note-categories'

/**
 * The glyph a category falls back to when a note has no brand mark. A note
 * about orbital elements or a book has nothing in `BrandsMap` to point at, and
 * before `icon` became optional that forced every note to borrow an unrelated
 * brand.
 */
export const CATEGORY_ICONS: Record<NoteCategory, LucideIcon> = {
  engineering: Code2,
  space: Satellite,
  ai: Sparkles,
  reading: BookOpen,
  practice: Compass,
}

/**
 * Renders a note's mark: the registered brand SVG when the note names one,
 * otherwise its category's lucide glyph.
 *
 * `icon` is validated at test time rather than here -- tests/unit/brand.test.ts
 * fails the build on an `icon` that is not a BrandsMap key, because silently
 * falling back would hide the typo that CLAUDE.md warns about.
 */
export function NoteIcon({
  icon,
  category,
  className,
}: {
  icon?: string
  category: NoteCategory
  className?: string
}) {
  if (icon && icon in BrandsMap) {
    return <Brand name={icon} as="icon" className={className} />
  }

  const Fallback = CATEGORY_ICONS[category] ?? Code2
  return <Fallback className={className} strokeWidth={1.5} aria-hidden="true" />
}
