/**
 * Module shims for packages that don't export TypeScript declarations
 * via their package.json `exports` map, making them invisible to
 * `moduleResolution: bundler`. These shims allow TypeScript to resolve
 * the imports without errors.
 */

// react-dom v19 bundles types internally but omits `"types"` from its
// `exports` map, so `moduleResolution: bundler` cannot resolve them.
declare module 'react-dom'

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
