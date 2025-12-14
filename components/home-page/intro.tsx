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
        - a <span className="font-semibold">software engineer </span> 
        with 10+ years of experience building and evolving backend 
        systems in the Python <Twemoji emoji="python" /> ecosystem.
      </h1>
      <h1 className="mt-5 text-neutral-900 dark:text-neutral-200">
        Over the past several years, my work has focused on developing AI/ML 
        driven systems, where I design and 
        evolve backend services, supporting data pipelines, and explore 
        how intelligent <Twemoji emoji="brain" /> models and agentic architectures 
        <Twemoji emoji="robot" /> can be translated into reliable, production 
        grade platforms - including deployments that span cloud and edge environments.
      </h1>
      
      <h1 className="mt-5 text-neutral-900 dark:text-neutral-200">
        Beyond engineering, I’m curious about how complex systems emerge and 
        adapt-whether in technology, nature, or the universe <Twemoji emoji="ringed-planet" /> 
        itself. Outside of work, I enjoy time in nature{' '}
        <Twemoji emoji="snow-capped-mountain" />, reading{' '}
        <Twemoji emoji="open-book" /> or following my favorite sports like cricket{' '}
        <Twemoji emoji="cricket" />, swimming <Twemoji emoji="man-swimming" />
        &nbsp; and badminton <Twemoji emoji="badminton" />.
        
      </h1>
    </>
  )
}
