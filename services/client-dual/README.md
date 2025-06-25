# Frontend for Homelab Microservices

A modern React-based web dashboard for monitoring and testing two backend microservices (Python and Node.js) deployed in a Kubernetes homelab environment.

## Features

- **Service Health Monitoring**: Real-time health status for both Python and Node.js backend services
- **API Endpoints Explorer**: Complete list and documentation of all available API endpoints
- **Metrics Dashboard**: Interactive charts displaying CPU, memory, request count, and response time metrics
- **Interactive API Console**: Test API endpoints with custom requests and view responses
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Automatic refresh of health status and metrics

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build and development server
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Docker** for containerization
- **Kubernetes** manifests for deployment

## API Endpoints Supported

### Python Service (http://python-service:8080/api)
- `GET /api/` - Root API endpoint
- `GET /api/items/{item_id}` - Get item by ID
- `GET /api/health` - Health check
- `GET /api/actuator/health` - Detailed health information
- `GET /api/metrics` - Prometheus metrics
- `GET /api/info` - Service information
- `GET /api/env` - Environment variables

### Node.js Service (http://node-service:5000)
- `GET /health` - Basic health check
- `GET /healthdetailed` - Detailed health check
- `GET /api` - Main API endpoint
- `GET /apihello` - Hello endpoint
- `GET /apienv` - Environment variables
- `GET /apigoodbye` - Goodbye endpoint

## Local Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized development)

### Installation

1. **Clone the repository**
   ```bash
   cd services/client-dual
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your backend service URLs
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to http://localhost:3000

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Docker Setup

### Build and Run with Docker

1. **Build the image**
   ```bash
   docker build -t homelab-frontend .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 homelab-frontend
   ```

### Docker Compose (with backend services)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop all services
docker-compose down
```

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster
- kubectl configured
- nginx-ingress controller installed

### Deploy to Kubernetes

1. **Build and push image to registry**
   ```bash
   docker build -t your-registry/homelab-frontend:latest .
   docker push your-registry/homelab-frontend:latest
   ```

2. **Update image in deployment.yaml**
   ```yaml
   image: your-registry/homelab-frontend:latest
   ```

3. **Apply Kubernetes manifests**
   ```bash
   kubectl apply -f k8s/
   ```

4. **Verify deployment**
   ```bash
   kubectl get pods -l app=homelab-frontend
   kubectl get services -l app=homelab-frontend
   kubectl get ingress homelab-frontend-ingress
   ```

### Kubernetes Manifests

- `k8s/deployment.yaml` - Frontend application deployment
- `k8s/service.yaml` - ClusterIP service
- `k8s/ingress.yaml` - Nginx ingress for external access
- `k8s/configmap.yaml` - Configuration for backend URLs

## Project Structure

```
services/client-dual/
├── src/
│   ├── components/
│   │   ├── ServiceHealth.tsx      # Health status monitoring
│   │   ├── ApiEndpoints.tsx       # API endpoints documentation
│   │   ├── MetricsDashboard.tsx   # Charts and metrics display
│   │   └── ApiConsole.tsx         # Interactive API testing
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── k8s/                          # Kubernetes manifests
├── Dockerfile                    # Container build instructions
├── docker-compose.yml            # Local development setup
├── nginx.conf                    # Nginx configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                     # This file
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_PYTHON_SERVICE_URL` | Python backend service URL | `http://python-service:8080` |
| `VITE_NODE_SERVICE_URL` | Node.js backend service URL | `http://node-service:5000` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` |
| `VITE_DEV_MODE` | Development mode flag | `true` |

### Backend Service Requirements

The frontend expects the following from backend services:

1. **Health endpoints** returning JSON with status information
2. **Metrics endpoints** returning Prometheus-formatted metrics
3. **CORS headers** allowing cross-origin requests
4. **JSON responses** for API endpoints

## Testing and Validation

### Manual Testing Checklist

- [ ] Verify all endpoints return expected JSON responses
- [ ] Check charts render metrics data correctly
- [ ] Ensure API console supports custom requests
- [ ] Confirm responsiveness on various screen sizes
- [ ] Test health monitoring with both services running/stopped
- [ ] Validate error handling for network failures

### Automated Testing

```bash
# Run linting
npm run lint

# Build test
npm run build

# Preview build
npm run preview
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend services include proper CORS headers
2. **Connection Refused**: Check if backend services are running and accessible
3. **Build Failures**: Verify Node.js version and dependencies
4. **Kubernetes Issues**: Check pod logs and service connectivity

### Debug Commands

```bash
# Check container logs
docker logs <container-id>

# Check Kubernetes pod status
kubectl describe pod <pod-name>

# Check service endpoints
kubectl get endpoints homelab-frontend-service

# Port forward for debugging
kubectl port-forward svc/homelab-frontend-service 3000:80
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the k8s-homelab project for educational purposes.