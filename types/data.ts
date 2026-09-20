import type { Document, MDX } from 'contentlayer2/core'

export type MDXDocument = Document & { body: MDX }
export type MDXDocumentDate = MDXDocument & {
  date: string
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>

export type BlogItem = {
  /** Used directly as the React key on /blog; `BLOG_METADATA` guarantees uniqueness. */
  id: number
  title: string
  date: Date
  link: string
  /** Display spellings; `utils/tags.ts` slugs them to join notes and articles on /tags. */
  tags?: string[]
}
