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
      api: '/api'
    }
  });
});

// Mount route modules
router.use('/health', healthRoutes);
router.use('/api', apiRoutes);

export default router; 