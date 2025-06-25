import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  // Server configuration
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // AWS ALB configuration
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    enableAuth: process.env.ENABLE_AUTH === 'true',
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableMorgan: process.env.ENABLE_MORGAN !== 'false',
  },
  
  // Security configuration
  security: {
    enableCors: process.env.ENABLE_CORS === 'true',
    corsOrigin: process.env.CORS_ORIGIN || '*',
  }
};

export default config; 