# Kubernetes File Monitoring Platform

## Overview
This project is a Kubernetes-based file monitoring system that detects file system
changes and processes them using an event-driven microservices architecture.

The system automatically captures:
- File CREATE
- File MODIFY
- File DELETE

events in real time.

---

## Architecture & Flow

File Change  
↓  
File Agent (DaemonSet)  
↓  
Ingest API (Deployment)  
↓  
Redis Queue  
↓  
Processor Service  

### Component Responsibilities
- File Agent: Monitors filesystem changes using Linux inotify
- Ingest API: Receives file events and pushes them to Redis
- Redis: Acts as an event queue/buffer
- Processor: Consumes and processes events asynchronously

---

## Technology Stack
- Kubernetes (kind)
- Docker
- Node.js
- Redis
- Linux (inotify)
- GitHub

---

## Repository Structure
agent/        -> File monitoring agent  
ingest-api/   -> Event ingestion API  
processor/    -> Event processing service  
k8s/          -> Kubernetes manifests  

---

## Live Demo (End-to-End Proof)

# STEP 1: Verify running pods
kubectl get pods -n monitoring

# STEP 2: Trigger file changes inside agent pod
kubectl exec -n monitoring -it <file-agent-pod> -- sh
cd /watch
touch demo.txt
echo "hello" >> demo.txt
rm demo.txt
exit

# STEP 3: Verify Ingest API logs
kubectl logs -n monitoring deploy/ingest-api

# Expected output:
# Event received: demo.txt CREATE
# Event received: demo.txt MODIFY
# Event received: demo.txt DELETE

# STEP 4: Verify Processor logs
kubectl logs -n monitoring deploy/processor

# Expected output:
# Processed event: demo.txt CREATE
# Processed event: demo.txt MODIFY
# Processed event: demo.txt DELETE
