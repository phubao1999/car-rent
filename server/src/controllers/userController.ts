import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models';
import { envConfig } from '../config';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, envConfig.jwtSecret, {
    expiresIn: '30d',
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
