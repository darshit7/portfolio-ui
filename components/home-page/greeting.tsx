import clsx from 'clsx'
import { Twemoji } from '~/components/ui/twemoji'

export function Greeting() {
  return (
    <h1
      className={clsx(
        'font-greeting font-extrabold tracking-tight',
        'text-[40px] leading-[60px] md:text-[68px] md:leading-[100px]',
        'bg-clip-text text-transparent',
        // One gradient geometry in both themes: warm-to-accent on the light page,
        // accent-to-lime on the dark one. Every stop clears 3:1 at this size.
        'bg-gradient-to-r from-amber-600 to-primary-600',
        'dark:from-primary-400 dark:to-lime-500'
      )}
    >
      Hello, folks! <Twemoji emoji="waving-hand" size="base" />
    </h1>
  )
}
