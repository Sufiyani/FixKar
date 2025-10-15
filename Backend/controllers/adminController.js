// import Admin from "../models/Admin.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import {
//   generateAccessToken,
//   generateRefreshToken,
// } from "../utils/generateToken.js";

// // ✅ Create admin from .env (name + password)
// export const createAdmin = async () => {
//   try {
//     const adminName = process.env.ADMIN_NAME || "admin";
//     const adminPassword = process.env.ADMIN_PASSWORD; // from .env file

//     if (!adminPassword) {
//       console.warn(
//         "⚠️ ADMIN_PASSWORD not set in .env — skipping auto admin creation."
//       );
//       return;
//     }

//     const existingAdmin = await Admin.findOne({ name: adminName });
//     if (!existingAdmin) {
//       const hashedPassword = await bcrypt.hash(adminPassword, 10);
//       const admin = new Admin({
//         name: adminName,
//         password: hashedPassword,
//       });
//       await admin.save();
     
//     } 
//   } catch (error) {
//     console.error("❌ Error creating admin:", error);
//   }
// };

// // ✅ Admin login (by name + password)
// export const loginAdmin = async (req, res) => {
//   try {
//     const { name, password } = req.body;
//     if (!name || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide name and password" });
//     }

//     const admin = await Admin.findOne({ name });
//     if (!admin) {
//       return res.status(401).json({ message: "Invalid name or password" });
//     }

//     // ✅ Compare plain password with hashed password
//     const isMatch = await admin.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid name or password" });
//     }

//     const accessToken = generateAccessToken(admin._id);
//     const refreshToken = generateRefreshToken(admin._id);

//     // ✅ set refresh token as httpOnly cookie
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     return res.json({
//       message: "Admin logged in successfully",
//       accessToken,
//       name: admin.name,
//       _id: admin._id,
//     });
//   } catch (error) {
//     console.error("❌ Login admin error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Refresh token endpoint
// export const refreshToken = (req, res) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if (!token) return res.status(403).json({ message: "No refresh token" });

//     jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
//       if (err)
//         return res.status(403).json({ message: "Invalid refresh token" });
//       const accessToken = generateAccessToken(decoded.id);
//       return res.json({ accessToken });
//     });
//   } catch (error) {
//     console.error("❌ Refresh token error:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


// controllers/adminController.js
import Admin from "../models/Admin.js";
import Service from "../models/Service.js";
import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

// ✅ Create admin from .env (name + password)
export const createAdmin = async () => {
  try {
    const adminName = process.env.ADMIN_NAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.warn("⚠️ ADMIN_PASSWORD not set in .env");
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
      console.log("✅ Admin created successfully");
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
      return res.status(400).json({ message: "Please provide name and password" });
    }

    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    const accessToken = generateAccessToken(admin._id);
    const refreshToken = generateRefreshToken(admin._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

// ✅ Refresh token
export const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(403).json({ message: "No refresh token" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });
      const accessToken = generateAccessToken(decoded.id);
      return res.json({ accessToken });
    });
  } catch (error) {
    console.error("❌ Refresh token error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all pending services
export const getPendingServices = async (req, res) => {
  try {
    const services = await Service.find({ status: "Pending" })
      .populate("vendorId", "name email phone")
      .sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Approve service
export const approveService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Approve vendor automatically
    await Vendor.findByIdAndUpdate(service.vendorId, { status: "Approved" });

    res.json({ message: "Service approved successfully", service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Disapprove service (delete)
export const disapproveService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service disapproved and deleted", service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all approved services (public)
export const getApprovedServices = async (req, res) => {
  try {
    const services = await Service.find({ status: "Approved" })
      .populate("vendorId", "name email phone")
      .sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get admin dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    const totalVendors = await Vendor.countDocuments();
    const pendingServices = await Service.countDocuments({ status: "Pending" });
    const approvedServices = await Service.countDocuments({ status: "Approved" });
    const totalServices = await Service.countDocuments();

    res.json({
      totalVendors,
      pendingServices,
      approvedServices,
      totalServices,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
