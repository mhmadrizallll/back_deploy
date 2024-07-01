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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsControllers = void 0;
const CarService_1 = require("../services/CarService");
const uuid_1 = require("uuid");
const cloudinary_1 = __importDefault(require("../middleware/cloudinary"));
class CarsControllers {
    getCarsAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cars = yield CarService_1.carService.getAllCars();
                res.status(200).json({
                    status: true,
                    message: "Cars Available",
                    data: cars,
                });
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    getCars(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            console.log("ini adalah user", role);
            try {
                let cars;
                if (role === "superadmin" || role === "admin") {
                    cars = yield CarService_1.carService.getAllCars();
                    res.status(200).json({
                        status: true,
                        message: "Cars Available",
                        data: cars,
                    });
                }
                else {
                    cars = yield CarService_1.carService.getCarIsDeletedFalse();
                    res.status(200).json({
                        status: true,
                        message: "Cars Available",
                        data: cars,
                    });
                }
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    getCarById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const car = yield CarService_1.carService.getCarById(id);
                if (car) {
                    res.status(200).json({
                        status: true,
                        message: "Car Available",
                        data: car,
                    });
                }
                else {
                    res.status(404).json({
                        status: false,
                        message: "Car not found",
                    });
                }
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    cloudUploadImage(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const fileBase64 = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString("base64");
            const file = `data:${(_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype};base64,${fileBase64}`;
            cloudinary_1.default.uploader
                .upload(file)
                .then((result) => {
                res.status(200).json({
                    status: true,
                    message: "File uploaded",
                    data: result,
                });
            })
                .catch((err) => {
                res.status(500).json({
                    status: false,
                    message: err,
                });
            });
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { plate, manufacture, model, rentPerDay, capacity, description, availableAt, transmission, type, year, } = req.body;
            const user = req.user;
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            console.log("ini adalah user", user);
            try {
                if (!req.file) {
                    return res.status(400).json({
                        status: false,
                        message: "Image is required",
                    });
                }
                const fileBase64 = req.file.buffer.toString("base64");
                const file = `data:${req.file.mimetype};base64,${fileBase64}`;
                if (!plate ||
                    !manufacture ||
                    !model ||
                    !rentPerDay ||
                    !capacity ||
                    !description ||
                    !availableAt ||
                    !transmission ||
                    !type ||
                    !year) {
                    return res.status(400).json({
                        status: false,
                        message: "All fields are required",
                    });
                }
                if (role !== "superadmin" && role !== "admin") {
                    return res.status(401).json({
                        status: false,
                        message: "Access forbidden",
                    });
                }
                const uploadResult = yield cloudinary_1.default.uploader.upload(file);
                const payload = {
                    id: (0, uuid_1.v4)(),
                    plate,
                    manufacture,
                    model,
                    image: uploadResult.secure_url,
                    rentPerDay,
                    capacity,
                    description,
                    availableAt,
                    transmission,
                    type,
                    year,
                    created_by: user.username,
                };
                const car = yield CarService_1.carService.createCar(payload);
                res.status(201).json({
                    status: true,
                    message: "Car created",
                    data: payload,
                });
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
                console.log(err);
            }
        });
    }
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { plate, manufacture, model, rentPerDay, capacity, available, availableAt, description, transmission, type, year, } = req.body;
            const { id } = req.params;
            const user = req.user;
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            try {
                if (!plate ||
                    !manufacture ||
                    !model ||
                    !rentPerDay ||
                    !capacity ||
                    !description ||
                    !available ||
                    !transmission ||
                    !availableAt ||
                    !type ||
                    !year) {
                    return res.status(400).json({
                        status: false,
                        message: "All fields are required",
                    });
                }
                if (role !== "superadmin" && role !== "admin") {
                    return res.status(401).json({
                        status: false,
                        message: "Access forbidden",
                    });
                }
                const payload = {
                    id: (0, uuid_1.v4)(),
                    plate,
                    manufacture,
                    model,
                    rentPerDay,
                    capacity,
                    description,
                    available,
                    availableAt,
                    transmission,
                    type,
                    year,
                    updated_by: user.username,
                    updated_at: new Date(),
                };
                if (req.file) {
                    const fileBase64 = req.file.buffer.toString("base64");
                    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
                    const uploadResult = yield cloudinary_1.default.uploader.upload(file);
                    payload.image = uploadResult.secure_url;
                }
                const car = yield CarService_1.carService.updateCar(id, payload);
                res.status(200).json({
                    status: true,
                    message: "Car updated",
                    data: payload,
                });
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    softDelete(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user;
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            try {
                const car = yield CarService_1.carService.softDeleteCar(id, user.username);
                if (role !== "superadmin" && role !== "admin") {
                    return res.status(401).json({
                        status: false,
                        message: "Access forbidden",
                    });
                }
                if (car) {
                    res.status(200).json({
                        status: true,
                        message: "Car deleted",
                        data: car,
                    });
                }
                else {
                    res.status(404).json({
                        status: false,
                        message: "Car not found or already deleted",
                    });
                }
            }
            catch (err) {
                res.status(500).json({ status: false, message: err });
            }
        });
    }
    restore(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user;
            const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            try {
                const car = yield CarService_1.carService.restoreCar(id, user.username);
                if (role !== "superadmin" && role !== "admin") {
                    return res.status(401).json({
                        status: false,
                        message: "Access forbidden",
                    });
                }
                if (car) {
                    res.status(200).json({
                        status: true,
                        message: "Car restored",
                        data: car,
                    });
                }
                else {
                    res.status(404).json({
                        status: false,
                        message: "Car not found or already restored",
                    });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: false, message: err });
            }
        });
    }
}
const carsControllers = new CarsControllers();
exports.carsControllers = carsControllers;
