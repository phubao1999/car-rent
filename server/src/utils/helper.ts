import { Request } from 'express';
import { ICar, IPeriod, ISeason, Season } from '../models';

type ApiResponse = {
  status: number;
  message: string;
};

export const calculateTotalPrice = async (
  car: ICar,
  startDate: Date,
  endDate: Date,
): Promise<number> => {
  let totalPrice = 0;
  const currentDate = new Date(startDate);
  const seasons = await Season.find();

  while (currentDate <= endDate) {
    let dailyPrice = car.offSeasonPrice;
    for (const season of seasons) {
      for (const period of season.periods) {
        const periodStart = new Date(period.startDate);
        const periodEnd = new Date(period.endDate);
        if (currentDate >= periodStart && currentDate <= periodEnd) {
          dailyPrice =
            car[(season as ISeason).code as keyof ICar] || car.offSeasonPrice;
          break;
        }
      }
    }
    totalPrice += dailyPrice;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return totalPrice;
};

export const isApiResponse = (obj: unknown): obj is ApiResponse => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'status' in obj &&
    'message' in obj &&
    typeof obj.status === 'number' &&
    typeof obj.message === 'string'
  );
};

export const createBookingValidate = (req: Request): boolean => {
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
    return false;
  }
  return true;
};

export const isValidSeason = (season: ISeason) =>
  season.name &&
  Array.isArray(season.periods) &&
  season.periods.length > 0 &&
  season.periods.every(
    (period: IPeriod) =>
      period.startDate &&
      period.endDate &&
      new Date(period.startDate) < new Date(period.endDate),
  );
