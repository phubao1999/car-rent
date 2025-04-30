import { Request, Response } from 'express';

export const adminTestController = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Admin test route',
    user: req.body.user,
    role: req.body.role,
  });
};
