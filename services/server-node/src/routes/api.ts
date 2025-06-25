import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'API v2 is running',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

router.get('/hello', (req: Request, res: Response) => {
  res.setHeader("AK-Token", "This is a header");
  res.json({ 
    message: 'Hello from the backend!',
    accessToken: req.header("x-amzn-oidc-accesstoken"),
    idToken: req.header("x-amzn-oidc-data"),
    timestamp: new Date().toISOString()
  });
});

router.get('/env', (req: Request, res: Response) => {
  // Only return non-sensitive environment variables
  const safeEnv = Object.keys(process.env)
    .filter(key => !key.toLowerCase().includes('secret') && 
                   !key.toLowerCase().includes('password') && 
                   !key.toLowerCase().includes('key') &&
                   !key.toLowerCase().includes('token'))
    .reduce((obj, key) => {
      obj[key] = process.env[key];
      return obj;
    }, {} as Record<string, string | undefined>);
  
  res.json({ 
    message: 'Environment variables (filtered)',
    environment: safeEnv
  });
});

router.get('/goodbye', (req: Request, res: Response) => {
  res.json({ 
    message: 'Goodbye from the backend!',
    timestamp: new Date().toISOString()
  });
});

export default router; 