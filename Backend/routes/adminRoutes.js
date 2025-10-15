import express from "express";
import {
  loginAdmin,
  refreshToken,
  getPendingServices,
  approveService,
  disapproveService,
  getApprovedServices,
  getAdminStats,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/refresh", refreshToken);
router.get("/services/pending", protectAdmin, getPendingServices);
router.put("/services/:id/approve", protectAdmin, approveService);
router.delete("/services/:id/disapprove", protectAdmin, disapproveService);
router.get("/services/approved", getApprovedServices);
router.get("/stats", protectAdmin, getAdminStats);

export default router;