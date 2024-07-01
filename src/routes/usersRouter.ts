import express from "express";
import { userControllers } from "../controllers/UserControllers";
import authMiddleware from "../middleware/authMiddleware";
const router = express.Router();

// access member without token
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/auth/google", userControllers.loginWithGoogle);

// access superadmin and admin with token
router.post("/superadmin/register", authMiddleware, userControllers.register);
router.get("/", authMiddleware, userControllers.getUsers);
router.put("/:id", authMiddleware, userControllers.updateUser);
router.delete("/:id", authMiddleware, userControllers.deleteUser);
router.get("/me", authMiddleware, userControllers.getCurrentUser);

export default router;
