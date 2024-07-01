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
exports.carService = void 0;
const CarRepository_1 = require("../repositories/CarRepository");
class CarService {
    getAllCars() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CarRepository_1.carRepository.getAllCars();
        });
    }
    getCarIsDeletedFalse() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CarRepository_1.carRepository.getCarIsDeletedFalse();
        });
    }
    getCarById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CarRepository_1.carRepository.getCarById(id);
        });
    }
    createCar(car) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CarRepository_1.carRepository.createCar(car);
            return;
        });
    }
    updateCar(id, car) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CarRepository_1.carRepository.updateCar(id, car);
        });
    }
    softDeleteCar(id, deleteBy) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CarRepository_1.carRepository.softDeleteCar(id, deleteBy);
        });
    }
    restoreCar(id, restoredBy) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CarRepository_1.carRepository.restoreCar(id, restoredBy);
        });
    }
}
const carService = new CarService();
exports.carService = carService;
