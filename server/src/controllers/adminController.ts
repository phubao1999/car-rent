import { Request, Response } from 'express';
import {
  MESSAGES,
  MESSAGES_ERROR,
  MESSAGES_ERROR_VALIDATED,
} from '../constant';
import { Booking, Car, Season } from '../models';
import { isValidSeason } from '../utils/helper';
import { logger } from '../utils/logger.util';

export const adminTestController = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Admin test route',
  });
};

export const adminLogoutController = (req: Request, res: Response) => {
  res.status(200).json({ message: MESSAGES.LOGOUT_SUCCESS });
};

export const getSeasonsController = async (req: Request, res: Response) => {
  try {
    const seasons = await Season.find();
    res.status(200).json(seasons);
  } catch (error) {
    logger.error('Error fetching seasons:', error);
    res.status(500).json({ message: MESSAGES_ERROR.SEASONS });
  }
};

export const updateSeasonsController = async (req: Request, res: Response) => {
  try {
    const { seasons } = req.body;

    if (!Array.isArray(seasons) || seasons.length === 0) {
      res.status(400).json({
        message: MESSAGES_ERROR_VALIDATED.SEASONS_PAYLOAD,
      });
    }

    if (!seasons.every(isValidSeason)) {
      res.status(400).json({
        message: MESSAGES_ERROR_VALIDATED.SEASONS_TYPE,
      });
    }

    await Season.deleteMany({});
    await Season.insertMany(seasons);

    res.status(200).json({ message: MESSAGES.UPDATED_SEASON });
  } catch (error) {
    logger.error('Error creating booking: %o', error);
    res.status(500).json({ message: MESSAGES_ERROR.UPDATE_SEASONS });
  }
};

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    logger.error('Error fetching cars:', error);
    res.status(500).json({ message: MESSAGES_ERROR.GET_CARS });
  }
};

export const updateCars = async (req: Request, res: Response) => {
  try {
    const carsToUpdate = req.body;

    if (!Array.isArray(carsToUpdate)) {
      res.status(400).json({ message: MESSAGES_ERROR_VALIDATED.CARS_PAYLOAD });
    }

    await Car.deleteMany({});
    const updatedCars = await Car.insertMany(carsToUpdate);

    res.status(200).json(updatedCars);
  } catch (error) {
    logger.error('Error updating cars:', error);
    res.status(500).json({ message: MESSAGES_ERROR.UPDATE_CAR });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate('carId', 'brand model');
    res.status(200).json(bookings);
  } catch (error) {
    logger.error('Error fetching bookings:', error);
    res.status(500).json({ message: MESSAGES_ERROR.BOOKING });
  }
};
