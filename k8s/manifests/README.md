# Kubernetes Manifests for Homelab Services

This directory contains Kubernetes manifests for deploying the homelab services.

## Structure

- `namespace.yaml` - Creates the `homelab` namespace
- `configmap.yaml` - Configuration for environment variables
- `server-python-deployment.yaml` - Python backend service deployment and service
- `server-node-deployment.yaml` - Node.js backend service deployment and service  
- `homelab-frontend-deployment.yaml` - Frontend application deployment and service
- `ingress.yaml` - Ingress configuration for external access
- `kustomization.yaml` - Kustomize configuration for managing all resources

## Prerequisites

1. Kubernetes cluster with:
   - NGINX Ingress Controller
   - Local image registry or images built locally

2. Docker images built from the services:
   ```bash
   docker build -t server-python:latest ./services/server-python
   docker build -t server-node:latest ./services/server-node
   docker build -t homelab-frontend:latest ./services/homelab-frontend
   ```

## Deployment

### Using kubectl directly:
```bash
kubectl apply -f k8s/manifests/
```

### Using kustomize:
```bash
kubectl apply -k k8s/manifests/
```

## Access

- Frontend: `http://homelab.local` (update host in ingress.yaml)
- Python API: `http://homelab.local/api/python`
- Node API: `http://homelab.local/api/node`

## Notes

- Images use `imagePullPolicy: Never` for local development
- Health checks are configured for all services
- Resource limits and requests are set for all containers
- Services run with 2 replicas each for high availability 