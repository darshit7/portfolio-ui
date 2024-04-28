import path from 'path'
import { readMDXFile } from '@/utils/mdx'
import Twemoji from '@/components/Twemoji'
import SectionContainer from '@/components/SectionContainer'
import { BlogTags } from '@/components/blog/BlogTags'
import { PageTitle } from '@/components/PageTitle'
import { BlogMeta } from '@/components/blog/BlogMeta'

export default async function SnippetPage({ params }: { params: { slug: string } }) {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  let {MDXContent, frontmatter} = await readMDXFile(path.join(process.cwd(), 'src', 'data', 'snippets', `${params.slug}.mdx`))
  console.dir(MDXContent)
  return (
    <SectionContainer>
      <article>
        <div>
          <header className="py-6 xl:pb-16 xl:pt-16">
            <div className="space-y-6">
              <BlogTags tags={frontmatter.tags} />
              <PageTitle>{frontmatter.title}</PageTitle>
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <BlogMeta date={frontmatter.date} slug={frontmatter.slug} readingTime={frontmatter.readingTime} />
                </div>
              </dl>
            </div>
          </header>
          <div className="pb-8" style={{ gridTemplateRows: 'auto 1fr' }}>
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose prose-base max-w-none pb-8 dark:prose-dark md:prose-lg">
              <MDXContent components={{Twemoji}}/>
              </div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}