import { Request, Response } from 'express';
import { Car } from '../models';

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
};

export const updateCars = async (req: Request, res: Response) => {
  try {
    const carsToUpdate = req.body;

    if (!Array.isArray(carsToUpdate)) {
      res
        .status(400)
        .json({ message: 'Invalid data format. Expected an array of cars.' });
    }

    await Car.deleteMany({});
    const updatedCars = await Car.insertMany(carsToUpdate);

    res.status(200).json(updatedCars);
  } catch (error) {
    console.error('Error updating cars:', error);
    res.status(500).json({ message: 'Failed to update cars' });
  }
};
