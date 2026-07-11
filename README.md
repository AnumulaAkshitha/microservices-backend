# Containerized Microservices Backend 🐳

A cloud-native containerized REST API built with Node.js and Docker,
following microservices architecture principles for GCP/AWS/Azure deployments.

## What is a Microservice?
Instead of one big application, microservices break the app into
small independent services. Each service:
- Runs independently
- Can be scaled separately on cloud platforms
- Communicates via REST APIs

## API Endpoints
| Method | Endpoint | What it does |
|--------|----------|-------------|
| GET | `/health` | Health check — Kubernetes pings this |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## How to Run Locally
```bash
npm install
node index.js
```

## How to Run with Docker
```bash
docker build -t microservices-backend .
docker run -p 3000:3000 microservices-backend
```

## Test the API
http://localhost:3000/health
http://localhost:3000/api/tasks

## Project Structure
microservices-backend/
├── index.js         # Main REST API server
├── Dockerfile       # Container configuration
├── package.json     # Dependencies
└── .gitignore       # Excludes node_modules

## Tech Stack
- Node.js + Express.js
- Docker (containerization)
- REST API architecture
- Git / GitHub
- GCP / AWS / Azure compatible

## Branching Strategy
feature/rest-api → dev → main

## Key Concepts Demonstrated
- RESTful API design (GET, POST, PUT, DELETE)
- Health check endpoint for Kubernetes/DevOps monitoring
- Docker containerization for cloud-native deployment
- Environment-based port configuration (process.env.PORT)
- Microservices architecture principles
- Horizontal scaling support for GCP/AWS/Azure