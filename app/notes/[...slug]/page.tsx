import type { Note } from 'contentlayer/generated'
import { allNotes } from 'contentlayer/generated'
// import 'css/prism.css'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDX_COMPONENTS } from '~/components/mdx'
import { SITE_METADATA } from '~/data/site-metadata'
import { PostSimple } from '~/layouts/post-simple'
import { allCoreContent, coreContent } from '~/utils/contentlayer'
import { MDXLayoutRenderer } from '~/components/mdx/layout-renderer'
import { sortPosts } from '~/utils/misc'

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
  let imageList = [SITE_METADATA.socialBanner]
  if (note.images) {
    imageList = typeof note.images === 'string' ? [note.images] : note.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : SITE_METADATA.siteUrl + img,
    }
  })

  return {
    title: note.title,
    description: note.summary,
    openGraph: {
      title: note.title,
      description: note.summary,
      siteName: SITE_METADATA.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
    },
  }
}

export const generateStaticParams = async () => {
  return allNotes.map((n) => ({ slug: n.slug.split('/').map((name) => decodeURI(name)) }))
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
  const jsonLd = note.structuredData

  const Layout = LAYOUTS[note.layout || DEFAULT_LAYOUT]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} next={next} prev={prev}>
        <MDXLayoutRenderer code={note.body.code} components={MDX_COMPONENTS} toc={note.toc} />
      </Layout>
    </>
  )
}
