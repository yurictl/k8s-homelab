# Node.js Server for Homelab

A TypeScript-based Express.js server designed for homelab experiments with AWS ALB integration, health monitoring, and modular architecture.

## Features

- **TypeScript** - Full type safety and modern JavaScript features
- **AWS ALB Integration** - Support for AWS Application Load Balancer authentication
- **Health Monitoring** - Comprehensive health check endpoints
- **Docker Ready** - Multi-stage Docker build with security best practices
- **Structured Logging** - Morgan HTTP logging with configurable levels
- **Modular Architecture** - Organized routes and middleware
- **Security** - Non-root container user, environment variable filtering

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t homelab-node-server .
docker run -p 5000:5000 homelab-node-server
```

## API Endpoints

### Health Checks
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed health with memory usage

### API Routes
- `GET /api` - API status and version
- `GET /api/hello` - Hello endpoint with token info
- `GET /api/env` - Environment variables (filtered)
- `GET /api/goodbye` - Goodbye endpoint

### Legacy Routes (for backward compatibility)
- `GET /api2/health` - Legacy health check
- `GET /api2` - Legacy root endpoint

## Environment Variables

Copy `env.example` to `.env` and configure:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# AWS Configuration
AWS_REGION=us-east-1
ENABLE_AUTH=false

# Logging Configuration
LOG_LEVEL=info
ENABLE_MORGAN=true

# Security Configuration
ENABLE_CORS=true
CORS_ORIGIN=*
```

## Project Structure

```
src/
├── config/          # Configuration management
├── middleware/      # Express middleware
├── routes/          # API route modules
│   ├── api.ts       # Main API routes
│   ├── health.ts    # Health check routes
│   └── index.ts     # Route aggregator
└── index.ts         # Main application entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run clean` - Remove build artifacts
- `npm run rebuild` - Clean and rebuild
- `npm start` - Start production server

### Adding New Routes

1. Create a new route file in `src/routes/`
2. Export the router
3. Import and mount in `src/routes/index.ts`

Example:
```typescript
// src/routes/users.ts
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ users: [] });
});

export default router;
```

## Docker Features

- **Multi-stage build** - Optimized production image
- **Non-root user** - Security best practice
- **Health checks** - Container health monitoring
- **Layer caching** - Faster builds

## Monitoring

The server includes comprehensive health monitoring:

- Basic health check at `/health`
- Detailed health check at `/health/detailed` with memory usage
- Docker health checks for container orchestration
- Structured logging with Morgan

## Security Considerations

- Environment variables are filtered in `/api/env` endpoint
- Non-root user in Docker container
- CORS configuration available
- AWS ALB token handling with proper logging

## Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Include health checks for new endpoints
4. Update documentation as needed 