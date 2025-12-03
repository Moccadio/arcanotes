// src/middleware/uploadMiddleware.js
import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
});
