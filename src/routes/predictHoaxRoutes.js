import express from "express";
import predictHoaxController from "../controllers/predictHoaxController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/", predictHoaxController.predict);
router.post("/", predictHoaxController.predictService);
router.get("/", predictHoaxController.histories);

export default router;
