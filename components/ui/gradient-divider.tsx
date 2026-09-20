import { clsx } from 'clsx'

/**
 * A hairline rule that fades in and out of the accent. Used to open and close a
 * note; deliberately quieter than the text it separates.
 */
export function GradientDivider({ className }: { className?: string }) {
  return (
    <div
      className={clsx([
        'h-px w-full',
        'bg-gradient-to-r from-primary-500/0 via-primary-500/50 to-primary-500/0',
        'dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0',
        className,
      ])}
    />
  )
}
