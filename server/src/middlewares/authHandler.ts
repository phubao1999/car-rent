import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { envConfig } from '../config';

interface JwtPayload {
  id: string;
  role: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, envConfig.jwtSecret) as JwtPayload;

      req.body.user = await User.findById(decoded.id).select('-password');
      req.body.role = decoded.role;

      next();
    } catch {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.user?.role !== 'admin') {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};
