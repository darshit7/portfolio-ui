import '~/css/tailwind.css'
import '~/css/twemoji.css'
import 'react-medium-image-zoom/dist/styles.css'
import 'remark-github-blockquote-alert/alert.css'

import clsx from 'clsx'
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Nunito, Playpen_Sans } from 'next/font/google'
import { UmamiAnalytics } from '~/components/analytics/umami'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { KBarSearchProvider } from '~/components/search/kbar-provider'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'
import { SITE_METADATA } from '~/data/site-metadata'
import { ogImage } from '~/utils/og'
import { ThemeProviders } from './theme-providers'

const FONT_PLAYPEN_SANS = Playpen_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['800'],
  variable: '--font-playpen-sans',
})

const FONT_NUNITO = Nunito({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
})

const FONT_JETBRAINS_MONO = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const BASE_PATH = process.env.BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.title,
    // The name, not the tagline: "Notes | Darshit Patoliya" is short enough to
    // survive truncation in search results and leads with the branded term.
    template: `%s | ${SITE_METADATA.author}`,
  },
  description: SITE_METADATA.description,
  applicationName: SITE_METADATA.author,
  authors: [{ name: SITE_METADATA.author, url: SITE_METADATA.siteUrl }],
  creator: SITE_METADATA.author,
  // Inherited by every page, which is why pages must never set `alternates`
  // themselves (app/seo.tsx). `'./'` resolves against metadataBase and the
  // current pathname, so each page declares its own www URL as canonical.
  alternates: {
    canonical: './',
    types: { 'application/rss+xml': `${BASE_PATH}/feed.xml` },
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: './',
    siteName: SITE_METADATA.author,
    images: [ogImage('site')],
    locale: 'en_US',
    type: 'website',
  },
  // No images: twitter falls back to openGraph.images, page by page.
  twitter: {
    card: 'summary_large_image',
    site: SITE_METADATA.xHandle,
    creator: SITE_METADATA.xHandle,
  },
  icons: {
    icon: [
      { url: `${BASE_PATH}/static/favicons/favicon_32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${BASE_PATH}/static/favicons/favicon_16.png`, sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: `${BASE_PATH}/static/favicons/apple-touch-icon.png`, sizes: '180x180' }],
  },
  manifest: `${BASE_PATH}/static/favicons/site.webmanifest`,
  other: { 'msapplication-TileColor': '#000000' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={SITE_METADATA.language}
      data-scroll-behavior="smooth"
      className={clsx(
        'scroll-smooth',
        FONT_NUNITO.variable,
        FONT_JETBRAINS_MONO.variable,
        FONT_PLAYPEN_SANS.variable
      )}
      suppressHydrationWarning
    >
      <body
        className={clsx([
          'antialiased',
          'relative min-h-screen pl-[calc(100vw-100%)]',
          'flex flex-col',
          'bg-white text-gray-900',
          'dark:bg-dark dark:text-gray-100',
        ])}
      >
        <TiltedGridBackground className="inset-x-0 top-0 z-[-1] h-[50vh]" />
        <ThemeProviders>
          <UmamiAnalytics websiteId={SITE_METADATA.analytics.umamiAnalytics.websiteId} />
          <KBarSearchProvider configs={SITE_METADATA.search.kbarConfigs}>
            <Header />
            <main className="mb-auto grow">{children}</main>
          </KBarSearchProvider>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  )
}
