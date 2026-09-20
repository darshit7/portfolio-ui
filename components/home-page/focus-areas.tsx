import { Pill } from '~/components/ui/pill'
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
        <Pill as="li" key={area}>
          {area}
        </Pill>
      ))}
    </ul>
  )
}
