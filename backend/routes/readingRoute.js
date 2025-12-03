import express from "express";
import { ReadingController } from "../controllers/readingController.js";

const router = express.Router();

router.get("/", ReadingController.getAll);
router.get("/:id", ReadingController.getById);
router.post("/readings/simulate", ReadingController.simulate);

export default router;
