import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PostSimple } from '~/layouts/post-simple'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const content = { title: 'A Note', date: '2024-01-01' } as any

const older = { path: 'notes/older-note', title: 'An Older Note' }
const newer = { path: 'notes/newer-note', title: 'A Newer Note' }

describe('PostSimple', () => {
  // 48 — REGRESSION: the props were declared and passed by the note route, but
  // never destructured, so the computation was silently discarded on every render.
  it('renders prev and next links when both are supplied', () => {
    render(
      <PostSimple content={content} prev={older} next={newer}>
        <p>body</p>
      </PostSimple>
    )

    expect(screen.getByRole('link', { name: /An Older Note/ })).toHaveAttribute(
      'href',
      '/notes/older-note'
    )
    expect(screen.getByRole('link', { name: /A Newer Note/ })).toHaveAttribute(
      'href',
      '/notes/newer-note'
    )
  })

  // 49 — with a single published note there is nowhere to navigate; the nav
  // must not render empty affordances.
  it('renders no navigation when neither is supplied', () => {
    render(
      <PostSimple content={content}>
        <p>body</p>
      </PostSimple>
    )

    expect(screen.queryByRole('navigation', { name: /note navigation/i })).not.toBeInTheDocument()
  })

  it('renders only the side that is supplied', () => {
    render(
      <PostSimple content={content} prev={older}>
        <p>body</p>
      </PostSimple>
    )

    expect(screen.getByRole('link', { name: /An Older Note/ })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /A Newer Note/ })).not.toBeInTheDocument()
  })

  // 50 — REGRESSION: an empty <dl> held a sr-only "Published on" <dt> with no
  // <dd> and no value, so screen readers announced a label followed by nothing.
  it('renders no empty definition list', () => {
    const { container } = render(
      <PostSimple content={content}>
        <p>body</p>
      </PostSimple>
    )

    expect(container.querySelector('dl')).toBeNull()
    expect(container.textContent).not.toMatch(/published on/i)
  })

  it('renders the title and body', () => {
    render(
      <PostSimple content={content}>
        <p>body</p>
      </PostSimple>
    )

    expect(screen.getByText('A Note')).toBeInTheDocument()
    expect(screen.getByText('body')).toBeInTheDocument()
  })
})
