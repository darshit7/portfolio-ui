/**
 * Module shims for packages that don't export TypeScript declarations
 * via their package.json `exports` map, making them invisible to
 * `moduleResolution: bundler`. These shims allow TypeScript to resolve
 * the imports without errors.
 */

// react-dom v19 bundles types internally but omits `"types"` from its
// `exports` map, so `moduleResolution: bundler` cannot resolve them.
declare module 'react-dom'

/**
 * SVG imports are transformed into React components by @svgr/webpack.
 *
 * Next declares `*.svg` (loosely, as `any`) via next-env.d.ts ->
 * next/image-types/global, but next-env.d.ts is gitignored and only generated
 * by `next dev`/`next build`. Any `tsc` run on a clean checkout -- which is
 * exactly what CI does, since typecheck runs before build -- would otherwise
 * fail with 50 TS2307 errors.
 *
 * Declaring it here keeps typecheck independent of build artifacts, and types
 * the components properly instead of `any`. The pattern is more specific than
 * Next's bare `*.svg`, so TypeScript prefers it and the two do not collide.
 */
declare module '~/icons/*' {
  import type { FunctionComponent, SVGProps } from 'react'
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>
  export default ReactComponent
}

// probe-image-size has no bundled types and no DefinitelyTyped package.
declare module 'probe-image-size' {
  export interface ImageSize {
    width: number
    height: number
    type: string
    mime: string
    wUnits: string
    hUnits: string
  }
  export function sync(data: Buffer | string): ImageSize
  export default function probe(src: string | NodeJS.ReadableStream): Promise<ImageSize>
}
