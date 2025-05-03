import { BookingRepository, CarRepository } from '../repositories';
import { calculateTotalPrice } from '../utils/helper';

export class CarService {
  constructor(
    private carRepository = new CarRepository(),
    private bookingRepository = new BookingRepository(),
  ) {}

  async getAvailableCars(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const overlappingBookings =
      await this.bookingRepository.findOverlappingBookings(start, end);

    const bookingCounts = overlappingBookings.reduce(
      (acc, booking) => {
        acc[booking._id.toString()] = booking.bookingCount;
        return acc;
      },
      {} as Record<string, number>,
    );

    const cars = await this.carRepository.findAll();
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

    return carsWithPricing;
  }
}
