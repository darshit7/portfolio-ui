import createMDX  from '@next/mdx'
// Remark packages
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
// Rehype packages
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'

/** @type {import('next').NextConfig} */
const nextConfig = { 
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
            rehypeSlug,
            rehypeCodeTitles,
            rehypePrism,
            rehypeAutolinkHeadings,
            rehypeAccessibleEmojis,
        ],
      },
  })

export default withMDX(nextConfig)