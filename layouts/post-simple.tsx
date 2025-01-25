import type { Note } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { PostTitle } from '~/components/blog/post-title'
import { ScrollButtons } from '~/components/blog/scroll-buttons'
import { Container } from '~/components/ui/container'
import { GradientDivider } from '~/components/ui/gradient-divider'
import type { CoreContent } from '~/types/data'

interface PostSimpleProps {
  content: CoreContent<Note>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export function PostSimple({ content, children }: PostSimpleProps) {
  const { title } = content

  return (
    <Container className="pt-4 lg:pt-12">
      <ScrollButtons />
      <article className="space-y-6 pt-6 lg:space-y-12">
        <div className="space-y-4">
          <PostTitle>{title}</PostTitle>
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
            </div>
          </dl>
        </div>
        <GradientDivider />
        <div className="prose prose-lg max-w-none dark:prose-invert">{children}</div>
        <GradientDivider className="mb-2 mt-1" />
      </article>
    </Container>
  )
}
