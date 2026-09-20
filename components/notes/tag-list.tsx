import { clsx } from 'clsx'
import { PillLink } from '~/components/ui/pill'
import type { PillSize } from '~/components/ui/pill'
import { tagSlug } from '~/utils/tags'

/**
 * A row of topic pills. Every tag links to /tags/[tag], which lists notes and
 * articles together -- the tag is the only thing joining the two surfaces.
 */
export function TagList({
  tags,
  size = 'sm',
  className,
}: {
  tags?: string[] | null
  size?: PillSize
  className?: string
}) {
  if (!tags?.length) return null

  return (
    <ul className={clsx('flex flex-wrap items-center gap-2', className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <PillLink href={`/tags/${tagSlug(tag)}`} size={size}>
            {tag}
          </PillLink>
        </li>
      ))}
    </ul>
  )
}
