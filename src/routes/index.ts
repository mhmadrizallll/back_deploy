import express from "express";
import usersRouter from "./usersRouter";
import carsRouter from "./carsRouter";
import { carsControllers } from "../controllers/CarsControllers";
const router = express.Router();

router.use("/users", usersRouter);
router.use("/cars", carsRouter);

export default router;
