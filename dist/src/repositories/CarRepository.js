"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRepository = void 0;
const cars_model_1 = require("../models/cars.model");
class CarRepository {
    getAllCars() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query();
        });
    }
    getCarIsDeletedFalse() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query()
                .where({ is_deleted: false })
                .select("id", "plate", "manufacture", "model", "image", "rentPerDay", "capacity", "description", "availableAt", "transmission", "available", "type", "year");
        });
    }
    getCarById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query().findById(id);
        });
    }
    createCar(car) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query().insert(car);
        });
    }
    updateCar(id, car) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query().patchAndFetchById(id, car);
        });
    }
    softDeleteCar(id, deleteBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield cars_model_1.CarsModel.query().findById(id);
            if (car && !car.is_deleted) {
                return yield cars_model_1.CarsModel.query().patchAndFetchById(id, {
                    is_deleted: true,
                    deleted_by: deleteBy,
                });
                return null;
            }
        });
    }
    restoreCar(id, restoredBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield cars_model_1.CarsModel.query().findById(id);
            if (car && car.is_deleted) {
                return yield cars_model_1.CarsModel.query().patchAndFetchById(id, {
                    is_deleted: false,
                    deleted_by: null || undefined,
                    restored_by: restoredBy,
                });
            }
        });
    }
}
const carRepository = new CarRepository();
exports.carRepository = carRepository;
