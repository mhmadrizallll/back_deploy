import { carRepository } from "../repositories/CarRepository";
import { CarsModel } from "../models/cars.model";

class CarService {
  async getAllCars() {
    return await carRepository.getAllCars();
  }
  async getCarIsDeletedFalse() {
    return await carRepository.getCarIsDeletedFalse();
  }
  async getCarById(id: string) {
    return await carRepository.getCarById(id);
  }
  async createCar(car: Partial<CarsModel>): Promise<void> {
    await carRepository.createCar(car);
    return;
  }
  async updateCar(id: string, car: Partial<CarsModel>): Promise<CarsModel> {
    return await carRepository.updateCar(id, car);
  }

  async softDeleteCar(id: string, deleteBy: string) {
    return await carRepository.softDeleteCar(id, deleteBy);
  }

  async restoreCar(id: string, restoredBy: string) {
    return await carRepository.restoreCar(id, restoredBy);
  }
}

const carService = new CarService();

export { carService };
