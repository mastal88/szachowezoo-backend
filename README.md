# Szachowe Zoo backend

Simple Express + TypeScript + Mongoose API that can run directly with Node.js or inside a Docker container with live code reloading.

## Prerequisites

- Node.js 20+
- Docker & Docker Compose v2 (for containerized development)

## Install & run locally

```bash
npm install
npm run dev # nodemon + ts-node with hot reload
# or build & run the compiled output
npm run build
npm run start
```

`npm run start` automatically triggers `npm run build` (see `prestart`). The API listens on `http://localhost:3000` and exposes `GET /`, `GET /health`, and `GET /quiz` (Mongo-backed).

### Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `MONGO_URI` | _required_ | Connection string (with database) for MongoDB |

> Create a `.env` file (automatically loaded via `dotenv`) or export the variable in your shell before running `npm run dev` / `npm run start` or any of the Docker Compose commands.

## Develop inside Docker (hot reload)

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

The dev override mounts the source directory into the container while keeping `node_modules` inside the container, so any saved change triggers nodemon without rebuilding the image. Stop with `Ctrl+C`. Remember to supply `MONGO_URI` via `.env` or your shell before starting the stack.

## Deploy with Docker Compose (no hot reload)

```bash
docker compose up --build -d
```

The base Compose file runs `npm run start` inside the image without mounting local files. Provide `MONGO_URI` via your deployment environment, and this setup avoids the `/app/package.json` “ENOENT” error when the host does not contain the source tree (e.g., on a VPS where only the container image is present).

## Build production image

```bash
docker build -t szachowezoo-backend .
docker run -p 3000:3000 szachowezoo-backend
```
