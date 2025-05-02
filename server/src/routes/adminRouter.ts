import { Router } from 'express';
import {
  adminLogoutController,
  adminTestController,
  getBookings,
  getCars,
  getSeasonsController,
  updateCars,
  updateSeasonsController,
} from '../controllers';
import { admin, protect } from '../middlewares';

export const adminRouter = Router();

adminRouter.get('/test', protect, admin, adminTestController);
adminRouter.get('/logout', protect, admin, adminLogoutController);
adminRouter.get('/seasons', protect, admin, getSeasonsController);
adminRouter.put('/seasons', protect, admin, updateSeasonsController);
adminRouter.get('/cars', protect, admin, getCars);
adminRouter.put('/cars', protect, admin, updateCars);
adminRouter.get('/bookings', protect, admin, getBookings);
