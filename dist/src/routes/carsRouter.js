"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CarsControllers_1 = require("../controllers/CarsControllers");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const cdnUploadHandler_1 = __importDefault(require("../middleware/cdnUploadHandler"));
const router = express_1.default.Router();
// router.get("/", carsControllers.getCarsALluser);
router.get("/:id", CarsControllers_1.carsControllers.getCarById);
router.get("/", CarsControllers_1.carsControllers.getCars);
router.post("/", authMiddleware_1.default, cdnUploadHandler_1.default.single("image"), CarsControllers_1.carsControllers.create);
router.put("/:id", authMiddleware_1.default, cdnUploadHandler_1.default.single("image"), CarsControllers_1.carsControllers.update);
router.delete("/:id", authMiddleware_1.default, CarsControllers_1.carsControllers.softDelete);
router.post("/restore/:id", authMiddleware_1.default, CarsControllers_1.carsControllers.restore);
// router.post(
//   "/upload",
//   upload.single("image"),
//   carsControllers.cloudUploadImage
// );
exports.default = router;
