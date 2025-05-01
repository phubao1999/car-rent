import { Router } from 'express';
import { getAvailableCars } from '../controllers';

export const carRouter = Router();

carRouter.get('/available', getAvailableCars);
