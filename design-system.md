# Design System — "Warm Notebook"

> The site's own direction. A handwritten greeting over rounded sans, a single emerald accent, paper-soft cards on a tilted-grid ground.

The rule that produced it: **one accent, one grey family, one shape language.** Everything that wants to look active is emerald; everything neutral is Tailwind `gray`; everything containing something is rounded. Personality comes from the handwritten display face and the Twemoji, not from adding colors.

---

## 1. Direction

- **Default theme:** system (`SITE_METADATA.theme`), with an explicit light/dark/system switcher in the header.
- **Personality:** Warm, personal, unpretentious. A developer's notebook rather than a product page — it greets you in handwriting, then gets out of the way and lets the prose run.
- **One accent rule:** hierarchy comes from type weight, spacing, and the single emerald accent. The only sanctioned second colors are the far ends of the greeting gradient — `amber-600` on light, `lime-500` on dark. Both are display-only and never appear in UI.
- **Voice:** first person, emoji-punctuated. `Hello, folks! 👋` is the brand moment; the rest of the page is quiet by comparison.

## 2. Typography

| Role                         | Face                            | Weights           | Tailwind              |
| ---------------------------- | ------------------------------- | ----------------- | --------------------- |
| Display (the greeting, only) | "Playpen Sans"                  | 800               | `font-greeting`       |
| Body / UI                    | "Nunito", system-ui, sans-serif | 400–800, + italic | `font-sans` (default) |
| Code / mono                  | "JetBrains Mono", ui-monospace  | 400–600, + italic | `font-mono`           |

All three load through `next/font/google` in `app/layout.tsx` as CSS variables (`--font-playpen-sans`, `--font-nunito`, `--font-jetbrains-mono`). next/font downloads them at build time and self-hosts, so there is no runtime request to Google; `display: 'swap'` keeps the text visible while they load, and next/font's automatic fallback-metric adjustment is what stops the swap from shifting layout.

**Playpen Sans is rationed to exactly one element.** It is the greeting on the home page and nothing else. A handwritten face reads as charming once and as noise the second time; the moment it appears in a heading or a button, the whole system tips into cutesy. `font-greeting` has one consumer by design.

Scale in use:

| Element                     | Size                                                 |
| --------------------------- | ---------------------------------------------------- |
| Greeting                    | `text-[40px]/[60px]` → `md:text-[68px]/[100px]`      |
| Note title (`PostTitle`)    | `text-4xl` extrabold, tight tracking                 |
| Page heading (`PageHeader`) | `text-3xl` → `md:text-4xl` extrabold, tight tracking |
| Card heading (`NoteCard`)   | `text-xl` semibold                                   |
| Body                        | `text-base/7` → `md:text-lg/8`                       |
| Meta, captions, footer      | `text-sm`                                            |

Long-form notes render through `@tailwindcss/typography` at `prose-lg`, so the reading measure and rhythm inside a note come from the plugin rather than from bespoke classes.

## 3. Color tokens

Tailwind's palette is the source of truth — there is no parallel CSS-variable layer. Two aliases in `tailwind.config.ts` carry the whole identity, and three more name the code surfaces:

```js
colors: {
  primary: colors.emerald,   // the single accent
  dark: '#1f1f1f',           // the dark page ground
  // + 'solarized-light' / 'github-dark-dimmed' / 'code-block' — see below
}
```

### The accent

| Token                         | Hex                   | Use                                                               |
| ----------------------------- | --------------------- | ----------------------------------------------------------------- |
| `primary-100` / `primary-200` | `#d1fae5` / `#a7f3d0` | Growing-underline wash, light                                     |
| `primary-300`                 | `#6ee7b7`             | Profile-card spine, light end; link hover on dark                 |
| `primary-400`                 | `#34d399`             | Links and inline code on dark (8.57:1); hairline gradients, dark  |
| `primary-500`                 | `#10b981`             | Hairline gradients, focus ring; button hover on dark              |
| `primary-600`                 | `#059669`             | Greeting gradient, green end; button ground on dark               |
| `primary-700`                 | `#047857`             | Links, inline code and buttons on light (5.48:1); spine, dark end |
| `primary-800` / `primary-900` | `#065f46` / `#064e3b` | Growing-underline wash, dark; link and button hover on light      |

**Why 700/400 and not 500 for text.** `emerald-500` on white is 2.54:1 — nowhere near readable. The accent has to step to `700` on light and `400` on dark to clear WCAG AA for body text, and those two steps look like the same color at a glance because each sits at a similar distance from its own ground. Any new accent-colored text follows the same rule: **`primary-700` on light, `primary-400` on dark.** Re-check with a contrast tool before introducing a different step.

### Grounds and ink

| Role                            | Light                      | Dark                                   |
| ------------------------------- | -------------------------- | -------------------------------------- |
| Page                            | `white`                    | `dark` (`#1f1f1f`)                     |
| Body text                       | `gray-900`                 | `gray-100`                             |
| Muted text (meta, descriptions) | `gray-600`                 | `gray-400`                             |
| Faint text (separators, icons)  | `gray-500`                 | `gray-400` / `gray-500`                |
| Hairline border                 | `gray-200`                 | `gray-700` (`gray-800` on card frames) |
| Raised surface (cards)          | `white` / `gray-50`        | `white/5`                              |
| Ring / outline                  | `gray-900/5`–`gray-900/20` | `white/10`–`white/20`                  |

**One grey family.** Tailwind ships `gray`, `zinc`, `neutral`, `slate` and `stone`; they differ by a few degrees of hue, which is exactly enough to look like a mistake when two of them meet in the same card. This system uses `gray` for every surface, border and piece of text. Do not reach for `zinc-800` because it is a nicer dark — use `gray-800`. `zinc` survives in exactly three places, all of them tints rather than surfaces: the logo and note-card shadow colors, and the `[data-highlighted-chars]` rule in the typography block.

### Code surfaces

| Token                | Hex       | Use                      |
| -------------------- | --------- | ------------------------ |
| `solarized-light`    | `#fdfaf6` | Code block ground, light |
| `github-dark-dimmed` | `#22272e` | Code block ground, dark  |
| `code-block`         | `#36313d` | Code text, light         |

These pair with the Shiki themes configured in `contentlayer.config.ts` (`solarized-light` / `github-dark-dimmed`) and must be changed together. The highlighted-line tint `#fbf0ea` is deliberately warm so it sits on the warm `solarized-light` ground rather than fighting it.

## 4. Shape, depth and texture

- **Radii.** `rounded-2xl` for note cards, the sticky header (`md:` and up) and the kbar modal; `rounded-xl` for the logo; `rounded-lg` for the profile card, buttons, code blocks, scroll buttons and the image-zoom modal; `rounded-md` for the theme menu; plain `rounded` for the small icon buttons in the header; `rounded-full` for focus-area pills. Rounded everywhere — nothing in this system has a square corner.
- **Borders over shadows.** Most separation is a hairline (`border-gray-200 dark:border-gray-700`) or a 1px ring, not a drop shadow. The header separates itself without a border at all: `backdrop-blur` over a 75%-opaque ground, plus `shadow-sm`.
- **Two bespoke shadows, both on the profile card.** `shadow-card` is a single soft drop for the light page; `shadow-card-stack` is a five-step emerald offset stack for the dark one. They are theme partners, not alternatives, and the only shadows the Tailwind config defines. Everything else that lifts uses a stock step at its smallest useful size — `shadow-sm` on the header, `shadow` on the button, `hover:shadow-md` on note cards, `shadow-lg` at low opacity on the logo and theme menu.
- **Tilted grid.** `TiltedGridBackground` renders an SVG grid skewed `-18deg` at 2–5% opacity under a `linear-gradient(white, transparent)` mask. It sits behind the top `50vh` of every page and inside each note card. It is texture, not decoration — at full opacity it would be a pattern; at 2% it just keeps large empty areas from reading as blank.
- **Gradient border.** `GradientBorder` draws two 1px accent hairlines that fade out at both ends, inset from the corner by `--offset`. Used on note cards and the SatLab intro block to imply a frame without drawing one.
- **One pill.** `components/ui/pill.tsx` is the single rounded-label shape: `rounded-full`, `ring-1`, `bg-gray-100`/`dark:bg-white/5`, at `base` (`px-3 py-1 text-sm`) or `sm` (`px-2.5 py-0.5 text-xs`). Five consumers — home focus areas, note categories, tags, list counts, SatLab capabilities. **Pills are always neutral.** They carry metadata, and a row of emerald labels would spend the entire accent budget on things nobody clicks. `PillLink` is the same shape with a `hover:bg-gray-200` / `dark:hover:bg-white/10` ground shift instead of a growing underline, because the underline wash is sized for text and reads as a rendering fault inside a capsule.
- **Status text is the one exception to the pill.** "In progress" on a SatLab phase is accent-on-transparent with a ring (`text-primary-700 ring-primary-700/30`, `dark:text-primary-400 ring-primary-400/30`) rather than a filled pill — it marks a state rather than labelling a topic, and there is never more than one on screen.

## 5. Motion

Restrained and mostly hover-driven. Nothing animates on scroll, and no page or section animates itself in.

- **Growing underline** — the signature interaction. A background gradient grows from `0px 50%` to `100% 50%` over 300ms on hover, so a link underlines itself by filling in rather than appearing. Active nav items sit at `100% 50%` and grow to full height on hover. Applied to nav links, note titles, blog titles, footer links and prev/next.
- **Color and shadow transitions** at 150ms on buttons and note cards.
- **The three exceptions**, all tied to something the visitor opened or loaded rather than to the page arriving: the mobile-nav dialog (Headless UI, 300ms in / 200ms out, fade plus slide from the right), the theme menu (100ms / 75ms) and `Image`, which holds an `animate-pulse` placeholder until the file loads and then fades in over 500ms.
- Everything else is static.

## 6. Layout

- **Container.** `max-w-6xl`, padded `px-4 sm:px-6 xl:px-12`. One component, used by every page, the header and the footer — page-level padding overrides are the exception, not the rule.
- **Home.** `xl:grid-cols-3`: greeting, focus-area pills and intro prose take two columns; the profile card takes the third. Below `xl` the card drops underneath.
- **Notes.** Grouped into category sections, each headed by its lucide glyph, label, count and blurb, with a two-column card grid under it (`md:grid-cols-2`, `gap-y-12` — the card icon overhangs its top edge by 20px and collides with the row above at anything tighter). Sections render in `NOTE_CATEGORIES` order and empty ones are omitted. Sectioning is what lets a small library read as deliberate: four notes in four labelled sections look like a table of contents, four notes in a flat grid look like a page that ran out.
- **Blog.** A single flat reverse-chronological list, hairline-divided — deliberately a list, not cards, because the destination is off-site. Each row is **one line**: date left (fixed `w-28`, `tabular-nums`), title centre with the external-link glyph, publication right (hidden below `sm`). The whole row is the link, and `group-hover` drives the underline from anywhere in it. Tag pills are deliberately not on the row — three stacked lines read as a card without being one, and the topic pills in the page header already link to the same `/tags` pages. Year grouping was tried and reverted: several years hold a single article, and a rail with a count over one row reads as an empty section rather than as structure.
- **List-page headers.** `PageHeader`'s `children` slot carries a row of count and topic pills on `/blog`, `/notes`, `/satlab` and `/tags/[tag]`. On `/notes` those pills are **anchors, not filters** (`/notes#space`) — a `?category=` query would make the page the second dynamic route on the site. Section heads carry `scroll-mt-24` so the sticky header does not cover them on arrival.
- **Note.** `xl:grid-cols-[minmax(0,1fr)_14rem]` — body plus a sticky table-of-contents rail. The grid is applied only when there are at least two headings, or it reserves 14rem of empty gutter. Below `xl` the same list collapses into a `<details>` above the body; both are rendered and one is hidden by a breakpoint, so the TOC needs no JavaScript. Prose is capped at `max-w-2xl lg:max-w-3xl` — it was `max-w-none` inside a `max-w-6xl` container, which ran to about 120 characters a line. A breadcrumb, a meta row (category, date, optional `Updated`, reading time) and tag pills sit above the opening `GradientDivider`. **The meta row must not be a `<dl>` and must not say "Published on"** — an empty definition list with a dangling `sr-only` label was a real bug, and `tests/components/post-simple.test.tsx` guards its return.
- **Topic pages.** `/tags/[tag]` lists notes as cards and articles as rows under one heading. Top-level rather than under `/notes`, because `app/notes/[...slug]` is a catch-all and would shadow it. This is the only place the two content surfaces meet.
- **Header.** Sticky (`top-2 lg:top-3`), rounded, translucent with `backdrop-blur`. Collapses to a full-screen `MobileNav` dialog below `sm`. Desktop nav items are text; **exactly one carries a lucide icon and the accent colour** (SatLab, `text-primary-700 dark:text-primary-400`) so the newest thing on the site is the thing that catches the eye. Mobile keeps its Twemoji-per-item convention — `icon` is a desktop concern, `emoji` a mobile one, and nav entries may carry both.

## 7. Quality floor (non-negotiable)

- Body text and accent-on-ground meet **WCAG AA in both themes** — re-verify after any token edit. The current floor: `primary-700` on white = 5.48:1, `primary-400` on `#1f1f1f` = 8.57:1, and both greeting gradient stops clear 3:1 at display size.
- Every page works at 400px wide; the home grid, the notes grid and the header all collapse to one column.
- Keyboard focus is visible. The `Button` component defines the house style — `focus-visible:ring-2 ring-primary-500` with an offset that flips to the dark ground in dark mode — and has two consumers (`app/not-found.tsx` and the SatLab page); the header's icon buttons and every link rely on the browser's own focus ring. Anything new that is focusable and not a plain link should use `Button` or copy its ring rather than suppress the default.
- Client components are the exception, and the boundary is drawn as low as it will go: the profile card's shell is a server component and only `ProfileCardInfo` inside it is `'use client'`, because only the clock needs the browser. The full list is the theme provider and switcher, the header (it reads `usePathname` to mark the active nav item), the mobile nav, kbar, the note page's scroll buttons, the MDX `pre` and its copy button, `ui/image`, and that profile-card body. Everything else — pages, layouts, cards, the footer — renders on the server.
- Values that depend on the visitor's clock or timezone are gated behind a `useSyncExternalStore` mount check, never rendered during SSR.

## 8. Wiring into the stack

- **Theme switching:** `next-themes` with `attribute="class"` (Tailwind `darkMode: 'class'`), values `light` / `dark` / `system`. The FOUC-prevention inline script is the sole reason `'unsafe-inline'` survives in the `script-src` CSP.
- **Tokens:** `tailwind.config.ts` only. Adding a CSS-variable layer on top would give the system two sources of truth for the same color.
- **Prose:** all long-form styling lives in the `typography` block of `tailwind.config.ts` — `DEFAULT`, `lg` and `invert`. Edits there change every note at once. Note that the plugin decorates inline `<code>` with literal backticks through `::before`/`::after`; both are set to `content: 'none'`, because the accent colour and the mono face already mark it as code and the quotes land inside the sentence.
- **Content model:** `category` is a contentlayer **enum** built from `NOTE_CATEGORIES` in `data/note-categories.ts`. Contentlayer does **not** reject a note whose category is missing from that list — it narrows the generated `category` union to the surviving slugs and builds the orphaned notes anyway, so the generated type quietly stops describing the data and the breakage lands in `CATEGORY_ICONS` and the taxonomy tests instead. **To hide notes, set `draft: true` on them, never remove their category** — a category with no published notes already drops off `/notes` by itself. `icon` is optional — when a note names no brand, `NoteIcon` falls back to the category's lucide glyph; when it does name one, `tests/unit/brand.test.ts` still requires it to be a `BrandsMap` key, because an unregistered value renders nothing at all, silently.
- **Tags:** display spellings in note frontmatter and in `BLOG_METADATA`, joined on `tagSlug()` (`utils/tags.ts`). It converts `/`, `&` and `+` plus the whitespace around them to a single hyphen before slugging — github-slugger drops them, which would collapse "AI/ML" to `aiml`, and leaving the spaces gives `rust---go`.
- **Icons:** `lucide-react` at `strokeWidth={1.5}` for UI; brand SVGs from `icons/` through the `BrandsMap` registry in `components/ui/brand.tsx`; Twemoji for the emoji in prose.

## 9. Extending this

Before adding anything, check it against the three rules:

1. **Does it need a new color?** Almost certainly not. Emerald plus the grey ramp covers state, emphasis and structure. A genuinely new semantic role (a warning, a destructive action) is the only case that earns one — and it gets a _functional_ color, never a decorative one.
2. **Does it need a new typeface?** No. Three faces is already the ceiling, and one of them is rationed to a single element.
3. **Does it need a shadow?** Probably a hairline or a ring instead. If it genuinely lifts, take the smallest stock step that reads — `shadow-sm` or `shadow` — and leave the two bespoke shadows to the profile card.

---

_The live site is the reference implementation — run `pnpm dev`. Where this document and the code disagree, the code wins: fix the document._
