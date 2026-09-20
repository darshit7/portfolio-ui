const { withContentlayer } = require('next-contentlayer2')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * Builds the CSP. You might need to insert additional domains in script-src if
 * you are using external services.
 *
 * `'unsafe-inline'` is kept for the next-themes FOUC-prevention inline script.
 *
 * `'unsafe-eval'` is intentionally absent from the shipped policy — it defeats
 * XSS protection — but React's *development* build calls eval() for debugging
 * features (owner stacks, rebuilding callstacks from another environment), and
 * refuses to boot without it. Production React never calls eval, so allowing it
 * for `next dev` only costs nothing: the deployed header is byte-for-byte what
 * it was before.
 *
 * Keyed off the Next phase rather than NODE_ENV, which any shell can set.
 */
function contentSecurityPolicy(isDev) {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    isDev && "'unsafe-eval'",
    // @vercel/analytics pulls its debug build from this host in development.
    // In production it loads /_vercel/insights/script.js, which the Vercel edge
    // serves same-origin, so 'self' already covers the deployed case.
    isDev && 'va.vercel-scripts.com',
    'analytics.umami.is',
    'cloud.umami.is',
    '*.umami.is',
  ]
    .filter(Boolean)
    .join(' ')

  return `
default-src 'self';
script-src ${scriptSrc};
style-src 'self' 'unsafe-inline';
img-src 'self' blob: data: https:;
media-src *;
connect-src *;
font-src 'self';
frame-src *.github.io
`
}

function securityHeaders(isDev) {
  return [
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    {
      key: 'Content-Security-Policy',
      value: contentSecurityPolicy(isDev).replace(/\n/g, ''),
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains',
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()',
    },
  ]
}

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    output,
    basePath,
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      qualities: [100, 75],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.gr-assets.com', // Goodreads book covers
        },
        {
          protocol: 'https',
          hostname: 'i.scdn.co', // Spotify album covers
        },
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com', // IMDB movie posters
        },
      ],
      unoptimized,
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders(isDev),
        },
      ]
    },
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'prefixIds',
                    params: {
                      delim: '__',
                      prefixIds: true,
                      prefixClassNames: true,
                    },
                  },
                ],
              },
            },
          },
        ],
      })

      return config
    },
  })
}
