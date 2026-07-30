import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CodeTitle } from '~/components/mdx/code-title'

describe('CodeTitle', () => {
  // 46
  it('renders a brand icon for a mapped language', () => {
    const { container } = render(<CodeTitle lang="ts" title="misc.ts" />)

    expect(screen.getByText('misc.ts')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="svg-mock"]')).not.toBeNull()
  })

  // 47 — REGRESSION: an unmapped language yielded `undefined`, which rendered
  // Brand's hidden "Missing brand icon for undefined" span and left an orphan
  // flex gap in the title bar.
  it('renders no icon and no fallback text for an unmapped language', () => {
    const { container } = render(<CodeTitle lang="py" title="main.py" />)

    expect(screen.getByText('main.py')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="svg-mock"]')).toBeNull()
    expect(container.textContent).not.toMatch(/missing brand icon/i)
  })

  it('prefers the filename mapping over the language mapping', () => {
    const { container } = render(<CodeTitle lang="js" title="package.json" />)

    expect(screen.getByText('package.json')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="svg-mock"]')).not.toBeNull()
  })

  it('always renders a copy button', () => {
    render(<CodeTitle lang="py" title="main.py" />)
    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument()
  })
})
