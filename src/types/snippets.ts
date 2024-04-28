
export interface FrontMatter {
  title: string
  date: string
  draft: boolean
}

export interface MdxFileData {
  MDXContent: Function
  frontmatter: FrontMatter
}