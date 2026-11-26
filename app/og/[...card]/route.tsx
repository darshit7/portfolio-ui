import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { OgCardImage } from '~/components/og/card'
import { SITE_METADATA } from '~/data/site-metadata'
import { OG_SIZE, ogCards, ogKeyFromSegments, ogSegments } from '~/utils/og'

/**
 * Serves every share card at `/og/<key>.png` (see `utils/og.ts`).
 *
 * Prerendered at build for exactly the keys in the registry: `force-static`
 * makes the handler a build-time render, and `dynamicParams = false` turns any
 * other path into a 404 instead of an on-demand render. So the running
 * container never reads the font files below; `outputFileTracingIncludes` in
 * next.config.js still copies them into the standalone output, as a backstop
 * should this ever become dynamic.
 */
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(ogCards()).map((key) => ({ card: ogSegments(key) }))
}

const ROOT = process.cwd()

async function loadAssets() {
  const [regular, extraBold, avatar] = await Promise.all([
    readFile(join(ROOT, 'assets/fonts/Nunito-Regular.ttf')),
    readFile(join(ROOT, 'assets/fonts/Nunito-ExtraBold.ttf')),
    readFile(join(ROOT, 'public/static/images/avatar.jpg')),
  ])
  return {
    fonts: [
      { name: 'Nunito', data: regular, weight: 400 as const, style: 'normal' as const },
      { name: 'Nunito', data: extraBold, weight: 800 as const, style: 'normal' as const },
    ],
    avatarSrc: `data:image/jpeg;base64,${avatar.toString('base64')}`,
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ card: string[] }> }) {
  const { card: segments } = await params
  const key = ogKeyFromSegments(segments)
  const card = key ? ogCards()[key] : undefined
  if (!card) {
    return new Response('Not found', { status: 404 })
  }

  const { fonts, avatarSrc } = await loadAssets()

  return new ImageResponse(
    <OgCardImage
      {...card}
      avatarSrc={avatarSrc}
      author={SITE_METADATA.author}
      host={new URL(SITE_METADATA.siteUrl).host.replace(/^www\./, '')}
    />,
    { ...OG_SIZE, fonts }
  )
}
