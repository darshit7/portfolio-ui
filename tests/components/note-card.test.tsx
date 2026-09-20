import { render, screen } from '@testing-library/react'
import type { Note } from 'contentlayer/generated'
import { describe, expect, it } from 'vitest'
import { NoteCard } from '~/components/cards/note'
import type { CoreContent } from '~/types/data'

const note = (over: Partial<CoreContent<Note>> = {}): CoreContent<Note> =>
  ({
    heading: 'Orbital Elements',
    title: 'The Six Keplerian Elements',
    summary: 'What each element controls.',
    path: 'notes/orbital-elements-primer',
    category: 'space',
    tags: ['Space'],
    date: '2026-09-14T00:00:00.000Z',
    readingTime: { text: '7 min read', minutes: 7, time: 420000, words: 1400 },
    toc: [],
    ...over,
  }) as CoreContent<Note>

describe('NoteCard', () => {
  it('renders the heading, summary and category', () => {
    render(<NoteCard note={note()} />)

    expect(screen.getByText('Orbital Elements')).toBeInTheDocument()
    expect(screen.getByText('What each element controls.')).toBeInTheDocument()
    expect(screen.getByText('Space')).toBeInTheDocument()
  })

  it('links to the note by its contentlayer path', () => {
    render(<NoteCard note={note()} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/notes/orbital-elements-primer')
  })

  // `date` and `readingTime` were both available on every note from the start
  // and neither was rendered -- readingTime was computed and discarded outright.
  it('renders the authored date in UTC, not the host zone', () => {
    // The suite runs under TZ=America/Los_Angeles. Formatting UTC midnight in
    // the host zone would render 13 Sep.
    expect(new Date().getTimezoneOffset()).toBeGreaterThan(0)

    render(<NoteCard note={note()} />)

    expect(screen.getByText('Sep 14, 2026')).toBeInTheDocument()
    expect(screen.queryByText('Sep 13, 2026')).not.toBeInTheDocument()
  })

  it('renders the reading time', () => {
    render(<NoteCard note={note()} />)
    expect(screen.getByText('7 min read')).toBeInTheDocument()
  })

  // REGRESSION GUARD: `icon` became optional when notes stopped being only
  // about software. Before NoteIcon, an absent or unregistered icon rendered
  // Brand's hidden fallback span -- a card with a blank corner and no error.
  it('falls back to the category glyph when the note names no icon', () => {
    const { container } = render(<NoteCard note={note()} />)

    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText(/missing brand icon/i)).not.toBeInTheDocument()
  })

  it('renders a registered brand icon when the note names one', () => {
    const { container } = render(<NoteCard note={note({ icon: 'Vim', category: 'engineering' })} />)

    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText(/missing brand icon/i)).not.toBeInTheDocument()
  })

  it('omits the summary paragraph when there is no summary', () => {
    const { container } = render(<NoteCard note={note({ summary: undefined })} />)
    expect(container.querySelector('p')).toBeNull()
  })

  it('survives a note with no reading time', () => {
    render(<NoteCard note={note({ readingTime: undefined })} />)

    expect(screen.getByText('Orbital Elements')).toBeInTheDocument()
    expect(screen.queryByText(/min read/)).not.toBeInTheDocument()
  })
})
