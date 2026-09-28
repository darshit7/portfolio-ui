import { genPageMetadata } from 'app/seo'
import { allNotes } from 'contentlayer/generated'
import { CategoryRail } from '~/components/notes/category-rail'
import { CategorySection } from '~/components/notes/category-section'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { PillLink } from '~/components/ui/pill'
import { NOTE_CATEGORIES } from '~/data/note-categories'
import { allCoreContent } from '~/utils/contentlayer'
import { sortPosts } from '~/utils/misc'

export const metadata = genPageMetadata({ title: 'Notes' })

/** The rail's "All notes" target, and what the page scrolls back to. */
const TOP_ID = 'all-notes'

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
      <PageHeader title="Notes" className="border-b border-gray-200 dark:border-gray-700">
        {/* Anchors, not filters: jumping to a section keeps the page static,
            where a ?category= query would make it the second dynamic route.
            The whole row stands down at `lg`, where the rail carries the same
            links and a second copy would only say it twice. */}
        <ul className="flex flex-wrap items-center gap-2 pt-2 lg:hidden">
          {sections.map(({ slug, label, notes: sectionNotes }) => (
            <li key={slug}>
              <PillLink href={`#${slug}`} size="sm">
                {label}
                <span className="text-gray-500 dark:text-gray-400">{sectionNotes.length}</span>
              </PillLink>
            </li>
          ))}
        </ul>
      </PageHeader>
      <div
        id={TOP_ID}
        className="scroll-mt-24 py-8 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-12"
      >
        <CategoryRail
          topId={TOP_ID}
          total={notes.length}
          sections={sections.map(({ slug, label, notes: sectionNotes }) => ({
            slug,
            label,
            count: sectionNotes.length,
          }))}
        />
        {/* space-y rather than a gap: sections are separated by their own
            sticky headings, so they only need air between the last row of one
            and the heading of the next. */}
        <div className="space-y-10">
          {sections.map((section) => (
            <CategorySection key={section.slug} {...section} />
          ))}
        </div>
      </div>
    </Container>
  )
}
