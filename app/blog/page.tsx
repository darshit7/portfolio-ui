import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { BlogListItem } from '~/components/blog'
import { BLOG_METADATA } from '~/data/blog-metadata'

export default async function BlogPage() {
  return (
    <Container className="pt-0 lg:pt-0">
      <PageHeader
        title="Blogs"
        description=""
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-10">
        <div className="grid-cols-1 gap-x-6 space-y-0 md:grid md:space-y-0">
          {
            BLOG_METADATA.sort((a, b) => b.date.getTime() - a.date.getTime()).map((item) => (
              <BlogListItem blog={item} key={item.id} />
            ))
          }
        </div>
      </div>
    </Container>
  )
}
