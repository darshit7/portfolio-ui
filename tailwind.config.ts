// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        // The profile card's lift. Two variants because the light card floats off
        // a white page, while the dark card is a stepped emerald stack.
        card: 'rgba(0, 0, 0, 0.3) 0 35px 60px -15px',
        'card-stack': `5px 5px rgba(5, 150, 105, 0.4),
                       10px 10px rgba(5, 150, 105, 0.3),
                       15px 15px rgba(5, 150, 105, 0.2),
                       20px 20px rgba(5, 150, 105, 0.1),
                       25px 25px rgba(5, 150, 105, 0.05)`,
      },
      fontFamily: {
        sans: ['var(--font-nunito)', ...fontFamily.sans],
        greeting: ['var(--font-playpen-sans)'],
        mono: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
      },
      colors: {
        // The single accent. Everything that wants to look "active" -- links,
        // underlines, focus rings, buttons, inline code -- reads from here.
        primary: colors.emerald,
        dark: '#1f1f1f',
        // Code-block surfaces, paired with the Shiki themes in contentlayer.config.ts.
        'solarized-light': '#fdfaf6',
        'github-dark-dimmed': '#22272e',
        'code-block': '#36313d',
      },
      width: {
        4.5: '1.125rem',
      },
      height: {
        4.5: '1.125rem',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            a: {
              // 700 rather than 500: emerald needs the darker step to clear
              // WCAG AA (5.48:1) against a white page.
              color: theme('colors.primary.700'),
              'text-underline-offset': '4px',
              '&:hover': {
                color: `${theme('colors.primary.800')}`,
              },
              code: { color: theme('colors.primary.700') },
            },
            'h1,h2,h3,h4,h5,h6': {
              scrollMarginTop: '6rem',
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            '.remark-code-title': {
              '+ figure': {
                '> div': {
                  borderTop: 0,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                },
                '.copy-code': {
                  display: 'none',
                },
              },
            },
            figure: {
              marginTop: 0,
            },
            pre: {
              margin: 0,
              code: {
                fontWeight: '500',
                span: {
                  color: 'var(--shiki-light, inherit)',
                  fontStyle: 'var(--shiki-light-font-style, inherit)',
                  fontWeight: 'var(--shiki-light-font-weight, inherit)',
                  textDecoration: 'var(--shiki-light-text-decoration, inherit)',
                },
              },
            },
            '[data-line]': {
              marginLeft: '-1.5rem',
              paddingLeft: '1rem',
            },
            '[data-line-numbers]': {
              counterReset: 'line',
              '[data-line]::before': {
                counterIncrement: 'line',
                content: 'counter(line)',
                display: 'inline-block',
                width: '0.75rem',
                marginRight: '2rem',
                textAlign: 'right',
                color: '#657B83',
              },
            },
            '[data-line-numbers-max-digits="2"]': {
              '[data-line]::before': {
                width: '1.25rem',
              },
            },
            '[data-line-numbers-max-digits="3"]': {
              '[data-line]::before': {
                width: '1.75rem',
              },
            },
            '[data-line-numbers-max-digits="4"]': {
              '[data-line]::before': {
                width: '2.25rem',
              },
            },
            // Warm tint, chosen to sit on the warm `solarized-light` code surface.
            '[data-highlighted-line]': {
              backgroundColor: '#fbf0ea',
              borderLeft: '4px solid theme(colors.gray.400)',
              paddingLeft: '.75rem',
            },
            '[data-highlighted-chars]': {
              boxShadow: '0 0 0 4px rgb(82 82 91 / 0.5)',
              borderRadius: '0.25rem',
              backgroundColor: 'theme(colors.zinc.600)',
            },
            '[data-chars-id]': {
              boxShadow: 'none',
              padding: '.25rem',
              borderBottom: '2px solid theme(colors.gray.800)',
            },
            code: {
              color: theme('colors.primary.700'),
              fontWeight: '500',
            },
            // @tailwindcss/typography decorates every inline <code> with
            // literal backticks via ::before/::after. The accent colour and the
            // mono face already mark it as code, so the quotes are noise -- and
            // they land inside the text, so "`a`" reads as part of the prose.
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            '.image-container': {
              width: 'fit-content',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '0.5rem',
              img: {
                marginTop: 0,
                marginBottom: 0,
              },
            },
            '.markdown-alert': {
              'p.markdown-alert-title': {
                fontSize: '1.125rem',
                fontWeight: '700',
                marginBottom: '0',
                marginTop: '0.5rem',
                svg: {
                  width: '20px',
                  height: '20px',
                },
              },
            },
          },
        },
        lg: {
          css: {
            figure: {
              marginTop: 0,
            },
            pre: {
              margin: 0,
              borderRadius: 0,
              code: {
                fontSize: '0.95em',
              },
            },
          },
        },
        invert: {
          css: {
            a: {
              // 400 on the dark page: 8.57:1, the mirror of 700-on-white.
              color: theme('colors.primary.400'),
              '&:hover': {
                color: `${theme('colors.primary.300')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            pre: {
              code: {
                span: {
                  color: 'var(--shiki-dark, inherit)',
                  fontStyle: 'var(--shiki-dark-font-style, inherit)',
                  fontWeight: 'var(--shiki-dark-font-weight, inherit)',
                  textDecoration: 'var(--shiki-dark-text-decoration, inherit)',
                },
              },
            },
            '[data-highlighted-line]': {
              backgroundColor: '#37415180',
              borderLeft: '4px solid theme(colors.gray.500)',
              paddingLeft: '.75rem',
            },
            code: {
              color: theme('colors.primary.400'),
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
