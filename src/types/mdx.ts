import type readingTime from 'reading-time'
import type { BrandIconsMap } from '@/components/BrandIcon'
import type { TOC } from './server'


export interface MdxFrontMatter {
  title: string
  name?: string
  date: string
  lastmod?: string
  tags: string[]
  draft?: boolean
  summary: string
  images?: string[] | string
  authors?: string[]
  slug: string
}

export type ReadingTime = ReturnType<typeof readingTime>

export interface BlogFrontMatter extends MdxFrontMatter {
  readingTime: ReadingTime
  fileName: string
}

export interface SnippetFrontMatter extends MdxFrontMatter {
  heading: string
  type: keyof typeof BrandIconsMap
}

export interface AuthorFrontMatter extends MdxFrontMatter {
  avatar: string
  github?: string
}

export interface MdxFileData {
  mdxSource: string
  frontMatter: BlogFrontMatter
  toc: TOC[]
}