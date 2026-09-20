import { genPageMetadata } from 'app/seo'
import { allNotes } from 'contentlayer/generated'
import { CategorySection } from '~/components/notes/category-section'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { Pill, PillLink } from '~/components/ui/pill'
import { NOTE_CATEGORIES } from '~/data/note-categories'
import { allCoreContent } from '~/utils/contentlayer'
import { sortPosts } from '~/utils/misc'

export const metadata = genPageMetadata({ title: 'Notes' })

export default function Notes() {
  const notes = allCoreContent(sortPosts(allNotes))

  // Registry order, not note order: the sections are a table of contents for
  // the notebook, so they stay put as content is added. Empty ones drop out
  // entirely rather than rendering a heading over nothing.
  const sections = NOTE_CATEGORIES.map((category) => ({
    ...category,
    notes: notes.filter((note) => note.category === category.slug),
  })).filter((section) => section.notes.length > 0)

  return (
    <Container>
      <PageHeader
        title="Notes"
        description="My working notebook. Configs and cheatsheets, prompts I reuse, books I am reading."
        className="border-b border-gray-200 dark:border-gray-700"
      >
        {/* Anchors, not filters: jumping to a section keeps the page static,
            where a ?category= query would make it the second dynamic route. */}
        <ul className="flex flex-wrap items-center gap-2 pt-2">
          <li>
            <Pill size="sm">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </Pill>
          </li>
          {sections.map(({ slug, label, notes: sectionNotes }) => (
            <li key={slug}>
              <PillLink href={`/notes#${slug}`} size="sm">
                {label}
                <span className="text-gray-500 dark:text-gray-400">{sectionNotes.length}</span>
              </PillLink>
            </li>
          ))}
        </ul>
      </PageHeader>
      <div className="space-y-16 py-12">
        {sections.map((section) => (
          <CategorySection key={section.slug} {...section} />
        ))}
      </div>
    </Container>
  )
}
