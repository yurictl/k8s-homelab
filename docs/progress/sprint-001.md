# Sprint 001: Docker & Containerization Basics

## Overview

- **Duration**: 2025-06-24 to 2025-06-26
- **Focus**: Docker fundamentals, multi-service setup
- **Goals**:
  - [x] Understand Docker basics
  - [x] Set up Python and Node.js backends
  - [X] Create frontend application
  - [X] Build unified docker-compose setup
  - [X] Test local deployment
  - [X] Understand Cursor files structure for the project
  - [ ] Write manifests for k8s deploy and try with Rancher Desktop

## Daily Progress

### 2025-06-24

- Set up Python backend server
- Set up Node.js backend server
- Tested docker run and docker-compose commands

### 2025-06-25

- Created cursor rules for existing structure, keeping it as simple as possible for now.
- Created frontend that checks endpoints for service_node and service_python
- Launched all three services with unified docker compose

## Notes

- Both Python and Node.js backends successfully containerized
- Docker Compose files created for individual services
- Need to create unified orchestration for all services
