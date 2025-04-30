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
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(401).json({ message: 'User not found' });
      }
      res.locals.user = user;
      res.locals.role = decoded.role;

      next();
    } catch (error) {
      console.error('JWT Verification Error:', error); // Log the error for debugging
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If no token is provided
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user?.role !== 'admin') {
    res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};
