import { Request, Response } from 'express';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (err: AppError, req: Request, res: Response) => {
  console.error(err); // Log the error for debugging
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
