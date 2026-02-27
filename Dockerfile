# Stage 1: Build React docs
FROM oven/bun:latest AS builder

WORKDIR /app

# Avoid OOM / "Premature close" when Next.js builds docs (MDX/search)
ENV NODE_OPTIONS="--max-old-space-size=8192"
ENV NEXT_TELEMETRY_DISABLED=1

# Copy the entire mono-repo structure
COPY . .

# Install dependencies
RUN bun install

# Build only docs and its workspace dependencies (not full monorepo) to reduce memory use
RUN bun run --filter "@grape_design_react/docs..." build

# Stage 2: Serve with nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
# Next.js static export is in docs/out
COPY --from=builder /app/docs/out /usr/share/nginx/html
COPY nginx-docs.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
