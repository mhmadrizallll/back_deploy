import { CarsModel } from "../models/cars.model";

class CarRepository {
  async getAllCars(): Promise<CarsModel[]> {
    return await CarsModel.query();
  }
  async getCarIsDeletedFalse(): Promise<CarsModel[]> {
    return await CarsModel.query()
      .where({ is_deleted: false })
      .select(
        "id",
        "plate",
        "manufacture",
        "model",
        "image",
        "rentPerDay",
        "capacity",
        "description",
        "availableAt",
        "transmission",
        "available",
        "type",
        "year"
      );
  }

  async getCarById(id: string): Promise<CarsModel | undefined> {
    return await CarsModel.query().findById(id);
  }
  async createCar(car: Partial<CarsModel>): Promise<CarsModel> {
    return await CarsModel.query().insert(car);
  }
  async updateCar(id: string, car: Partial<CarsModel>): Promise<CarsModel> {
    return await CarsModel.query().patchAndFetchById(id, car);
  }

  async softDeleteCar(
    id: string,
    deleteBy: string
  ): Promise<CarsModel | null | undefined> {
    const car = await CarsModel.query().findById(id);
    if (car && !car.is_deleted) {
      return await CarsModel.query().patchAndFetchById(id, {
        is_deleted: true,
        deleted_by: deleteBy,
      });
      return null;
    }
  }
  async restoreCar(
    id: string,
    restoredBy: string
  ): Promise<CarsModel | undefined> {
    const car = await CarsModel.query().findById(id);
    if (car && car.is_deleted) {
      return await CarsModel.query().patchAndFetchById(id, {
        is_deleted: false,
        deleted_by: null || undefined,
        restored_by: restoredBy,
      });
    }
  }
}

const carRepository = new CarRepository();
export { carRepository };
