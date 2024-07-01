import express from "express";
import { carsControllers } from "../controllers/CarsControllers";
import authMiddleware from "../middleware/authMiddleware";
import upload from "../middleware/cdnUploadHandler";
const router = express.Router();

// router.get("/", carsControllers.getCarsALluser);
router.get("/:id", carsControllers.getCarById);
router.get("/", carsControllers.getCars);
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  carsControllers.create
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  carsControllers.update
);
router.delete("/:id", authMiddleware, carsControllers.softDelete);
router.post("/restore/:id", authMiddleware, carsControllers.restore);
// router.post(
//   "/upload",
//   upload.single("image"),
//   carsControllers.cloudUploadImage
// );

export default router;
