import { ICar } from '../models';

export const calculateTotalPrice = (
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
