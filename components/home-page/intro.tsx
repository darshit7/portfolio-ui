import { Twemoji } from '~/components/ui/twemoji'
import { SITE_METADATA } from '~/data/site-metadata'

export function Intro() {
  return (
    <>
      <h1 className="text-neutral-900 dark:text-neutral-200">
        I`&apos;`m{' '}
        <span className="font-medium">
          {SITE_METADATA.firstName} {SITE_METADATA.lastName}
        </span>{' '}
        - a full-stack developer with a strong focus on backend development, over a decade of
        experience in the Python <Twemoji emoji="python" /> ecosystem.
      </h1>
      <h1 className="mt-5 text-neutral-900 dark:text-neutral-200">
        I’m enthusiastic about emerging technologies, intricacies of the universe{' '}
        <Twemoji emoji="ringed-planet" />
        and our ever-evolving understanding of it.
      </h1>
      <h1 className="mt-5 text-neutral-900 dark:text-neutral-200">
        Outside of work, you’ll often find me enjoying time in nature{' '}
        <Twemoji emoji="snow-capped-mountain" />, hanging out with my wife{' '}
        <Twemoji emoji="winking-face" /> or following my favorite sports like cricket{' '}
        <Twemoji emoji="cricket" />, swimming <Twemoji emoji="man-swimming" />
        &nbsp; and badminton <Twemoji emoji="badminton" />.
      </h1>
    </>
  )
}
