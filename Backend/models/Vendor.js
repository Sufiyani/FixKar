import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const vendorSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    category: String,
    location: String,
    password: String,
  },
  { timestamps: true }
);

vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

vendorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
