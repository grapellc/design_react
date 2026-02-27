# Stage 1: Build docs (Next.js standalone)
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app
COPY package.json bun.lock bunfig.toml ./
COPY packages ./packages
COPY examples/docs ./examples/docs

RUN bun install --frozen-lockfile
RUN bun run build:docs

# Stage 2: Run standalone Next.js server
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
EXPOSE 3000

COPY --from=builder /app/examples/docs/.next/standalone ./
COPY --from=builder /app/examples/docs/.next/static ./.next/static
COPY --from=builder /app/examples/docs/public ./public

CMD ["node", "server.js"]
