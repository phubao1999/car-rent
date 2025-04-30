import { Router } from 'express';
import { loginController } from '../controllers';

export const userRouter = Router();

userRouter.post('/login', loginController);
