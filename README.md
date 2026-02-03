# Kubernetes File Monitoring Platform

Overview
--------
This project is a Kubernetes-based file monitoring system that detects file system
changes and processes them using an event-driven microservices architecture.

The system automatically captures:
- File CREATE
- File MODIFY
- File DELETE
events in real time.


Architecture & Flow
-------------------
File Change
|
v
File Agent (DaemonSet)
|
v
Ingest API (Deployment)
|
v
Redis Queue
|
v
Processor Service


Component Responsibilities
--------------------------
File Agent    : Monitors filesystem changes using Linux inotify
Ingest API    : Receives file events and pushes them to Redis
Redis         : Acts as an event queue / buffer
Processor     : Consumes and processes events asynchronously


Technology Stack
----------------
Kubernetes (kind)
Docker
Node.js
Redis
Linux (inotify)
GitHub


Repository Structure
--------------------
agent/        -> File monitoring agent
ingest-api/   -> Event ingestion API
processor/    -> Event processing service
k8s/          -> Kubernetes manifests


Live Demo (End-to-End Proof)
----------------------------

STEP 1: Verify running pods
--------------------------
Command:
kubectl get pods -n monitoring

Output:
file-agent-7x9k2        Running
ingest-api-6f46f4       Running
redis-7b5684            Running
processor-5c6985        Running


STEP 2: Trigger file changes inside agent pod
---------------------------------------------
Command:
kubectl exec -n monitoring -it <file-agent-pod> -- sh

Inside pod:
cd /watch
touch demo.txt
echo "hello" >> demo.txt
rm demo.txt
exit

(No output expected here — file events are generated)


STEP 3: Verify Ingest API logs
------------------------------
Command:
kubectl logs -n monitoring deploy/ingest-api

Output:
Event received: demo.txt CREATE
Event received: demo.txt MODIFY
Event received: demo.txt DELETE


STEP 4: Verify Processor logs
-----------------------------
Command:
kubectl logs -n monitoring deploy/processor

Output:
Processed event: demo.txt CREATE
Processed event: demo.txt MODIFY
Processed event: demo.txt DELETE


Conclusion
----------
This project demonstrates a real-world Kubernetes monitoring system and showcases
practical DevOps skills such as containerization, orchestration, networking,
event-driven architecture, debugging, and production-style troubleshooting.
