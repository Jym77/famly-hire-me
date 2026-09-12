import { Request, Response, NextFunction } from 'express';

export function validateToken(token: string | undefined): boolean {
  return token === 'admin';
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.query.token as string;
  if (!validateToken(token)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
  }
  next();
};
