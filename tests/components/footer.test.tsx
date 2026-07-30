import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from '~/components/footer'
import { FOOTER_PERSONAL_STUFF, FOOTER_SOCIALS } from '~/data/navigation'

describe('Footer', () => {
  // 32 — REGRESSION: resume.pdf existed on disk but was reachable from nowhere
  // in the UI, because the footer rendered only FOOTER_PERSONAL_STUFF[0].
  it('links to the resume', () => {
    render(<Footer />)

    const resume = screen.getByRole('link', { name: /resume/i })
    expect(resume).toHaveAttribute('href', '/static/resume.pdf')
  })

  // 33 — REGRESSION: the direct cause of the above. Indexing into the array
  // instead of mapping it silently hid every entry after the first.
  it('renders every personal link, not just the first', () => {
    render(<Footer />)

    for (const { title } of FOOTER_PERSONAL_STUFF) {
      expect(
        screen.getByRole('link', { name: new RegExp(title, 'i') }),
        `${title} missing from footer`
      ).toBeInTheDocument()
    }
  })

  // 34 — REGRESSION: icon-only links had no accessible name and failed the
  // "links must have discernible text" rule.
  it('gives every social link an accessible name', () => {
    render(<Footer />)

    for (const { title, href } of FOOTER_SOCIALS) {
      const link = screen.getByRole('link', { name: title })
      expect(link).toHaveAttribute('href', href)
    }
  })

  // 35
  it('shows the current year in the copyright', () => {
    render(<Footer />)
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument()
  })

  it('renders the headline once', () => {
    render(<Footer />)
    expect(screen.getByText(/Backend & Agentic Systems/i)).toBeInTheDocument()
  })
})
