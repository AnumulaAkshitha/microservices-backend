// index.js
// WHY: This is the main entry point of our microservice
// It creates a REST API server that listens for requests
// In real DevOps, each microservice runs independently
// and can be scaled separately on cloud platforms

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// WHY: This tells Express to accept JSON data in requests
app.use(express.json());

// In-memory database (simulates MySQL for demo)
// WHY: In production this connects to MySQL/MariaDB/PostgreSQL
let tasks = [
  { id: 1, title: "Set up CI/CD pipeline", status: "completed", priority: "high" },
  { id: 2, title: "Configure monitoring dashboard", status: "completed", priority: "high" },
  { id: 3, title: "Deploy to production", status: "pending", priority: "medium" },
];

// ============================================
// HEALTH CHECK ENDPOINT
// WHY: Every microservice needs a health check
// DevOps tools like Kubernetes ping this to know
// if the service is alive. If it returns 200, all good!
// ============================================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "task-management-service",
    timestamp: new Date().toISOString(),
    uptime: process.uptime().toFixed(2) + "s"
  });
});

// ============================================
// GET ALL TASKS
// WHY: REST API endpoint to fetch all tasks
// HTTP GET = read data
// ============================================
app.get('/api/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// ============================================
// GET SINGLE TASK
// WHY: Fetch one task by ID
// :id is a dynamic parameter
// ============================================
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  res.status(200).json({ success: true, data: task });
});

// ============================================
// CREATE TASK
// WHY: REST API endpoint to add a new task
// HTTP POST = create data
// ============================================
app.post('/api/tasks', (req, res) => {
  const { title, priority } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: "Title is required" });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    status: "pending",
    priority: priority || "medium"
  };
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

// ============================================
// UPDATE TASK
// WHY: REST API endpoint to update a task
// HTTP PUT = update data
// ============================================
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  const { title, status, priority } = req.body;
  if (title) task.title = title;
  if (status) task.status = status;
  if (priority) task.priority = priority;
  res.status(200).json({ success: true, data: task });
});

// ============================================
// DELETE TASK
// WHY: REST API endpoint to delete a task
// HTTP DELETE = remove data
// ============================================
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  tasks.splice(index, 1);
  res.status(200).json({ success: true, message: "Task deleted successfully" });
});

// ============================================
// START SERVER
// WHY: process.env.PORT lets cloud platforms
// like GCP/AWS/Azure set the port automatically
// ============================================
app.listen(PORT, () => {
  console.log("========================================");
  console.log("🚀 Microservice is RUNNING");
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
  console.log(`📋 Tasks:  http://localhost:${PORT}/api/tasks`);
  console.log("========================================");
});