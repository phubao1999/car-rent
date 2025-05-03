import { Car } from '../models';

export class CarRepository {
  async findAll() {
    return Car.find();
  }
  async findById(carId: string) {
    return Car.findById(carId);
  }
}
