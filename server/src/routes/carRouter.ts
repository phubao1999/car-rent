import { Router } from 'express';
import { getCars, updateCars } from '../controllers';

export const carRouter = Router();

carRouter.get('/', getCars);
carRouter.put('/', updateCars);
