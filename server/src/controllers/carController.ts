import { Request, Response } from 'express';
import {
  MESSAGES,
  MESSAGES_ERROR,
  MESSAGES_ERROR_VALIDATED,
} from '../constant';
import { BookingService, CarService } from '../services';
import { createBookingValidate, isApiResponse } from '../utils/helper';
import { logger } from '../utils/logger.util';

const carService = new CarService();
const bookingService = new BookingService();

export const createBooking = async (req: Request, res: Response) => {
  try {
    if (!createBookingValidate(req)) {
      return res
        .status(400)
        .json({ message: MESSAGES_ERROR_VALIDATED.BOOKING_PAYLOAD });
    }
    const booking = await bookingService.createBooking(req.body);
    return res.status(201).json({
      message: MESSAGES.BOOKING_CREATED,
      booking,
    });
  } catch (error) {
    logger.error('Error creating booking:', error);
    if (isApiResponse(error)) {
      const status = error.status;
      const message = error.message;
      return res.status(status).json({ message });
    } else {
      return res.status(500).json({
        message: MESSAGES_ERROR.BOOKING_FAILED,
      });
    }
  }
};

export const getAvailableCars = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: MESSAGES_ERROR_VALIDATED.AVAILABLE_CARS_PERIOD });
    }

    if (new Date(startDate as string) > new Date(endDate as string)) {
      return res.status(400).json({
        message: MESSAGES_ERROR_VALIDATED.PERIOD_INVALID,
      });
    }

    const cars = await carService.getAvailableCars(
      startDate as string,
      endDate as string,
    );
    return res.status(200).json(cars);
  } catch (error) {
    logger.error('Error fetching available cars:', error);
    return res.status(500).json({ message: MESSAGES_ERROR.GET_AVAILABLE_CARS });
  }
};
