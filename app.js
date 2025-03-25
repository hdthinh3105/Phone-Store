// app.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/index');
const os = require('os');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add instance info middleware
app.use((req, res, next) => {
  res.setHeader('X-Instance-Id', `${os.hostname()}:${process.env.PORT}`);
  next();
});

// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    instance: {
      hostname: os.hostname(),
      port: process.env.PORT,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: os.loadavg()
    }
  });
});

// Instance info endpoint
app.get('/instance', (req, res) => {
  res.json({
    instanceId: `${os.hostname()}:${process.env.PORT}`,
    timestamp: new Date(),
    headers: req.headers
  });
});

// Port configuration
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Instance ID: ${os.hostname()}:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});