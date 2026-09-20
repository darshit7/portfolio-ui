import { genPageMetadata } from 'app/seo'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { SATLAB } from '~/data/satlab'

// The page body below is commented out until SatLab is ready to show. These
// imports go back at the top when it is, and they are listed here rather than
// left in place because eslint fails the build on an unused import:
//
//   clsx · Satellite (lucide-react) · NoteCard · Button · GradientBorder
//   GradientDivider · Link · Pill · TiltedGridBackground · SATLAB_URL
//   allNotes (contentlayer/generated) · allCoreContent · sortPosts

export const metadata = genPageMetadata({
  title: 'SatLab',
  description: SATLAB.pitch,
})

export default function SatLabPage() {
  // Restore with the body below:
  // const spaceNotes = allCoreContent(sortPosts(allNotes)).filter((n) => n.category === 'space')

  return (
    <Container>
      {/* description={SATLAB.pitch} */}
      <PageHeader
        title="SatLab"
        description=""
        className="border-b border-gray-200 dark:border-gray-700"
      >
        {/* <ul className="flex flex-wrap items-center gap-2 pt-2">
          {SATLAB.capabilities.map((capability) => (
            <Pill as="li" size="sm" key={capability}>
              {capability}
            </Pill>
          ))}
        </ul> */}
      </PageHeader>

      {/* <div className="space-y-14 py-12">
        <GradientBorder className="rounded-2xl">
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 px-6 py-8 dark:bg-white/5">
            <TiltedGridBackground className="inset-0" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
              <Satellite
                className="h-10 w-10 shrink-0 text-primary-700 dark:text-primary-400"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="space-y-4">
                {SATLAB.why.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-base/7 md:text-lg/8">
                    {paragraph}
                  </p>
                ))}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nothing is deployed yet. When there is something to use, it will live at{' '}
                  <span className="font-mono">{SATLAB_URL.replace('https://', '')}</span> and this
                  page will point at it.
                </p>
              </div>
            </div>
          </div>
        </GradientBorder>

        <section aria-labelledby="roadmap">
          <h2 id="roadmap" className="text-2xl font-bold tracking-tight">
            Roadmap
          </h2>
          <p className="mt-1.5 text-gray-600 dark:text-gray-400">
            In order, and honestly labelled. Only one of these exists today.
          </p>
          <GradientDivider className="mt-6" />
          <ol className="mt-6 space-y-8">
            {SATLAB.roadmap.map(({ phase, title, status, detail }) => (
              <li key={phase} className="flex flex-col gap-2 md:flex-row md:gap-6">
                <div className="shrink-0 md:w-28">
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {phase}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <span
                      className={clsx([
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        status === 'In progress'
                          ? 'text-primary-700 ring-1 ring-primary-700/30 dark:text-primary-400 dark:ring-primary-400/30'
                          : 'text-gray-600 ring-1 ring-gray-200 dark:text-gray-400 dark:ring-white/10',
                      ])}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {spaceNotes.length > 0 && (
          <section aria-labelledby="working-notes">
            <h2 id="working-notes" className="text-2xl font-bold tracking-tight">
              The working notes
            </h2>
            <p className="mt-1.5 text-gray-600 dark:text-gray-400">
              The maths, worked out before it becomes code.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
              {spaceNotes.map((note) => (
                <NoteCard note={note} key={note.path} />
              ))}
            </div>
            <div className="mt-10">
              <Button as={Link} href="/notes#space">
                All Space notes
              </Button>
            </div>
          </section>
        )}
      </div> */}
    </Container>
  )
}
