# syntax=docker/dockerfile:1
ARG NODE_VERSION=18.7.0



# ===
# base node image
# ===
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Remix/Prisma"

WORKDIR /app

ENV NODE_ENV=production



# ===
# Build the app
# ===
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential openssl 

# Install node modules
COPY --link package.json package-lock.json ./
RUN npm install --production=false

# Generate Prisma Client
COPY --link prisma .
RUN npx prisma generate

# Copy application code
COPY --link . .

# Generate Routes
RUN npx tsx generate-remix-routes.ts

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --production



# ===
# Final stage for app image
# ===
FROM base

# Copy built application
COPY --from=build /app /app

CMD node --max-old-space-size=256 build/server
