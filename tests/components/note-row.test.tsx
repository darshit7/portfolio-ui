import { render, screen } from '@testing-library/react'
import type { Note } from 'contentlayer/generated'
import { describe, expect, it } from 'vitest'
import { NoteRow } from '~/components/notes/note-row'
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

describe('NoteRow', () => {
  it('renders the heading, summary and date on one row', () => {
    render(<NoteRow note={note()} />)

    expect(screen.getByText('Orbital Elements')).toBeInTheDocument()
    expect(screen.getByText(/What each element controls\./)).toBeInTheDocument()
    expect(screen.getByText('Sep 14, 2026')).toBeInTheDocument()
  })

  it('links to the note by its contentlayer path', () => {
    render(<NoteRow note={note()} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/notes/orbital-elements-primer')
  })

  // Same guard as NoteCard: formatDate is pinned to UTC because dates are
  // authored as UTC midnight and render a day early west of it otherwise.
  it('renders the authored date in UTC, not the host zone', () => {
    expect(new Date().getTimezoneOffset()).toBeGreaterThan(0)

    render(<NoteRow note={note()} />)

    expect(screen.getByText('Sep 14, 2026')).toBeInTheDocument()
    expect(screen.queryByText('Sep 13, 2026')).not.toBeInTheDocument()
  })

  // REGRESSION GUARD: the row is one line by construction -- the summary shares
  // the heading's truncating span rather than sitting in a block of its own.
  // A summary that wrapped to its own line would make row height depend on
  // frontmatter length, which is exactly what the card grid did wrong.
  it('keeps the summary inside the heading line, not in a block of its own', () => {
    const { container } = render(<NoteRow note={note()} />)

    expect(container.querySelector('p')).toBeNull()
    const line = container.querySelector('.truncate')
    expect(line).not.toBeNull()
    expect(line).toHaveTextContent('Orbital Elements')
    expect(line).toHaveTextContent('What each element controls.')
  })

  it('renders without a summary', () => {
    render(<NoteRow note={note({ summary: undefined })} />)

    expect(screen.getByText('Orbital Elements')).toBeInTheDocument()
    expect(screen.queryByText(/What each element controls\./)).not.toBeInTheDocument()
  })

  it('falls back to the category glyph when the note names no icon', () => {
    const { container } = render(<NoteRow note={note()} />)

    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText(/missing brand icon/i)).not.toBeInTheDocument()
  })

  it('renders a registered brand icon when the note names one', () => {
    const { container } = render(<NoteRow note={note({ icon: 'Vim', category: 'engineering' })} />)

    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText(/missing brand icon/i)).not.toBeInTheDocument()
  })

  // REGRESSION GUARD: reading time was dropped from every note surface. The
  // contentlayer field is still computed, so nothing stops it being piped back
  // into a row by accident.
  it('never renders a reading time', () => {
    render(<NoteRow note={note()} />)
    expect(screen.queryByText(/min read/)).not.toBeInTheDocument()
  })
})
