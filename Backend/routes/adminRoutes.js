import express from "express";
import { loginAdmin, refreshToken } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/refresh", refreshToken);

export default router;
