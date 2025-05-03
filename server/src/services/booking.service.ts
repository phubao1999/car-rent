import { BookingRepository, CarRepository } from "../repositories";
import { calculateTotalPrice } from "../utils/helper";

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
      throw { status: 400, message: 'Start date must be before end date.' };
    }

    const licenseExpiry = new Date(drivingLicenseExpiry);
    if (licenseExpiry < end) {
      throw {
        status: 400,
        message: 'Driving license must be valid through the booking period.',
      };
    }

    const car = await this.carRepository.findById(carId);
    if (!car) {
      throw { status: 404, message: 'Car not found.' };
    }

    const overlappingBookings =
      await this.bookingRepository.countOverlappingBookings(carId, start, end);

    if (overlappingBookings >= car.stock) {
      throw {
        status: 400,
        message: 'This car is fully booked for the selected dates.',
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
