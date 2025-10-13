import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./lib/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import { createAdmin } from "./controllers/adminController.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// ✅ Create default admin (only if ADMIN_PASSWORD exists)
createAdmin();

// Routes
app.get("/", (req, res) => {
  res.send("🏏 Indoor Booking System API Running 🚀");
});

app.use("/api/admin", adminRoutes);
app.use("/api/vendors", vendorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV})`)
);
