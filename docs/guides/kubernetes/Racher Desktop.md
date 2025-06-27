# Rancher Desktop Notes

If using Rancher Desktop for a local Kubernetes cluster:

- Docker and Kubernetes use different runtimes (Docker vs containerd).

- After building images with Docker, you must import them into containerd for Kubernetes to see them:

  ```bash
  docker save <image>:<tag> | sudo ctr -n k8s.io images import -
  ```

- In Kubernetes manifests, set:

  ```yaml
  imagePullPolicy: Never
  ```

- This ensures your local images are used by the cluster.
