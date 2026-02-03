# Kubernetes File Monitoring Platform

## 📌 What is this project?
This project is a **Kubernetes-based file monitoring system**.

It automatically detects:
- File **CREATE**
- File **MODIFY**
- File **DELETE**

events and processes them using an **event-driven microservices architecture**.

---

## 🧠 Project Flow (Easy Explanation)
File Change
↓
File Agent (DaemonSet)
↓
Ingest API (Deployment)
↓
Redis Queue
↓
Processor Service

### In simple words:
- **Agent** watches file changes
- **Ingest API** receives events
- **Redis** buffers events
- **Processor** processes events

---

## ⚙️ Technologies Used

- Kubernetes (kind)
- Docker
- Node.js
- Redis
- Linux (inotify)
- GitHub

---

## 📂 Repository Structure

agent/ → File monitoring agent
ingest-api/ → Event ingestion service
processor/ → Event processing service
k8s/ → Kubernetes manifests

---

## 🚀 Live Demo

### 1️⃣ Check running pods
```bash
kubectl get pods -n monitoring
kubectl exec -n monitoring -it <file-agent-pod> -- sh
cd /watch
touch demo.txt
echo "hello" >> demo.txt
rm demo.txt
exit
