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
docker compose up --build
```

The Compose file mounts the source directory into the container while keeping `node_modules` inside the container, so any saved change triggers nodemon without rebuilding the image. Stop with `Ctrl+C`.

## Build production image

```bash
docker build -t szachowezoo-backend .
docker run -p 3000:3000 szachowezoo-backend
```
