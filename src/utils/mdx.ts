import fs from 'fs'
import path from 'path'
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { remarkMdxToc } from '@/utils/remark-toc-heading'
// Rehype packages
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'


async function parseFrontmatter(fileContent: string) {
  const { value } = await compile(fileContent, {
    'remarkPlugins': [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkMdxToc
    ],
    'rehypePlugins': [ rehypeSlug, rehypeCodeTitles, rehypeAutolinkHeadings, rehypeAccessibleEmojis],
    'outputFormat': 'function-body',
  })
  const { default: MDXContent, frontmatter, toc } = await run(value, { ...runtime, baseUrl: import.meta.url } );
  return { MDXContent, frontmatter, toc}
}

function getRecursiveMDXFiles(dir:string) {
    return fs.readdirSync(dir, {recursive: true}).filter((file) => path.extname(file) === '.mdx')
}

export async function readMDXFile(filePath:string) {
    let rawContent = fs.readFileSync(filePath, 'utf-8')
    const result = await parseFrontmatter(rawContent)
    return result
}

export const getMDXData = async(dir:string) => {
  let mdxFiles = getRecursiveMDXFiles(dir)
  let MDXdata: object[] = [];
  MDXdata = await Promise.all(
    mdxFiles.map(async (file) => {
      return await readMDXFile(path.join(dir, file))
    }))
  return MDXdata;
}
