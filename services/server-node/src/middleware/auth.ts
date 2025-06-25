import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    idToken?: string;
    accessToken?: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const idToken = req.header("x-amzn-oidc-data");
  const accessToken = req.header("x-amzn-oidc-accesstoken");

  console.log("ID Token:", idToken ? "Present" : "Not present");
  console.log("Access Token:", accessToken ? "Present" : "Not present");

  // Attach tokens to request object for use in route handlers
  if (idToken || accessToken) {
    req.user = {
      idToken: idToken || undefined,
      accessToken: accessToken || undefined
    };
  }

  // Attach tokens to response headers for debugging
  res.setHeader("X-Client-ID-Token", idToken || "");
  res.setHeader("X-Client-Access-Token", accessToken || "");

  next();
}; 