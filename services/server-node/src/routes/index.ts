import express from 'express';
import healthRoutes from './health';
import apiRoutes from './api';

const router = express.Router();

// Root path handler
router.get('/', (req, res) => {
  res.json({ 
    message: 'Node.js Service is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      ready: '/ready',
      hello: '/hello',
      env: '/env',
      goodbye: '/goodbye'
    }
  });
});

// Mount route modules
router.use('/health', healthRoutes);
router.use('/ready', (req, res) => {
  res.json({ 
    status: 'ready',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount API routes at root level (without /api prefix)
router.use('/', apiRoutes);

export default router; 