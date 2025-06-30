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
- `/api/health` - Health check
- `/api/metrics` - Prometheus metrics
- `/api/items/{id}` - Data endpoint

### Node.js Service (port 5000)
- `/health` - Health check
- `/api` - Main endpoint
- `/apienv` - Environment info

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_PYTHON_SERVICE_URL` | Python backend service URL | `http://python-service:8080` |
| `VITE_NODE_SERVICE_URL` | Node.js backend service URL | `http://node-service:5000` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` |

## Testing

```bash
npm run lint
npm run build
npm run preview
```