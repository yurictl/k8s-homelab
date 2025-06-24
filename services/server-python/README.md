# Homelab Python Server

A FastAPI-based microservice designed for homelab experiments and testing. This service provides various API endpoints for monitoring, health checks, and system information.

## Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **Health Check Endpoints**: Multiple health monitoring endpoints
- **System Metrics**: Real-time system information and performance metrics
- **Request Monitoring**: Middleware for tracking request processing time and count
- **Security**: Filtered environment variable exposure and proper error handling
- **Container Ready**: Optimized Docker image with health checks
- **Configuration Management**: Environment-based configuration with Pydantic

## API Endpoints

### Base Path
All endpoints are served under `/api` root path.

### Available Endpoints

- `GET /api/` - Returns server information and welcome message
- `GET /api/items/{item_id}` - Returns item information with optional query parameter
- `GET /api/health` - Standard health check endpoint
- `GET /api/actuator/health` - Spring Boot style health check endpoint
- `GET /api/metrics` - Prometheus-style metrics for monitoring
- `GET /api/info` - Detailed server and system information
- `GET /api/env` - Returns filtered environment variables (security-conscious)

## Prerequisites

- Docker and Docker Compose (recommended)
- Python 3.11+ (for local development)

## Quick Start

### Using Docker Compose (Recommended)

1. **Start the service:**
   ```bash
   docker-compose up -d
   ```

2. **Access the API:**
   - Main endpoint: http://localhost:8080/api/
   - Health check: http://localhost:8080/api/health
   - API documentation: http://localhost:8080/api/docs
   - Metrics: http://localhost:8080/api/metrics

### Using Docker

1. **Build the Docker image:**
   ```bash
   docker build -t homelab-python-server .
   ```

2. **Run the container:**
   ```bash
   docker run -p 8080:8080 homelab-python-server
   ```

### Local Development

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application:**
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
   ```

## Configuration

### Environment Variables

The application can be configured using environment variables:

- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8080)
- `DEBUG`: Enable debug mode (default: false)
- `LOG_LEVEL`: Logging level (default: INFO)
- `APP_NAME`: Application name (default: Homelab Python Server)
- `APP_VERSION`: Application version (default: 1.0.0)
- `ROOT_PATH`: API root path (default: /api)
- `ENABLE_ENV_ENDPOINT`: Enable environment endpoint (default: true)
- `REDACT_SENSITIVE_ENV_VARS`: Redact sensitive env vars (default: true)

### Docker Compose Configuration

The `docker-compose.yml` file includes:
- Health checks with curl
- Automatic restart policy
- Network configuration
- Environment variable setup

## Dependencies

- **fastapi**: Web framework for building APIs
- **uvicorn**: ASGI server for running FastAPI applications
- **psutil**: System and process utilities for monitoring
- **pydantic**: Data validation and settings management

## Docker Configuration

- **Base Image**: Python 3.11-slim
- **Port**: 8080 (exposed)
- **Working Directory**: `/app`
- **User**: Non-root user for security
- **Health Check**: Built-in health check with curl
- **Command**: `uvicorn app.main:app --host 0.0.0.0 --port 8080 --access-log`

## Monitoring and Metrics

The application provides several monitoring endpoints:

- **Health Checks**: `/api/health` and `/api/actuator/health`
- **Metrics**: `/api/metrics` with request count and uptime
- **System Info**: `/api/info` with detailed system information
- **Request Tracking**: Middleware adds `X-Process-Time` and `X-Request-Count` headers

## Security Features

- Non-root user in Docker container
- Filtered environment variable exposure
- CORS configuration for development
- Global exception handling
- Request logging and monitoring

## Development Notes

- The application uses a hardcoded root path `/api` for all endpoints
- All responses include timestamps for better debugging
- Request processing time is tracked and logged
- System metrics are available for monitoring
- Environment variables are filtered to prevent sensitive data exposure

## Troubleshooting

1. **Port conflicts**: Ensure port 8080 is available or change the port mapping
2. **Health check failures**: Check if the application is running properly
3. **Permission issues**: The container runs as a non-root user
4. **Dependencies**: Check that all Python packages are properly installed

## API Documentation

Once the server is running, you can access:
- **Interactive API docs**: http://localhost:8080/api/docs
- **OpenAPI JSON**: http://localhost:8080/api/openapi.json

## Homelab Integration

This server is designed for homelab environments and can be easily integrated with:
- Prometheus for metrics collection
- Grafana for visualization
- Kubernetes for orchestration
- Reverse proxies (nginx, traefik)
- Service mesh solutions
