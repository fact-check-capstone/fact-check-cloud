import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// GOOGLE Login
router.get("/google", authController.loginWithGoogle);
// GOOGLE callback login
router.get("/google/callback", authController.googleCallback);
router.get("/me", authMiddleware, authController.me);

export default router;
