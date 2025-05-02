import { ICar, ISeason, Season } from '../models';

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
