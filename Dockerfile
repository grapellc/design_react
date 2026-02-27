# Stage 1: Build docs as static export (no Node server, CSS/assets work with nginx)
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app
COPY package.json bun.lock bunfig.toml tsconfig.base.json ./
COPY packages ./packages
COPY examples/docs ./examples/docs

# Static export cannot include API routes; search will need client-side config (Fumadocs Orama)
RUN rm -rf /app/examples/docs/app/api

RUN bun install

ENV STATIC_EXPORT=1
RUN bun run build:docs

# Stage 2: Serve static export with nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/examples/docs/out /usr/share/nginx/html
COPY nginx-docs.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
