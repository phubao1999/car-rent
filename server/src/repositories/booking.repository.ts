import { Booking } from '../models';

export class BookingRepository {
  async findOverlappingBookings(start: Date, end: Date) {
    return Booking.aggregate([
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
  }
  async countOverlappingBookings(carId: string, start: Date, end: Date) {
    return Booking.countDocuments({
      carId,
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    });
  }
  async create(data: {
    name: string;
    email: string;
    drivingLicenseExpiry: Date;
    carId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
  }) {
    const booking = new Booking(data);
    return booking.save();
  }
}
