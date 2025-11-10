# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine AS build

# Set config
ARG VITE_API_URL
RUN echo $VITE_API_URL
ARG VITE_MEDUSA_BACKEND_URL
RUN echo $VITE_MEDUSA_BACKEND_URL
ARG VITE_MEDUSA_PUBLISHABLE_KEY
RUN echo $VITE_MEDUSA_PUBLISHABLE_KEY
ARG VITE_STRIPE_PUBLISHABLE_KEY
RUN echo $VITE_STRIPE_PUBLISHABLE_KEY

# Install pnpm globally
RUN npm install -g pnpm

# Create and change to the app directory.
WORKDIR /app

# Copy the files to the container image
COPY package.json pnpm-lock.yaml ./

# Install packages using pnpm
RUN pnpm install --frozen-lockfile

# Copy local code to the container image.
COPY . ./

# Build the app using pnpm
RUN pnpm run build

# Use the Caddy image
FROM caddy

# Create and change to the app directory.
WORKDIR /app

# Copy Caddyfile to the container image.
COPY Caddyfile ./

# Copy local code to the container image.
RUN caddy fmt Caddyfile --overwrite

# Copy files to the container image.
COPY --from=build /app/dist ./dist

# Use Caddy to run/serve the app
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
