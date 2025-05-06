import { MESSAGES_ERROR, MESSAGES_ERROR_VALIDATED } from '../constant';
import { BookingRepository, CarRepository } from '../repositories';
import { calculateTotalPrice } from '../utils/helper';

export class BookingService {
  constructor(
    private bookingRepository = new BookingRepository(),
    private carRepository = new CarRepository(),
  ) {}

  async createBooking(data: {
    name: string;
    email: string;
    drivingLicenseExpiry: string;
    carId: string;
    startDate: string;
    endDate: string;
  }) {
    const { name, email, drivingLicenseExpiry, carId, startDate, endDate } =
      data;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      throw { status: 400, message: MESSAGES_ERROR_VALIDATED.PERIOD_INVALID };
    }

    const licenseExpiry = new Date(drivingLicenseExpiry);
    if (licenseExpiry < end) {
      throw {
        status: 400,
        message: MESSAGES_ERROR_VALIDATED.BOOKING_LICENSE_EXPIRY,
      };
    }

    const car = await this.carRepository.findById(carId);
    if (!car) {
      throw { status: 404, message: MESSAGES_ERROR.CAR_NOT_FOUND };
    }

    const overlappingBookings =
      await this.bookingRepository.countOverlappingBookings(carId, start, end);

    if (overlappingBookings >= car.stock) {
      throw {
        status: 400,
        message: MESSAGES_ERROR.OVER_LAPPING_BOOKING,
      };
    }

    const totalPrice = await calculateTotalPrice(car, start, end);

    const booking = await this.bookingRepository.create({
      name,
      email,
      drivingLicenseExpiry: licenseExpiry,
      carId,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    return booking;
  }
}
