import { Router } from 'express';
import { createBooking, getAvailableCars } from '../controllers';

export const carRouter = Router();

carRouter.get('/available', getAvailableCars);
carRouter.post('/book', createBooking);
