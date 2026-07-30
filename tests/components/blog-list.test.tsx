import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BlogListItem } from '~/components/blog'

const item = (over: Partial<{ title: string; date: Date; link: string }> = {}) => ({
  title: 'Exploring Metaprogramming in Python',
  date: new Date('2023-08-04'),
  link: 'https://medium.com/stackademic/exploring-metaprogramming-in-python-x',
  ...over,
})

describe('BlogListItem', () => {
  // 36 — REGRESSION: dates are authored as new Date("YYYY-MM-DD"), i.e. UTC
  // midnight. Formatted in the host zone they rendered a day early for every
  // visitor west of UTC. The suite runs under TZ=America/Los_Angeles, so this
  // assertion is live rather than decorative.
  it('renders the authored date, not the host-local one', () => {
    // getTimezoneOffset() is positive west of UTC. The off-by-one only
    // manifests west of UTC, so an east-of-UTC run (e.g. IST) would pass
    // against the broken code and prove nothing.
    expect(
      new Date().getTimezoneOffset(),
      'suite must run west of UTC for this assertion to be meaningful'
    ).toBeGreaterThan(0)

    render(<BlogListItem blog={item()} />)

    expect(screen.getByText('2023-08-04')).toBeInTheDocument()
    expect(screen.queryByText('2023-08-03')).not.toBeInTheDocument()
  })

  // 37
  it('shows the publication for a Stackademic post', () => {
    render(<BlogListItem blog={item()} />)
    expect(screen.getByText('Stackademic')).toBeInTheDocument()
  })

  // 38 — no badge is better than a wrong one.
  it('shows no publication for an unrecognised host', () => {
    render(<BlogListItem blog={item({ link: 'https://example.com/post' })} />)

    expect(screen.queryByText('Stackademic')).not.toBeInTheDocument()
    expect(screen.queryByText('Medium')).not.toBeInTheDocument()
  })

  // 39 — REGRESSION: data-umami-event={``} emitted a blank attribute that
  // tracked nothing at all.
  it('emits no empty umami event attribute', () => {
    const { container } = render(<BlogListItem blog={item()} />)

    for (const el of container.querySelectorAll('[data-umami-event]')) {
      expect(el.getAttribute('data-umami-event')).not.toBe('')
    }
  })

  it('links out to the article', () => {
    render(<BlogListItem blog={item()} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', item().link)
  })
})
