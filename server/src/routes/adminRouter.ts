import { Router } from 'express';
import { adminLogoutController, adminTestController } from '../controllers';
import { admin, protect } from '../middlewares';

export const adminRouter = Router();

adminRouter.get('/test', protect, admin, adminTestController);
adminRouter.get('/logout', protect, admin, adminLogoutController);
