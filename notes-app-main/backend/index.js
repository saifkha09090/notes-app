import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,    
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Server running successfully ✅");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));



app.listen(process.env.PORT || 8000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 8000}`)
);

export default app;