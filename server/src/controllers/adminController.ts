import { Request, Response } from 'express';

export const adminTestController = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Admin test route',
  });
};

export const adminLogoutController = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
