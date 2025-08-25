import { Twemoji } from '~/components/ui/twemoji'
import { SITE_METADATA } from '~/data/site-metadata'

export function Intro() {
  return (
    <>
      <h1 className="text-neutral-900 dark:text-neutral-200">
        I&apos;m{' '}
        <span className="font-medium">
          {SITE_METADATA.firstName} {SITE_METADATA.lastName}
        </span>{' '}
        - a <span className="font-semibold">Pyhon developer</span> with over a decade of experience in the Python <Twemoji emoji="python" /> ecosystem.
        Currently, I am expanding my expertise in AI, Machine Learning <Twemoji emoji="robot" /> and Agentic development <Twemoji emoji="brain" />.
      </h1>
      <h1 className="mt-5 text-neutral-900 dark:text-neutral-200">
        I’m enthusiastic about emerging technologies, intricacies of the universe{' '}
        <Twemoji emoji="ringed-planet" />
        and our ever-evolving understanding of it.
      </h1>
      <h1 className="mt-5 text-neutral-900 dark:text-neutral-200">
        Outside of work, you’ll often find me enjoying time in nature{' '}
        <Twemoji emoji="snow-capped-mountain" />, reading{' '}
        <Twemoji emoji="open-book" /> or following my favorite sports like cricket{' '}
        <Twemoji emoji="cricket" />, swimming <Twemoji emoji="man-swimming" />
        &nbsp; and badminton <Twemoji emoji="badminton" />.
      </h1>
    </>
  )
}
