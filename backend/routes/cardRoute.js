import { Router } from "express";
import { CardController } from "../controllers/cardController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = Router();

router.post("/", upload.single("image"), CardController.create);
router.get("/", CardController.getAll);
router.get("/:id", CardController.getById);

export default router;
