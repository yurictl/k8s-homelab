# Homelab Python Server

FastAPI microservice for experiments and monitoring. Built to practice containerization, API development, and observability patterns.

## Purpose

- Practice FastAPI development with real-world patterns
- Experiment with containerization and Docker best practices
- Test monitoring and observability tools
- Learn API design for microservices

## Quick Start

```bash
# Docker
docker build -t server-python .

docker run -d -p 8080:8080 --name server-python server-python

# Local development
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
```

## Key Endpoints

- `GET /` - Server info
- `GET /health` - Health check
- `GET /ready` - Kubernetes readiness probe
- `GET /metrics` - Prometheus-style metrics
- `GET /info` - System information
- `GET /docs` - Interactive API docs

## Configuration

### Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `HOST` | `0.0.0.0` | Server binding address |
| `PORT` | `8080` | Server port |
| `DEBUG` | `false` | Enable debug mode |
| `LOG_LEVEL` | `INFO` | Logging verbosity |
| `APP_NAME` | `Homelab Python Server` | Application name |
| `APP_VERSION` | `1.0.0` | Application version |
| `ENABLE_ENV_ENDPOINT` | `true` | Enable `/env` endpoint |
| `REDACT_SENSITIVE_ENV_VARS` | `true` | Filter sensitive data |

### Security Notes
- Environment variables are filtered by default to prevent sensitive data exposure
- The `/env` endpoint can be disabled for production
- Sensitive vars (containing 'key', 'secret', 'password', 'token') are automatically redacted

## Dependencies

- **fastapi** - Web framework
- **uvicorn** - ASGI server
- **psutil** - System monitoring
- **pydantic** - Data validation