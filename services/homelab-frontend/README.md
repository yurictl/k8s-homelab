# Frontend for Homelab Microservices

React-based web dashboard for monitoring Python and Node.js backend services in Kubernetes homelab.

## Tech Stack

- **React 18** + TypeScript + Vite
- **Tailwind CSS** + Recharts for UI
- **Docker** + Kubernetes for deployment
- **Axios** for API communication

## Quick Start

```bash
# Development
npm install
npm run dev

# Docker
docker build -t homelab-frontend .
docker run -p 3000:3000 homelab-frontend
```

## API Endpoints

### Python Service (port 8080)
- `GET /` - Server info and version
- `GET /health` - Health check
- `GET /ready` - Kubernetes readiness probe
- `GET /metrics` - Prometheus-style metrics
- `GET /info` - System information and resource usage
- `GET /env` - Environment variables (filtered)
- `GET /actuator/health` - Spring Boot style health check
- `GET /items/{item_id}` - Data endpoint with optional query parameter
- `GET /docs` - Interactive API documentation

### Node.js Service (port 5000)
- `GET /` - Service status and available endpoints
- `GET /health` - Basic health check
- `GET /health/detailed` - Memory usage and detailed status
- `GET /ready` - Readiness check for Kubernetes
- `GET /hello` - Hello endpoint with custom header
- `GET /env` - Filtered environment variables
- `GET /goodbye` - Goodbye endpoint
- `GET /api2/health` - Legacy health endpoint
- `GET /api2/` - Legacy root endpoint

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_PYTHON_SERVICE_URL` | Python backend service URL | `http://server-python:8080` |
| `VITE_NODE_SERVICE_URL` | Node.js backend service URL | `http://server-node:5000` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` |

## Testing

```bash
npm run lint
npm run build
npm run preview
```