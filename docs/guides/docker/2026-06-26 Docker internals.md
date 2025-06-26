# Docker Internals: Containerd Deep Dive

## Overview

This document explores Docker's internal architecture through containerd, the low-level container runtime that Docker uses as its backend.

## Containerd (ctr)

`ctr` is a low-level containerd client that provides direct access to containers, images, and snapshots through gRPC API.

### Listing Running Containers

```bash
ctr -n moby containers list
```

**Why `moby` namespace?** Docker uses containerd as its backend but places its containers and images in a separate `moby` namespace. Commands without `-n moby` look in the default namespace and show nothing.

**Note:** Kubernetes uses the `k8s.io` namespace.

### Example: Container Discovery

After starting a container via Docker, we can see it through ctr:

```bash
# Docker view
yutimer@P1:~/personal/k8s-homelab/services/server-python$ docker ps
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS                   PORTS                                       NAMES
b7fe5eab65d0   server-python   "uvicorn app.main:ap…"   8 minutes ago   Up 8 minutes (healthy)   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   server-python

# Containerd view
yutimer@P1:~/personal/k8s-homelab/services/server-python$ sudo ctr -n moby containers list
CONTAINER                                                           IMAGE    RUNTIME                  
b7fe5eab65d09a05d30a2bf640c6942f8556809717ff85ae8343b085eec6c6f3    -        io.containerd.runc.v2
```

### Getting Container Information

```bash
sudo ctr -n moby containers info b7fe5eab65d09a05d30a2bf640c6942f8556809717ff85ae8343b085eec6c6f3
```

**Comparison:** Compared with `docker container inspect b7fe5eab65d0`, the ctr output contains much more detailed information about runc, capabilities, cgroups, and seccomp.

### Container Tasks

A **Task** is the container process (its runtime state) running through containerd and runc. A **Container** in containerd is configuration and metadata; a **Task** is its actual execution.

```bash
sudo ctr -n moby tasks list
yutimer@P1:~/personal/k8s-homelab/services/server-python$ sudo ctr -n moby tasks list
TASK                                                                PID      STATUS    
b7fe5eab65d09a05d30a2bf640c6942f8556809717ff85ae8343b085eec6c6f3    18596    RUNNING
```

### Container Execution

```bash
sudo ctr -n moby tasks exec --exec-id bash b7fe5eab65d09a05d30a2bf640c6942f8556809717ff85ae8343b085eec6c6f3 /bin/bash
```

## Runc

### Verifying Runc Usage

```bash
yutimer@P1:~/personal/k8s-homelab/services/server-python$ docker info | grep -i runtime
 Runtimes: io.containerd.runc.v2 runc
 Default Runtime: runc
```

## Containerd Shim

### Finding Shim Process

```bash
yutimer@P1:~/personal/k8s-homelab/services/server-python$ ps -ax | grep containerd-shim
18576 ?        Sl     0:00 /usr/bin/containerd-shim-runc-v2 -namespace moby -id b7fe5eab65d09a05d30a2bf640c6942f8556809717ff85ae8343b085eec6c6f3 -address /run/containerd/containerd.sock
22421 pts/6    S+     0:00 grep --color=auto containerd-shim
```

### Process Tree Analysis

```bash
yutimer@P1:~/personal/k8s-homelab/services/server-python$ pstree -p 18576
containerd-shim(18576)─┬─uvicorn(18596)─┬─{uvicorn}(18621)
                       │                ├─{uvicorn}(18622)
                       │                ├─{uvicorn}(18623)
                       │                ├─{uvicorn}(18624)
                       │                └─{uvicorn}(18682)
                       ├─{containerd-shim}(18577)
                       ├─{containerd-shim}(18578)
                       ├─{containerd-shim}(18579)
                       ├─{containerd-shim}(18580)
                       ├─{containerd-shim}(18581)
                       ├─{containerd-shim}(18582)
                       ├─{containerd-shim}(18583)
                       ├─{containerd-shim}(18584)
                       ├─{containerd-shim}(18619)
                       └─{containerd-shim}(18681)
```

### Parent Process Analysis

Finding the parent process (expectedly containerd):

```bash
yutimer@P1:~/personal/k8s-homelab/services/server-python$ ps -o pid,ppid,cmd -p 18576
    PID    PPID CMD
  18576       1 /usr/bin/containerd-shim-runc-v2 -namespace moby -id b7fe5eab65d09a05d30a2bf640c6942f8556809717ff85ae8343b085
```

### Process File Analysis

```bash
sudo lsof -p 18576
```