import type { Note } from 'contentlayer/generated'
import { allNotes } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDX_COMPONENTS } from '~/components/mdx'
import { JsonLd } from '~/components/seo/json-ld'
import { SITE_METADATA } from '~/data/site-metadata'
import { PostSimple } from '~/layouts/post-simple'
import { allCoreContent, coreContent } from '~/utils/contentlayer'
import { noteGraph } from '~/utils/json-ld'
import { MDXLayoutRenderer } from '~/components/mdx/layout-renderer'
import { sortPosts } from '~/utils/misc'
import { noteOgKey, ogImage } from '~/utils/og'

const DEFAULT_LAYOUT = 'PostSimple'
const LAYOUTS = {
  PostSimple,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const note = allNotes.find((n) => n.slug === slug)
  if (!note) {
    return
  }

  const publishedAt = new Date(note.date).toISOString()
  const modifiedAt = new Date(note.lastmod || note.date).toISOString()
  const description = note.description ?? note.summary

  // No `alternates` or `twitter` here: both are inherited from the root layout,
  // and setting `alternates` would drop the per-page canonical (see app/seo.tsx).
  return {
    title: note.title,
    description,
    authors: [{ name: SITE_METADATA.author, url: SITE_METADATA.siteUrl }],
    openGraph: {
      title: note.title,
      description,
      siteName: SITE_METADATA.author,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      authors: [SITE_METADATA.author],
      tags: note.tags,
      url: './',
      images: noteOgImages(note),
    },
  }
}

/**
 * Frontmatter `images` win when a note sets them; otherwise the note's
 * generated card. Either way the result is never empty, because an
 * `openGraph` without `images` would replace the root's card with nothing.
 */
function noteOgImages(note: Note) {
  if (note.images) {
    const list: string[] = typeof note.images === 'string' ? [note.images] : note.images
    return list.map((img) => ({ url: img.includes('http') ? img : SITE_METADATA.siteUrl + img }))
  }
  return [ogImage(noteOgKey(note.slug))]
}

export const generateStaticParams = async () => {
  // Must use the same filtered list the page does. Generating params from raw
  // `allNotes` prerenders a path for every draft, which then 404s at the
  // findIndex below -- harmless with no drafts, visible as soon as there is one.
  return allCoreContent(sortPosts(allNotes)).map((n) => ({
    slug: n.slug.split('/').map((name) => decodeURI(name)),
  }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allNotes))
  const snippetIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (snippetIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[snippetIndex + 1]
  const next = sortedCoreContents[snippetIndex - 1]
  const note = allNotes.find((p) => p.slug === slug) as Note
  const mainContent = coreContent(note)
  const jsonLd = noteGraph(note, noteOgImages(note)[0].url)

  const Layout = LAYOUTS[(note.layout ?? DEFAULT_LAYOUT) as keyof typeof LAYOUTS]

  return (
    <>
      <JsonLd data={jsonLd} />
      <Layout content={mainContent} next={next} prev={prev}>
        <MDXLayoutRenderer code={note.body.code} components={MDX_COMPONENTS} toc={note.toc} />
      </Layout>
    </>
  )
}
