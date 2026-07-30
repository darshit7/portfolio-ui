import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FocusAreas } from '~/components/home-page/focus-areas'
import { SITE_METADATA } from '~/data/site-metadata'
import { getYearsSince } from '~/utils/misc'

describe('FocusAreas', () => {
  // 52 — guards the derived copy against drifting back to a hardcoded string.
  it('shows the years derived from careerStartDate', () => {
    render(<FocusAreas />)

    const years = getYearsSince(SITE_METADATA.careerStartDate)
    expect(screen.getByText(`${years}+ years`)).toBeInTheDocument()
  })

  it('leads with the focus areas the headline claims', () => {
    render(<FocusAreas />)

    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('Backend systems')).toBeInTheDocument()
    expect(screen.getByText('Agentic systems')).toBeInTheDocument()
  })

  it('renders no stale hardcoded year count', () => {
    const { container } = render(<FocusAreas />)
    expect(container.textContent).not.toContain('10+ years')
  })
})
