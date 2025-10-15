import express from "express";
import { registerVendor, loginVendor } from "../controllers/vendorController.js";
import {
  createService,
  getVendorServices,
  deleteService,
  getVendorStats,
  getVendorProfile,
} from "../controllers/serviceController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Vendor authentication routes
router.post("/register", registerVendor);
router.post("/login", loginVendor);

// Vendor profile routes (protected)
router.get("/profile", protect, getVendorProfile);

// Service routes (protected)
router.post("/services", protect, createService);
router.get("/services", protect, getVendorServices);
router.delete("/services/:id", protect, deleteService);
router.get("/stats", protect, getVendorStats);

export default router;
