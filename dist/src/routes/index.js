"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const carsRouter_1 = __importDefault(require("./carsRouter"));
const router = express_1.default.Router();
router.use("/users", usersRouter_1.default);
router.use("/cars", carsRouter_1.default);
exports.default = router;
