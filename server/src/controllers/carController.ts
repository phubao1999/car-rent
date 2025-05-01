import { Request, Response } from 'express';
import { Booking, Car, ICar } from '../models';

export const getAvailableCars = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res
        .status(400)
        .json({ message: 'Start date and end date are required.' });
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (start > end) {
      res.status(400).json({ message: 'Start date must be before end date.' });
    }

    // Find all bookings that overlap with the given time slot
    const overlappingBookings = await Booking.find({
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    }).select('carId');

    const bookedCarIds = overlappingBookings.map((booking) =>
      booking.carId.toString(),
    );

    // Find all cars that are not booked during the time slot
    const availableCars = await Car.find({
      _id: { $nin: bookedCarIds },
    });

    // Calculate total price and average daily price for each car
    const days =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const carsWithPricing = availableCars.map((car) => {
      const totalPrice = calculateTotalPrice(car, start, end);
      const averagePrice = totalPrice / days;

      return {
        ...car.toObject(),
        totalPrice,
        averagePrice,
      };
    });

    res.status(200).json(carsWithPricing);
  } catch (error) {
    console.error('Error fetching available cars:', error);
    res.status(500).json({ message: 'Failed to fetch available cars.' });
  }
};

const calculateTotalPrice = (
  car: ICar,
  startDate: Date,
  endDate: Date,
): number => {
  let totalPrice = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const month = currentDate.getMonth() + 1;
    let dailyPrice = car.offSeasonPrice;

    if (month >= 6 && month <= 8) {
      dailyPrice = car.peakSeasonPrice;
    } else if (month === 5 || month === 9) {
      dailyPrice = car.midSeasonPrice;
    }

    totalPrice += dailyPrice;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return totalPrice;
};
