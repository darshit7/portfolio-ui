import { clsx } from 'clsx'
import { SITE_METADATA } from '~/data/site-metadata'
import { getYearsSince } from '~/utils/misc'

// Restates what SITE_METADATA.headline and Intro already say, in a form that
// survives a ten-second skim. Deliberately not a "skills" list -- these are the
// things the prose below actually claims.
const FOCUS_AREAS = [
  'Python',
  'Backend systems',
  'Agentic systems',
  'AI/ML',
  `${getYearsSince(SITE_METADATA.careerStartDate)}+ years`,
]

export function FocusAreas() {
  return (
    <ul className="flex flex-wrap gap-2">
      {FOCUS_AREAS.map((area) => (
        <li
          key={area}
          className={clsx([
            'rounded-full px-3 py-1 text-sm font-medium',
            'bg-zinc-100 text-zinc-700',
            'dark:bg-white/5 dark:text-zinc-300',
            'ring-1 ring-zinc-200 dark:ring-white/10',
          ])}
        >
          {area}
        </li>
      ))}
    </ul>
  )
}
