import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import NotFound from '~/app/not-found'

describe('NotFound', () => {
  // 40 — REGRESSION: <Link><Button/></Link> emitted <a href="/"><button></button></a>.
  // Interactive content nested in an anchor is invalid HTML: the parser's
  // behaviour is inconsistent, screen readers announce a nested control, and
  // Enter on the inner button did nothing.
  it('nests no button inside a link', () => {
    const { container } = render(<NotFound />)

    expect(container.querySelector('a button')).toBeNull()
    expect(container.querySelector('button a')).toBeNull()
  })

  // 41 — the same defect from the user's side: one action, one tab stop.
  it('exposes the homepage CTA as a single focusable element', () => {
    render(<NotFound />)

    const cta = screen.getByRole('link', { name: /back to homepage/i })
    expect(cta).toHaveAttribute('href', '/')
    expect(cta.querySelector('button')).toBeNull()
  })

  it('renders the not-found message', () => {
    render(<NotFound />)
    expect(screen.getByText(/it looks like you.re lost/i)).toBeInTheDocument()
  })
})
