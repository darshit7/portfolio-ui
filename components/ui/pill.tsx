import { clsx } from 'clsx'
import type { ElementType, ReactNode } from 'react'
import { Link } from '~/components/ui/link'

export type PillSize = 'sm' | 'base'

/**
 * The one pill in the system, factored out of the home-page focus areas so the
 * focus strip, note categories, tags and counts stay a single shape.
 *
 * Deliberately neutral: emerald marks things that are *active*, and a row of
 * accent-coloured metadata would spend the whole accent budget on labels.
 */
const SIZES: Record<PillSize, string> = {
  sm: 'gap-1 px-2.5 py-0.5 text-xs',
  base: 'gap-1.5 px-3 py-1 text-sm',
}

const BASE = [
  'inline-flex items-center rounded-full font-medium',
  'bg-gray-100 text-gray-700',
  'dark:bg-white/5 dark:text-gray-300',
  'ring-1 ring-gray-200 dark:ring-white/10',
]

export function Pill({
  as: Component = 'span',
  size = 'base',
  className,
  children,
}: {
  as?: ElementType
  size?: PillSize
  className?: string
  children: ReactNode
}) {
  return <Component className={clsx(BASE, SIZES[size], className)}>{children}</Component>
}

/**
 * A pill that goes somewhere. Hover lifts the ground rather than growing an
 * underline -- the underline wash is sized for text, and inside a rounded pill
 * it reads as a rendering bug.
 */
export function PillLink({
  href,
  size = 'base',
  className,
  children,
  ...rest
}: {
  href: string
  size?: PillSize
  className?: string
  children: ReactNode
  [key: string]: unknown
}) {
  return (
    <Link
      href={href}
      className={clsx(
        BASE,
        SIZES[size],
        'transition-colors duration-150',
        'hover:bg-gray-200 hover:text-gray-900',
        'dark:hover:bg-white/10 dark:hover:text-white',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
