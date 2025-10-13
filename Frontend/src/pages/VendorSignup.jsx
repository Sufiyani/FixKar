import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, MapPin, Eye, EyeOff, Briefcase } from "lucide-react";
import { vendorAPI } from "../utils/api";

const VendorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    location: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, phone, category, location, password } = formData;

    // Validation
    if (!name || !email || !phone || !category || !location || !password) {
      setError("Please fill all fields!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      // Vendor Registration API Call
      await vendorAPI.register(formData);
      
      // Success - show message and redirect to login
      alert("🎉 Vendor registered successfully! Please login to continue.");
      navigate("/login/vendor");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 tracking-wide">
          Vendor Signup
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute top-3 left-3 text-blue-400" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-blue-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute top-3 left-3 text-blue-400" size={18} />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Service Category
            </label>
            <div className="relative">
              <Briefcase className="absolute top-3 left-3 text-blue-400" size={18} />
              <input
                type="text"
                name="category"
                placeholder="e.g. Plumber, Electrician, Mechanic"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-blue-400" size={18} />
              <input
                type="text"
                name="location"
                placeholder="Enter your service area"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-blue-400" size={18} />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter your password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
              <div
                className="absolute right-3 top-3 text-blue-400 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-5 text-gray-700">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login/vendor")}
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default VendorSignup;