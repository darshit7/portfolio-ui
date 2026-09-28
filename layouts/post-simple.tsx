import { clsx } from 'clsx'
import { type Note } from 'contentlayer/generated'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { PostTitle } from '~/components/blog/post-title'
import { ScrollButtons } from '~/components/blog/scroll-buttons'
import { TagList } from '~/components/notes/tag-list'
import { hasToc, TocAside, TocDisclosure } from '~/components/notes/table-of-contents'
import { Container } from '~/components/ui/container'
import { GradientDivider } from '~/components/ui/gradient-divider'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { Pill } from '~/components/ui/pill'
import { getNoteCategory } from '~/data/note-categories'
import type { CoreContent } from '~/types/data'
import { formatDate } from '~/utils/misc'
import { tocItems } from '~/utils/note-fields'

interface PostSimpleProps {
  content: CoreContent<Note>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export function PostSimple({ content, children, next, prev }: PostSimpleProps) {
  const { title, date, lastmod, category, tags, toc } = content

  const categoryMeta = category ? getNoteCategory(category) : undefined
  const headings = tocItems(toc)

  return (
    <Container className="pt-4 lg:pt-12">
      <ScrollButtons />
      <article className="space-y-6 pt-6 lg:space-y-12">
        <header className="space-y-4">
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <GrowingUnderline>All notes</GrowingUnderline>
          </Link>
          <PostTitle>{title}</PostTitle>
          {/* A flex row of <time> and <span>, deliberately not a <dl>: an empty
              definition list with a dangling sr-only label was a real bug here,
              and post-simple.test.tsx guards against it returning. */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            {categoryMeta && <Pill size="sm">{categoryMeta.label}</Pill>}
            {date && <time dateTime={date}>{formatDate(date)}</time>}
            {lastmod && lastmod !== date && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <time dateTime={lastmod}>{formatDate(lastmod)}</time>
                </span>
              </>
            )}
          </div>
          <TagList tags={tags} />
        </header>

        <GradientDivider />

        {/* The TOC takes a column of its own only where there is room for one,
            and only when there is a TOC -- otherwise the grid reserves 14rem of
            empty gutter. Below xl it collapses into a disclosure above the body. */}
        <div
          className={clsx(
            'gap-10',
            hasToc(headings) && 'xl:grid xl:grid-cols-[minmax(0,1fr)_14rem]'
          )}
        >
          <div className="min-w-0">
            <TocDisclosure items={headings} />
            {/* max-w-none used to let prose run the full width of a max-w-6xl
                container -- around 120 characters a line on a desktop. */}
            <div className="prose prose-lg max-w-2xl dark:prose-invert lg:max-w-3xl">
              {children}
            </div>
          </div>
          <TocAside items={headings} />
        </div>

        <GradientDivider />

        {(prev || next) && (
          <nav aria-label="Note navigation" className="flex justify-between gap-6 pb-4">
            {prev ? (
              <Link href={`/${prev.path}`} className="max-w-[45%]">
                <GrowingUnderline>&larr; {prev.title}</GrowingUnderline>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/${next.path}`} className="max-w-[45%] text-right">
                <GrowingUnderline>{next.title} &rarr;</GrowingUnderline>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </article>
    </Container>
  )
}
