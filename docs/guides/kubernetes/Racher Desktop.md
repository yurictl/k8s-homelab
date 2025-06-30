# Rancher Desktop Notes

## Rancher Desktop and Docker

For using Rancher Desktop for a local Kubernetes cluster:

- The docker CLI looks at your system Docker (/var/run/docker.sock), not the one that Rancher creates.

### Not very correct options

- One option is that after building images with Docker, you must import them into containerd for Kubernetes to see them. I don't like this because it creates "extra" steps.
- You can run a local registry and push images there. But again, a local registry looks like an extra entity.

### Better options

Use nerdctl

- Switch Rancher Desktop to use containerd.

- Use [nerdctl](https://github.com/containerd/nerdctl), which comes with Rancher Desktop, to build images.

```bash
nerdctl -n k8s.io -t server-python:latest  services/server-python
nerdctl build -n k8s.io -t server-node:latest ./services/server-node
nerdctl build -n k8s.io -t homelab-frontend:latest ./services/homelab-frontend