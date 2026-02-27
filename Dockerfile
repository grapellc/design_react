# Stage 1: Build React docs
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy the entire mono-repo structure
COPY . .

# Install dependencies and build
RUN bun install
RUN bun run docs:build

# Stage 2: Serve with nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
# Next.js static export is in docs/out
COPY --from=builder /app/docs/out /usr/share/nginx/html
COPY nginx-docs.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
