import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { envConfig } from '../config';
import { MESSAGES_ERROR, MESSAGES_ERROR_VALIDATED } from '../constant';
import { logger } from '../utils/logger.util';

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
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    throw {
      status: 401,
      message: MESSAGES_ERROR_VALIDATED.TOKEN_REQUIRED,
    };
  }
  try {
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, envConfig.jwtSecret) as JwtPayload;
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({ message: MESSAGES_ERROR.USER_NOT_FOUND });
    }
    res.locals.user = user;
    res.locals.role = decoded.role;

    next();
  } catch (error) {
    logger.error('JWT Verification Error:', error);
    throw {
      status: 401,
      message: MESSAGES_ERROR.JWT_INVALID,
    };
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user?.role !== 'admin') {
    throw {
      status: 401,
      message: MESSAGES_ERROR.UNAUTHORIZED,
    };
  }
  next();
};
