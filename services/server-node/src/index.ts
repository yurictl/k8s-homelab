import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log("App is starting");

// Middleware
app.use(morgan('combined'));
app.use(express.json());

// Add CORS middleware
app.use(cors({
  origin: '*', // Configure appropriately for production
  credentials: true
}));

// Mount routes
app.use('/', routes);

// Legacy API2 routes (keeping for backward compatibility)
const userRouter = express.Router();
app.use('/api2', userRouter);

userRouter.get('/health', (req, res) => {
  res.send('I am ok');
});

userRouter.get('/', (req, res) => {
  res.send('Hello from the root path');
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
  console.log(`Readiness check available at: http://localhost:${PORT}/ready`);
});

// Graceful shutdown handling
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} signal received.`);
  server.close(() => {
    console.log('Closed out remaining connections');
    // Additional cleanup tasks go here, e.g., close database connection
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));