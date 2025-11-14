import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./authRoutes.js";
import noteRoutes from "./noteRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://echonotez.netlify.app",
  "http://localhost:5173"
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
  res.send("Server running successfully");
});

export default app;
