import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import { adminAPI, vendorAPI } from "../utils/api";

const Login = () => {
  const { type } = useParams(); // vendor or admin
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (type === "vendor") {
        // Validation
        if (!email || !password) {
          setError("Please fill all fields!");
          setLoading(false);
          return;
        }

        // Vendor Login API Call
        const data = await vendorAPI.login(email, password);
        
        // Store token and user info
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userType", "vendor");
        
        // Navigate to vendor dashboard
        navigate("/vendor-dashboard");
        
      } else if (type === "admin") {
        // Validation
        if (!adminName || !password) {
          setError("Please fill all fields!");
          setLoading(false);
          return;
        }

        // Admin Login API Call
        const data = await adminAPI.login(adminName, password);
        
        // Store token and admin info
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userType", "admin");
        localStorage.setItem("adminName", data.name);
        
        // Navigate to admin dashboard
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Network error. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 tracking-wide">
          {type === "admin" ? "Admin Login" : "Vendor Login"}
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Vendor Email Input */}
          {type === "vendor" && (
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 text-blue-400" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Admin Name Input */}
          {type === "admin" && (
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Name
              </label>
              <div className="relative">
                <User className="absolute top-3 left-3 text-blue-400" size={18} />
                <input
                  type="text"
                  placeholder="Enter admin name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Password Input */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-blue-400" size={18} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Vendor register link */}
        {type === "vendor" && (
          <p className="text-sm text-center mt-5 text-gray-700">
            Don't have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register Here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;