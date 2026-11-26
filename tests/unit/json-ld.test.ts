import { describe, expect, it } from 'vitest'
import { SITE_METADATA } from '~/data/site-metadata'
import {
  PERSON_ID,
  WEBSITE_ID,
  absoluteUrl,
  homeGraph,
  noteGraph,
  personNode,
  serializeJsonLd,
  type ArticleSource,
} from '~/utils/json-ld'

type Node = Record<string, unknown>

const NOTE: ArticleSource = {
  title: 'Reading a TLE and Turning It Into a Ground Track',
  heading: 'TLE to Ground Track',
  path: 'notes/tle-to-ground-track',
  date: '2026-09-16T00:00:00.000Z',
  summary: 'What the 69 characters mean.',
  tags: ['Orbital Mechanics', 'Python'],
}

const nodes = (graph: { '@graph': readonly unknown[] }) => graph['@graph'] as Node[]
const byType = (graph: { '@graph': readonly unknown[] }, type: string) =>
  nodes(graph).find((n) => n['@type'] === type) as Node

/** Every string value under a key that names a URL or a node id. */
function urlValues(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => urlValues(v, out))
  else if (value && typeof value === 'object') {
    for (const [key, v] of Object.entries(value)) {
      if (['url', '@id', 'image', 'item'].includes(key) && typeof v === 'string') out.push(v)
      else urlValues(v, out)
    }
  }
  return out
}

describe('JSON-LD', () => {
  describe('home graph', () => {
    const graph = homeGraph()

    it('is a ProfilePage whose main entity is the Person', () => {
      const profile = byType(graph, 'ProfilePage')
      expect(profile.mainEntity).toEqual({ '@id': PERSON_ID })
      expect(byType(graph, 'Person')['@id']).toBe(PERSON_ID)
      expect(byType(graph, 'WebSite')['@id']).toBe(WEBSITE_ID)
    })

    // Relative URLs in structured data are ignored or resolved wrongly.
    it('uses only absolute URLs on the canonical origin', () => {
      const urls = urlValues(graph)
      expect(urls.length).toBeGreaterThan(0)
      for (const url of urls) expect(url.startsWith(SITE_METADATA.siteUrl), url).toBe(true)
    })
  })

  describe('Person', () => {
    const person = personNode()

    // REGRESSION guard: site-metadata used to carry bare https://facebook.com
    // and https://youtube.com placeholders. In sameAs they would assert that
    // this person *is* those sites.
    it('lists only real profile URLs in sameAs', () => {
      expect(person.sameAs.length).toBeGreaterThan(0)
      for (const url of person.sameAs) {
        expect(new URL(url).pathname.replace(/\/$/, ''), `${url} has no profile path`).not.toBe('')
      }
    })

    it('uses the readable job title, not the internal ladder code', () => {
      expect(person.jobTitle).toBe(SITE_METADATA.schemaJobTitle)
      expect(person.jobTitle).not.toBe(SITE_METADATA.jobTitle)
    })
  })

  describe('note graph', () => {
    const graph = noteGraph(NOTE, '/og/notes/tle-to-ground-track.png')
    const article = byType(graph, 'TechArticle')

    it('credits a resolvable author and points the publisher at the Person', () => {
      expect(article.author).toMatchObject({
        '@id': PERSON_ID,
        name: SITE_METADATA.author,
        url: `${SITE_METADATA.siteUrl}/`,
      })
      expect(article.publisher).toEqual({ '@id': PERSON_ID })
    })

    // REGRESSION: the contentlayer-built TechArticle had a relative image.
    it('makes the share-card image absolute', () => {
      expect(article.image).toBe(`${SITE_METADATA.siteUrl}/og/notes/tle-to-ground-track.png`)
    })

    it('falls back to the summary when there is no description, and prefers the description', () => {
      expect(article.description).toBe(NOTE.summary)
      const described = byType(
        noteGraph({ ...NOTE, description: 'Plain statement.' }, '/og/x.png'),
        'TechArticle'
      )
      expect(described.description).toBe('Plain statement.')
    })

    it('uses lastmod for dateModified when present', () => {
      expect(article.dateModified).toBe(NOTE.date)
      const edited = byType(
        noteGraph({ ...NOTE, lastmod: '2026-10-01T00:00:00.000Z' }, '/og/x.png'),
        'TechArticle'
      )
      expect(edited.dateModified).toBe('2026-10-01T00:00:00.000Z')
    })

    it('has a three-level breadcrumb ending at the note', () => {
      const crumbs = byType(graph, 'BreadcrumbList').itemListElement as Node[]
      expect(crumbs.map((c) => c.position)).toEqual([1, 2, 3])
      expect(crumbs.map((c) => c.name)).toEqual(['Home', 'Notes', NOTE.heading])
      expect(crumbs[2].item).toBe(absoluteUrl(NOTE.path))
    })

    it('uses only absolute URLs on the canonical origin', () => {
      for (const url of urlValues(graph)) {
        expect(url.startsWith(SITE_METADATA.siteUrl), url).toBe(true)
      }
    })
  })

  // A title containing "</script>" must not be able to close the tag early.
  it('escapes < when serialising', () => {
    const json = serializeJsonLd(noteGraph({ ...NOTE, title: '</script><b>x' }, '/og/x.png'))
    expect(json).not.toContain('<')
    expect(JSON.parse(json)['@graph'][0].headline).toBe('</script><b>x')
  })
})
