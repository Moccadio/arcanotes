import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import cors from "cors";

import cardRoute from "./routes/cardRoute.js";
import readingRoute from "./routes/readingRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cards", cardRoute);
app.use("/api/readings", readingRoute);

app.get("/", (req, res) => res.json({ status: "ArcaNotes API Running 🚀" }));

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
  );
}

export default app;
