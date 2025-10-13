import Vendor from "../models/Vendor.js";
import { generateAccessToken } from "../utils/generateToken.js";

export const registerVendor = async (req, res) => {
  try {
    const { name, email, phone, category, location, password } = req.body;
    const vendorExists = await Vendor.findOne({ email });

    if (vendorExists)
      return res.status(400).json({ message: "Vendor already exists" });

    const vendor = await Vendor.create({
      name,
      email,
      phone,
      category,
      location,
      password,
    });

    res.status(201).json({
      message: "Vendor registered successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await vendor.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const accessToken = generateAccessToken(vendor._id);

    res.json({
      message: "Vendor logged in successfully",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
