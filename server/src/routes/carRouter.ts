/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from 'express';
import { createBooking, getAvailableCars } from '../controllers';

export const carRouter = Router();

// @ts-ignore
carRouter.get('/available', getAvailableCars);
// @ts-ignore
carRouter.post('/book', createBooking);
