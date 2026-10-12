# syntax=docker/dockerfile:1

# Every stage shares one glibc base: sharp (next/image) installs a per-platform
# binary, so the runner must match the platform the deps were installed on.
FROM node:24-bookworm-slim AS base
# Matches the pnpm major in .github/workflows/ci.yml.
RUN npm install -g pnpm@10
# The `prepare` script would otherwise try to install git hooks.
ENV HUSKY=0 NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Read by data/site-metadata.ts while pages prerender, so it must be present at
# build time; setting it on the running container has no effect.
ARG NEXT_UMAMI_ID
ENV NEXT_UMAMI_ID=$NEXT_UMAMI_ID STANDALONE=1
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
