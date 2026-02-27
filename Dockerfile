# Stage 1: Build docs (Next.js standalone)
FROM oven/bun:1.2-alpine AS builder

RUN apk add --no-cache nodejs

WORKDIR /app
COPY package.json bun.lock bunfig.toml tsconfig.base.json ./
COPY packages ./packages
COPY examples/docs ./examples/docs

RUN bun install
RUN bun run build
RUN cd examples/docs && node node_modules/.bin/next build

# Stage 2: Run standalone Next.js server
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
EXPOSE 3000

COPY --from=builder /app/examples/docs/.next/standalone ./
# Server at examples/docs/server.js resolves static from that dir
COPY --from=builder /app/examples/docs/.next/static ./examples/docs/.next/static

CMD ["node", "examples/docs/server.js"]
