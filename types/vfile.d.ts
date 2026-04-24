/**
 * Augments VFile's open Data interface so remark plugins can attach typed data
 * (frontmatter, toc) without @ts-expect-error suppressions throughout the codebase.
 */
export {}

declare module 'vfile' {
  interface Data {
    frontmatter?: Record<string, unknown>
    toc?: { value: string; url: string; depth: number }[]
  }
}
