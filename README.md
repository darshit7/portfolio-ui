# My 🏠 on the ☁️

My personal site on the cloud. Live at [darshitp.dev](https://www.darshitp.dev).

## Motivation

Have you ever stumbled upon a coding problem, scoured the internet for solutions, and then found yourself diving deep into a rabbit hole of knowledge? If you're anything like me, you know that feeling all too well.

So, why did I decide to start this blog?

> The answer lies in the countless hours spent exploring the vast landscape of programming. From deciphering the intricacies of Python's syntax to building robust backend systems, every line of code has been a step forward in my journey. But as I delved deeper, I realized something profound — learning is most fulfilling when shared.

Through this blog, I aspire to cultivate curiosity, foster connection and empower learning. Knowledge is not a finite resource; it's a flame that grows brighter with every mind it ignites. Together, let's navigate the twists and turns of technology and emerge not just as skilled developers, but as passionate advocates for learning and growth. 🍻

## What's here

- 📝 **Notes** (`/notes`): short write-ups in MDX on Python, AI/agents, workflow, and space.
- 📰 **Blog** (`/blog`): my longer articles, published on Medium and collected here.
- 🏷️ **Topics** (`/tags`): one page per topic, bringing notes and articles together.
- 🔎 **Search**: press <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere to search the notes.
- 🛰️ **SatLab** ([satlab.darshitp.dev](https://satlab.darshitp.dev)): my space hobby project.
- 🌗 **Light and dark themes**, with code highlighted in GitHub dark dimmed and Solarized light.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) and [React 19](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Contentlayer2](https://www.npmjs.com/package/contentlayer2) to compile MDX notes, with remark/rehype plugins and [Shiki](https://shiki.style/) (via `rehype-pretty-code`) for syntax highlighting
- [kbar](https://kbar.vercel.app/) for the command palette
- [Umami](https://umami.is/) for privacy-friendly analytics
- Docker on [Azure Container Apps](https://azure.microsoft.com/products/container-apps)

## Develop

Requires Node 24 (see `.nvmrc`) and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev         # build content, then start the dev server on http://localhost:3000
pnpm typecheck   # build content, then type-check
pnpm lint        # eslint (applies fixes)
pnpm test        # unit tests (vitest)
pnpm test:e2e    # end-to-end tests (playwright)
pnpm build       # production build
```

Notes live in `data/notes/*.mdx`; the Medium article list is in `data/blog-metadata.ts`.

## Deploy

Every push to `main` runs CI (`.github/workflows/ci.yml`): typecheck, lint, tests and build. If those pass, CI builds the Docker image, pushes it to GHCR, and rolls out a new revision on Azure Container Apps. Pull requests are checked but never deployed.

## Assets

Most of the images in my blog are from [Unsplash](https://unsplash.com/), gifs from [GIPHY](https://giphy.com/), and illustrations are from [Storyset](https://storyset.com/).

Thanks for the free resources 🙏

## Contact Me

- **Email:** [darshit7@gmail.com](mailto:darshit7@gmail.com)
- **LinkedIn:** [https://www.linkedin.com/in/darshit7/](https://www.linkedin.com/in/darshit7/)

---

Copyright (c) 2026 Darshit Patoliya (DP). All rights reserved.
