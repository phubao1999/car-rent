import { Request, Response } from 'express';
import { BookingService, CarService } from '../services';
import { createBookingValidate, isApiResponse } from '../utils/helper';

const carService = new CarService();
const bookingService = new BookingService();

export const createBooking = async (req: Request, res: Response) => {
  try {
    if (!createBookingValidate(req)) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const booking = await bookingService.createBooking(req.body);
    return res.status(201).json({
      message: 'Booking created successfully.',
      booking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    if (isApiResponse(error)) {
      const status = error.status;
      const message = error.message;
      return res.status(status).json({ message });
    } else {
      return res.status(500).json({
        message: 'Failed to create booking.',
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
        .json({ message: 'Start date and end date are required.' });
    }

    if (new Date(startDate as string) > new Date(endDate as string)) {
      return res
        .status(400)
        .json({ message: 'Start date must be before end date.' });
    }

    const cars = await carService.getAvailableCars(
      startDate as string,
      endDate as string,
    );
    return res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching available cars:', error);
    return res.status(500).json({ message: 'Failed to fetch available cars.' });
  }
};
