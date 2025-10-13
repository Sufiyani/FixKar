import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Vendor from "../models/Vendor.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user =
        (await Admin.findById(decoded.id).select("-password")) ||
        (await Vendor.findById(decoded.id).select("-password"));

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) res.status(401).json({ message: "No token provided" });
};
