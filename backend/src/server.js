import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL
      ? [process.env.CLIENT_URL, "http://localhost:5173"]
      : "*",
  })
);

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("NoteVault API is running!");
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
