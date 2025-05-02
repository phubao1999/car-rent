import { Request, Response } from 'express';
import { Booking, Car } from '../models';
import { calculateTotalPrice } from '../utils/helper';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { name, email, drivingLicenseExpiry, carId, startDate, endDate } =
      req.body;
    if (
      !name ||
      !email ||
      !drivingLicenseExpiry ||
      !carId ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return res
        .status(400)
        .json({ message: 'Start date must be before end date.' });
    }
    const licenseExpiry = new Date(drivingLicenseExpiry);
    if (licenseExpiry < end) {
      return res.status(400).json({
        message: 'Driving license must be valid through the booking period.',
      });
    }
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found.' });
    } else {
      // Check for overlapping bookings for the same car
      const overlappingBookings = await Booking.countDocuments({
        carId,
        $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
      });

      if (overlappingBookings >= car.stock) {
        return res.status(400).json({
          message: 'This car is fully booked for the selected dates.',
        });
      }

      const totalPrice = await calculateTotalPrice(car, start, end);
      const booking = new Booking({
        name,
        email,
        drivingLicenseExpiry: licenseExpiry,
        carId,
        startDate: start,
        endDate: end,
        totalPrice,
      });
      await booking.save();

      // Send success response
      return res.status(201).json({
        message: 'Booking created successfully.',
        booking,
      });
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Failed to create booking.' });
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

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (start > end) {
      return res
        .status(400)
        .json({ message: 'Start date must be before end date.' });
    }

    // Find all bookings that overlap with the given time slot
    const overlappingBookings = await Booking.aggregate([
      {
        $match: {
          $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
        },
      },
      {
        $group: {
          _id: '$carId',
          bookingCount: { $sum: 1 },
        },
      },
    ]);

    const bookingCounts = overlappingBookings.reduce(
      (acc, booking) => {
        acc[booking._id.toString()] = booking.bookingCount;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Find all cars and calculate remaining stock
    const cars = await Car.find();
    const availableCars = cars
      .map((car) => {
        const bookedCount = bookingCounts[car._id.toString()] || 0;
        const remainingStock = car.stock - bookedCount;
        if (remainingStock > 0) {
          return {
            ...car.toObject(),
            remainingStock,
          };
        }

        return null;
      })
      .filter((car) => car !== null);

    const days =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const carsWithPricing = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      availableCars.map(async (car: any) => {
        const totalPrice = await calculateTotalPrice(car, start, end);
        const averagePrice = totalPrice / days;

        return {
          ...car,
          totalPrice,
          averagePrice,
        };
      }),
    );

    return res.status(200).json(carsWithPricing);
  } catch (error) {
    console.error('Error fetching available cars:', error);
    return res.status(500).json({ message: 'Failed to fetch available cars.' });
  }
};
