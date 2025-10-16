import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getBookingStats,
} from "../controllers/bookingController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 📝 Public booking creation
router.post("/", createBooking);

// 🔐 Admin-only routes
router.get("/", protectAdmin, getAllBookings);
router.get("/stats", protectAdmin, getBookingStats);
router.get("/:id", protectAdmin, getBookingById);
router.put("/:id/status", protectAdmin, updateBookingStatus);
router.delete("/:id", protectAdmin, deleteBooking);

export default router;