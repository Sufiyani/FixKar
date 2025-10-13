import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

// ✅ Create admin from .env (name + password)
export const createAdmin = async () => {
  try {
    const adminName = process.env.ADMIN_NAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD; // from .env file

    if (!adminPassword) {
      console.warn(
        "⚠️ ADMIN_PASSWORD not set in .env — skipping auto admin creation."
      );
      return;
    }

    const existingAdmin = await Admin.findOne({ name: adminName });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new Admin({
        name: adminName,
        password: hashedPassword,
      });
      await admin.save();
      console.log("✅ Admin created successfully (from .env)");
    } else {
      console.log("⚙️ Admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};

// ✅ Admin login (by name + password)
export const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name and password" });
    }

    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    // ✅ Compare plain password with hashed password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);

    // ✅ set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      message: "Admin logged in successfully",
      accessToken,
      name: admin.name,
      _id: admin._id,
    });
  } catch (error) {
    console.error("❌ Login admin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Refresh token endpoint
export const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(403).json({ message: "No refresh token" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });
      const accessToken = generateAccessToken(decoded.id);
      return res.json({ accessToken });
    });
  } catch (error) {
    console.error("❌ Refresh token error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
