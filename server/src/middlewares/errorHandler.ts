import { Request, Response } from 'express';
import { MESSAGES_ERROR } from '../constant';
import { logger } from '../utils/logger.util';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (err: AppError, req: Request, res: Response) => {
  logger.error(err);
  res.status(err.status || 500).json({
    message: err.message || MESSAGES_ERROR.SERVER_ERROR,
  });
};
