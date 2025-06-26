# Node.js Server for MLOps Homelab

A TypeScript Express.js server for experimenting with containerized services and monitoring in a Kubernetes homelab environment.

## Purpose

This service serves as a foundation for learning:
- Container orchestration with Docker and Kubernetes
- Health monitoring and observability
- Microservice architecture patterns

## Quick Start

```bash
# Development
npm install && npm run dev

# Docker
docker-compose up --build
```

## Key Features

- **TypeScript** - Type safety and modern JS features
- **Health Monitoring** - `/health` and `/health/detailed` endpoints
- **Docker Ready** - Multi-stage build with security practices
- **Modular Routes** - Organized API structure

## API Endpoints

- `GET /health` - Basic health check
- `GET /health/detailed` - Memory usage and detailed status
- `GET /api` - API status and version
- `GET /api/hello` - Hello endpoint
- `GET /api/env` - Filtered environment variables

## Environment Setup

Copy `env.example` to `.env`:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `NODE_ENV` | Node.js environment | `development` |
| `LOG_LEVEL` | Logging level (error, warn, info, debug) | `info` |
| `ENABLE_MORGAN` | Enable HTTP request logging | `true` |
| `ENABLE_CORS` | Enable CORS middleware | `true` |
| `CORS_ORIGIN` | CORS allowed origins | `*` |

```bash
PORT=5000
NODE_ENV=development
LOG_LEVEL=info
ENABLE_MORGAN=true
ENABLE_CORS=true
CORS_ORIGIN=*
```

## Development Scripts

- `npm run dev` - Development server with hot reload
- `npm run build` - TypeScript compilation
- `npm start` - Production server
