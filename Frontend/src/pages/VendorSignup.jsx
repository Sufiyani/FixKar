import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, MapPin, Eye, EyeOff, Briefcase, AlertCircle } from "lucide-react";
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

    if (!name || !email || !phone || !category || !location || !password) {
      setError("Please fill all fields!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      await vendorAPI.register(formData);
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
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Vendor Registration
          </h2>
          <p className="text-gray-500 text-sm">
            Join our platform and grow your business
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all bg-white text-gray-900"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all bg-white text-gray-900"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all bg-white text-gray-900"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Service Category
            </label>
            <div className="relative">
              <Briefcase className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" size={18} />
              <input
                type="text"
                name="category"
                placeholder="e.g. Plumber, Electrician, Mechanic"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all bg-white text-gray-900"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" size={18} />
              <input
                type="text"
                name="location"
                placeholder="Enter your service area"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all bg-white text-gray-900"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 text-sm">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" size={18} />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter your password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all bg-white text-gray-900"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Signing up...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login/vendor")}
              className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              Login Here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;