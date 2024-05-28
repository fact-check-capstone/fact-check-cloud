import express from "express";
import predictHoaxController from "../controllers/predictHoaxController.js";

const router = express.Router();

router.post("/", predictHoaxController.predict);
router.get("/", predictHoaxController.histories);

export default router;
