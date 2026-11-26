import type { BreadcrumbList, Graph, Person, ProfilePage, TechArticle, WebSite } from 'schema-dts'
import { SITE_METADATA } from '~/data/site-metadata'

/**
 * Structured data (schema.org JSON-LD) for search engines.
 *
 * The home page publishes the full entity graph: a ProfilePage whose main
 * entity is a Person, and the WebSite that Person publishes. Every other page
 * points back at those nodes by `@id` rather than restating them, which is how
 * Google ties articles, the profile and the `sameAs` accounts into one entity.
 *
 * Pure functions over SITE_METADATA and plain note fields, so they are unit
 * tested without contentlayer or a render.
 */

const { siteUrl } = SITE_METADATA

export const PERSON_ID = `${siteUrl}/#person`
export const WEBSITE_ID = `${siteUrl}/#website`
const PROFILE_PAGE_ID = `${siteUrl}/#profilepage`

/** Absolute URL on the canonical origin. Already-absolute input passes through. */
export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path
  return `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}`
}

/** The fields the article builder reads; a structural subset of `CoreContent<Note>`. */
export type ArticleSource = {
  title: string
  heading: string
  path: string
  date: string
  lastmod?: string
  summary?: string
  description?: string
  tags?: string[]
}

export function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_METADATA.author,
    givenName: SITE_METADATA.firstName,
    familyName: SITE_METADATA.lastName,
    url: `${siteUrl}/`,
    image: absoluteUrl(SITE_METADATA.siteLogo),
    jobTitle: SITE_METADATA.schemaJobTitle,
    description: SITE_METADATA.description,
    // Profiles that are verifiably the same person. Only real accounts: a
    // placeholder here would assert identity with a stranger's page.
    sameAs: [SITE_METADATA.github, SITE_METADATA.linkedin, SITE_METADATA.x, SITE_METADATA.medium],
    knowsAbout: ['Python', 'Backend systems', 'Agentic AI', 'LLM systems'],
  } satisfies Person
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${siteUrl}/`,
    name: SITE_METADATA.author,
    alternateName: new URL(siteUrl).host.replace(/^www\./, ''),
    description: SITE_METADATA.description,
    inLanguage: SITE_METADATA.locale,
    publisher: { '@id': PERSON_ID },
  } satisfies WebSite
}

/** `/`: the profile, the person and the site, as one graph. */
export function homeGraph(): Graph {
  const profilePage = {
    '@type': 'ProfilePage',
    '@id': PROFILE_PAGE_ID,
    url: `${siteUrl}/`,
    name: SITE_METADATA.title,
    inLanguage: SITE_METADATA.locale,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
  } satisfies ProfilePage

  return {
    '@context': 'https://schema.org',
    '@graph': [profilePage, personNode(), websiteNode()],
  }
}

/** `/notes/<slug>`: the article and its breadcrumb trail. `ogImageUrl` is its share card. */
export function noteGraph(note: ArticleSource, ogImageUrl: string): Graph {
  const url = absoluteUrl(note.path)

  const article = {
    '@type': 'TechArticle',
    '@id': `${url}#article`,
    url,
    headline: note.title,
    description: note.description ?? note.summary,
    datePublished: note.date,
    dateModified: note.lastmod || note.date,
    inLanguage: SITE_METADATA.locale,
    image: absoluteUrl(ogImageUrl),
    keywords: note.tags ?? [],
    // Inline name and url as well as the @id: the Person node itself is only
    // published on the home page, and validators want a resolvable author here.
    author: { '@type': 'Person', '@id': PERSON_ID, name: SITE_METADATA.author, url: `${siteUrl}/` },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  } satisfies TechArticle

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Notes', item: `${siteUrl}/notes` },
      { '@type': 'ListItem', position: 3, name: note.heading, item: url },
    ],
  } satisfies BreadcrumbList

  return {
    '@context': 'https://schema.org',
    '@graph': [article, breadcrumb],
  }
}

/**
 * JSON for a `<script type="application/ld+json">` body. `<` is escaped so a
 * title containing `</script>` cannot close the tag early and inject markup.
 */
export function serializeJsonLd(data: Graph) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
