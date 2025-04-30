import { Router } from 'express';
import { adminTestController } from '../controllers';
import { admin, protect } from '../middlewares';

export const adminRouter = Router();

adminRouter.get('/test', protect, admin, adminTestController);
