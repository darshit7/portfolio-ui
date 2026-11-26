import type { OgCard } from '~/utils/og'

/**
 * The share-card template, rendered by Satori through `next/og`.
 *
 * Satori is not a browser: no Tailwind, no stylesheets, no grid layout. Every
 * box is inline-styled flexbox, and any element with more than one child needs
 * an explicit `display: flex`. Colours are hard-coded from the site's palette
 * (`dark` #1f1f1f, Tailwind emerald for `primary`) because the card is always
 * dark: previews sit on light and dark feeds alike, and a dark card holds
 * contrast on both.
 *
 * No emoji. Satori would fetch them from a CDN at build time, which would make
 * the build depend on the network.
 */

const COLORS = {
  background: '#1f1f1f',
  grid: 'rgba(255, 255, 255, 0.045)',
  accent: '#34d399', // emerald-400
  accentDeep: '#059669', // emerald-600
  title: '#f9fafb', // gray-50
  subtitle: '#d1d5db', // gray-300
  muted: '#9ca3af', // gray-400
}

const MAX_TITLE_CHARS = 110

function fitTitle(title: string) {
  const text = title.length > MAX_TITLE_CHARS ? `${title.slice(0, MAX_TITLE_CHARS - 1)}…` : title
  // Step the size down as the title grows so it stays within about three lines.
  const fontSize = text.length <= 32 ? 80 : text.length <= 60 ? 64 : 54
  return { text, fontSize }
}

export function OgCardImage({
  eyebrow,
  title,
  subtitle,
  avatarSrc,
  author,
  host,
}: OgCard & { avatarSrc: string; author: string; host: string }) {
  const { text, fontSize } = fitTitle(title)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: COLORS.background,
        backgroundImage: `linear-gradient(to right, ${COLORS.grid} 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.grid} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        fontFamily: 'Nunito',
        position: 'relative',
      }}
    >
      {/* The accent rule down the left edge: the one brand mark on the card. */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 14,
          backgroundImage: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.accentDeep})`,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: COLORS.accent,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize,
            fontWeight: 800,
            lineHeight: 1.12,
            color: COLORS.title,
            maxWidth: 1000,
          }}
        >
          {text}
        </div>
        {subtitle && (
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 34,
              fontWeight: 400,
              lineHeight: 1.3,
              color: COLORS.subtitle,
              maxWidth: 1000,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img>, not next/image */}
        <img
          src={avatarSrc}
          width={88}
          height={88}
          alt=""
          style={{ borderRadius: 44, border: `3px solid ${COLORS.accent}` }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 24 }}>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 800, color: COLORS.title }}>
            {author}
          </div>
          <div style={{ display: 'flex', fontSize: 26, fontWeight: 400, color: COLORS.muted }}>
            {host}
          </div>
        </div>
      </div>
    </div>
  )
}
