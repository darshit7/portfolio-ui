export const SITE_METADATA = {
  title: 'Darshit Patoliya – Python Backend & Agentic AI',
  firstName: 'Darshit',
  lastName: 'Patoliya',
  author: 'Darshit Patoliya',
  headerTitle: 'Darshit Patoliya',
  headline: 'Senior Software Engineer · Python Backend & Agentic AI',
  jobTitle: 'SDE - III',
  // The JSON-LD Person's jobTitle. Search engines and readers outside the
  // company can't map an internal ladder code like `jobTitle` above.
  schemaJobTitle: 'Senior Software Engineer',
  // Drives the "N+ years" copy on the home page so it never goes stale.
  careerStartDate: '2015-07-01',
  organization: 'Morgan Stanley',
  city: 'Bengaluru',
  cityWiki: '',
  description:
    'Senior software engineer building Python backends and agentic AI systems. Notes on Python, AI agents, concurrency and orbital mechanics.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.darshitp.dev',
  siteRepo: 'https://github.com/darshit7/portfolio-ui',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/avatar.jpg`,
  // Must point at a file that exists in public/ — this is the og:image fallback
  // for every page (app/layout.tsx, app/seo.tsx, app/notes/[...slug]/page.tsx).
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/avatar.jpg`,
  email: 'darshit7@gmail.com',
  github: 'https://github.com/darshit7',
  x: 'https://x.com/_imdp__',
  xHandle: '@_imdp__',
  medium: 'https://medium.com/@darshit7',
  linkedin: 'https://www.linkedin.com/in/darshit7',
  instagram: 'https://www.instagram.com/_imdp__',
  locale: 'en-US',
  stickyNav: true,
  goodreadsBookshelfUrl: '',
  goodreadsFeedUrl: '',
  analytics: {
    umamiAnalytics: {
      websiteId: (() => {
        const id = process.env.NEXT_UMAMI_ID
        if (!id && process.env.NODE_ENV === 'production') {
          console.warn(
            '[site-metadata] NEXT_UMAMI_ID is not set; Umami analytics will be disabled.'
          )
        }
        return id
      })(),
      shareUrl: 'https://cloud.umami.is/share/31Vdik5R0u8gWpSx/darshitp.dev',
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
  support: {
    buyMeACoffee: '',
    paypal: '',
    kofi: '',
  },
}
