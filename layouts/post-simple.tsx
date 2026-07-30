import type { Note } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { PostTitle } from '~/components/blog/post-title'
import { ScrollButtons } from '~/components/blog/scroll-buttons'
import { Container } from '~/components/ui/container'
import { GradientDivider } from '~/components/ui/gradient-divider'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import type { CoreContent } from '~/types/data'

interface PostSimpleProps {
  content: CoreContent<Note>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export function PostSimple({ content, children, next, prev }: PostSimpleProps) {
  const { title } = content

  return (
    <Container className="pt-4 lg:pt-12">
      <ScrollButtons />
      <article className="space-y-6 pt-6 lg:space-y-12">
        <PostTitle>{title}</PostTitle>
        <GradientDivider />
        <div className="prose prose-lg max-w-none dark:prose-invert">{children}</div>
        <GradientDivider className="mb-2 mt-1" />
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
