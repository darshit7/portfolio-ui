import { clsx } from 'clsx'
import { Brand, BrandsMap } from '~/components/ui/brand'
import { CopyCodeButton } from './copy-code-button'

export const LANGS_MAP: Record<string, keyof typeof BrandsMap> = {
  js: 'Javascript',
  jsx: 'React',
  ts: 'Typescript',
  tsx: 'React',
  css: 'CSS',
  html: 'Html',
  json: 'Javascript',
  md: 'Markdown',
  mdx: 'Markdown',
  liquid: 'Liquid',
  bash: 'Bash',
  java: 'Java',
}

export const FILE_NAME_MAP: Record<string, keyof typeof BrandsMap> = {
  '.env': 'Env',
  'tailwind.config.js': 'TailwindCSS',
  'postcss.config.js': 'Postcss',
  'package.json': 'Npm',
  '.gitignore': 'Git',
  'commitlint.config.js': 'Commitlint',
}

export function CodeTitle({ lang, title }: { lang: string; title: string }) {
  // Unmapped languages (py, go, rust, sql, ...) have no brand icon. Skip the
  // element entirely rather than rendering Brand's hidden fallback span, which
  // still consumed a flex gap.
  const brand = FILE_NAME_MAP[title] || LANGS_MAP[lang]

  return (
    <div
      className={clsx([
        'remark-code-title',
        'flex items-center gap-2.5 px-4 py-1 lg:py-2',
        'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300',
        'rounded-t-lg border border-gray-100 dark:border-gray-700',
      ])}
    >
      {brand && <Brand name={brand} as="icon" className="h-5 w-5 rounded" />}
      <span className="font-mono text-sm font-medium">{title}</span>
      <CopyCodeButton
        parent="code-title"
        className="-mr-2 ml-auto bg-transparent dark:bg-transparent"
      />
    </div>
  )
}
