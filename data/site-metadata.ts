export const SITE_METADATA = {
  title: `Darshit's blog – stories, insights, and ideas`,
  firstName: 'Darshit',
  lastName: 'Patoliya',
  author: 'Darshit Patoliya',
  headerTitle: `Darshit's blog`,
  headline: 'A full-stack (backend heavy) developer',
  jobTitle: 'SDE - III',
  organization: 'Morgan Stanley',
  city: 'Bengaluru',
  cityWiki: '',
  description:
    'A personal space on the cloud where I document my programming journey, sharing lessons, insights, and resources for fellow developers.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.darshitp.dev',
  siteRepo: 'https://github.com/darshit7/portfolio-ui',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/avatar.jpg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/projects/darshit-blog.png`,
  email: 'darshit7@gmail.com',
  github: 'https://github.com/darshit7',
  x: 'https://twitter.com/_imdp__',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/in/darshit7',
  instagram: 'https://www.instagram.com/_imdp__',
  locale: 'en-US',
  stickyNav: true,
  goodreadsBookshelfUrl: '',
  goodreadsFeedUrl: '',
  analytics: {
    umamiAnalytics: {
      websiteId: process.env.NEXT_UMAMI_ID,
      shareUrl: 'https://cloud.umami.is/share/bYqBWfwSKIuAquap/darshitp.dev',
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
