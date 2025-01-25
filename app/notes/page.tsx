import { genPageMetadata } from 'app/seo'
import { allNotes } from 'contentlayer/generated'
import { NoteCard } from '~/components/cards/note'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { allCoreContent } from '~/utils/contentlayer'
import { sortPosts } from '~/utils/misc'

export const metadata = genPageMetadata({ title: 'Notes' })

export default function Notes() {
  const notes = allCoreContent(sortPosts(allNotes))

  return (
    <Container className="pt-0 lg:pt-0">
      <PageHeader
        title="Notes"
        description=""
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-10">
        <div className="grid-cols-2 gap-x-6 gap-y-10 space-y-10 md:grid md:space-y-0">
          {notes.map((note) => (
            <NoteCard note={note} key={note.path} />
          ))}
        </div>
      </div>
    </Container>
  )
}
