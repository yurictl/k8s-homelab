# Sprint 001: Docker & Containerization Basics

## Goals
  - [x] Understand Docker basics
  - [x] Set up Python and Node.js backends
  - [X] Create frontend application
  - [X] Build unified docker-compose setup
  - [X] Test local deployment
  - [X] Understand Cursor files structure for the project
  - [ ] Write manifests for k8s deploy and try with Rancher Desktop
  - [ ] Add monitoring and observability
  - [ ] Create complex infrastructure, for example, add network policies

## Daily Progress

### 2025-06-24

- Set up Python backend server
- Set up Node.js backend server
- Tested docker run and docker-compose commands

### 2025-06-25

- Created cursor rules for existing structure, keeping it as simple as possible for now.
- Created frontend that checks endpoints for service_node and service_python
- Launched all three services with unified docker compose

### 2025-06-26

- Explored container internals [Docker internals](../guides/docker/2026-06-26%20Docker%20internals.md)
- Removed unnecessary functionality from services
- Simplified README.md structure for services and added rules

### 2025-06-27

- Wrote manifests for services and attempted to run them in Rancher Desktop
- Discovered specific features that need to be studied in more detail [Rancher Desktop](../guides/kubernetes/Rancher%20Desktop.md)

### 2025-06-30

- Analysis of how Rancher Desktop works on WSL2.
- The topic of Docker context and registry turns out to be more interesting than it seems. Need to study deeper

#### Ideas

- Create maximally complex services and infrastructure. Then add monitoring and observability. This will make it interesting to migrate everything to a new platform. By "interesting" I mean that many things will break and we'll need to figure out and fix them.

