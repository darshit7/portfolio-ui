import { genPageMetadata } from 'app/seo'
import { allNotes } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { BlogListItem } from '~/components/blog'
import { NoteCard } from '~/components/cards/note'
import { Container } from '~/components/ui/container'
import { Link } from '~/components/ui/link'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { PageHeader } from '~/components/ui/page-header'
import { Pill } from '~/components/ui/pill'
import { BLOG_METADATA } from '~/data/blog-metadata'
import { allCoreContent } from '~/utils/contentlayer'
import { sortPosts } from '~/utils/misc'
import { collectTags, filterByTag } from '~/utils/tags'

/**
 * Topic pages are the only thing joining the two content surfaces. Notes live
 * in contentlayer and articles live in a hand-maintained array; a tag is the
 * one field they share, so this is where "everything I have written about
 * concurrency" can exist at all.
 *
 * Top-level `/tags/` rather than `/notes/tags/` on purpose: `app/notes/[...slug]`
 * is a catch-all, so a route nested under it would shadow any note slugged
 * `tags/*`.
 */
function registry() {
  const notes = allCoreContent(sortPosts(allNotes))
  return { notes, tags: collectTags(notes, BLOG_METADATA) }
}

export function generateStaticParams() {
  return registry().tags.map(({ slug }) => ({ tag: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const summary = registry().tags.find((t) => t.slug === tag)
  if (!summary) return genPageMetadata({ title: 'Topic' })

  return genPageMetadata({
    title: summary.label,
    description: `Notes and articles tagged ${summary.label}.`,
  })
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const { notes, tags } = registry()

  const summary = tags.find((t) => t.slug === tag)
  if (!summary) return notFound()

  const taggedNotes = filterByTag(notes, summary.label)
  const taggedBlogs = filterByTag(BLOG_METADATA, summary.label).sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  )

  return (
    <Container>
      <PageHeader
        title={summary.label}
        description={`Everything here tagged ${summary.label} — notes and published articles together.`}
        className="border-b border-gray-200 dark:border-gray-700"
      >
        <ul className="flex flex-wrap items-center gap-2 pt-2">
          {summary.noteCount > 0 && (
            <li>
              <Pill size="sm">
                {summary.noteCount} {summary.noteCount === 1 ? 'note' : 'notes'}
              </Pill>
            </li>
          )}
          {summary.blogCount > 0 && (
            <li>
              <Pill size="sm">
                {summary.blogCount} {summary.blogCount === 1 ? 'article' : 'articles'}
              </Pill>
            </li>
          )}
        </ul>
      </PageHeader>

      <div className="space-y-14 py-12">
        {taggedNotes.length > 0 && (
          <section aria-labelledby="tagged-notes">
            <h2 id="tagged-notes" className="text-2xl font-bold tracking-tight">
              Notes
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
              {taggedNotes.map((note) => (
                <NoteCard note={note} key={note.path} />
              ))}
            </div>
          </section>
        )}

        {taggedBlogs.length > 0 && (
          <section aria-labelledby="tagged-articles">
            <h2 id="tagged-articles" className="text-2xl font-bold tracking-tight">
              Articles
            </h2>
            <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
              {taggedBlogs.map((blog) => (
                <BlogListItem key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/notes">
            <GrowingUnderline>&larr; All notes</GrowingUnderline>
          </Link>
          <Link href="/blog">
            <GrowingUnderline>All articles &rarr;</GrowingUnderline>
          </Link>
        </div>
      </div>
    </Container>
  )
}
