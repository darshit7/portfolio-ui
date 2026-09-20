import { genPageMetadata } from 'app/seo'
import { BlogList } from '~/components/blog'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { Pill, PillLink } from '~/components/ui/pill'
import { BLOG_METADATA } from '~/data/blog-metadata'
import { collectTags } from '~/utils/tags'

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const blogs = [...BLOG_METADATA].sort((a, b) => b.date.getTime() - a.date.getTime())

  // Only the topics with more than one article: a row of eight pills where each
  // matches exactly one post is a second copy of the list, not a filter.
  const topics = collectTags([], blogs).filter((tag) => tag.blogCount > 1)

  return (
    <Container>
      <PageHeader
        title="Blogs"
        description="Long-form articles on Python internals, concurrency and AI — published on Medium."
        className="border-b border-gray-200 dark:border-gray-700"
      >
        <ul className="flex flex-wrap items-center gap-2 pt-2">
          <li>
            <Pill size="sm">
              {blogs.length} {blogs.length === 1 ? 'article' : 'articles'}
            </Pill>
          </li>
          {topics.map((topic) => (
            <li key={topic.slug}>
              <PillLink href={`/tags/${topic.slug}`} size="sm">
                {topic.label}
                <span className="text-gray-500 dark:text-gray-400">{topic.total}</span>
              </PillLink>
            </li>
          ))}
        </ul>
      </PageHeader>
      <div className="py-8">
        <BlogList blogs={blogs} />
      </div>
    </Container>
  )
}
