# Szachowe Zoo backend

Simple Express API prepared to run directly with Node.js or inside a Docker container with live code reloading.

## Prerequisites

- Node.js 20+
- Docker & Docker Compose v2 (for containerized development)

## Install & run locally

```bash
npm install
npm run dev # nodemon with hot reload
```

The API listens on `http://localhost:3000` and exposes `GET /` plus `GET /health`.

## Develop inside Docker (hot reload)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

The dev override mounts the source directory into the container while keeping `node_modules` inside the container, so any saved change triggers nodemon without rebuilding the image. Stop with `Ctrl+C`.

## Deploy with Docker Compose (no hot reload)

```bash
docker compose up --build -d
```

The base Compose file runs `npm run start` inside the image without mounting local files. This avoids the `/app/package.json` “ENOENT” error when the host does not contain the source tree (e.g., on a VPS where only the container image is present).

## Build production image

```bash
docker build -t szachowezoo-backend .
docker run -p 3000:3000 szachowezoo-backend
```
