import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, Wrench } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { type } = useParams(); // Get 'admin' or 'vendor' from URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Redirect if invalid type
  useEffect(() => {
    if (type !== 'admin' && type !== 'vendor') {
      navigate('/');
    }
  }, [type, navigate]);

  const isAdmin = type === 'admin';
  const isVendor = type === 'vendor';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Different endpoints for admin vs vendor
      const endpoint = isAdmin 
        ? `${API_BASE_URL}/admin/login`
        : `${API_BASE_URL}/vendors/login`;

      // Different body data for admin (name) vs vendor (email)
      const bodyData = isAdmin 
        ? { name: formData.name, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        
        if (isAdmin) {
          localStorage.setItem('adminName', data.name);
          localStorage.setItem('userType', 'admin');
          navigate('/admin-dashboard');
        } else {
          localStorage.setItem('vendorName', data.name || data.vendor?.name);
          localStorage.setItem('vendorId', data._id || data.vendor?._id);
          localStorage.setItem('userType', 'vendor');
          navigate('/vendor-dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className={`${
            isAdmin 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
              : 'bg-gradient-to-r from-green-600 to-emerald-600'
          } w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
            {isAdmin ? (
              <Shield className="text-white" size={40} />
            ) : (
              <Wrench className="text-white" size={40} />
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {isAdmin ? 'Admin Login' : 'Vendor Login'}
          </h1>
          <p className="text-gray-600">
            {isAdmin 
              ? 'Sign in to manage FixKar platform' 
              : 'Sign in to manage your services'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Admin uses 'name', Vendor uses 'email' */}
            {isAdmin ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter admin name"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 ${
                    isAdmin ? 'focus:ring-blue-500' : 'focus:ring-green-500'
                  } focus:border-transparent transition-all`}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                isAdmin
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
              } text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing in...
                </>
              ) : (
                <>
                  {isAdmin ? <Shield size={20} /> : <Wrench size={20} />}
                  Sign In as {isAdmin ? 'Admin' : 'Vendor'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            {isVendor && (
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Register as Vendor
                </button>
              </p>
            )}
            <button
              onClick={() => navigate('/')}
              className={`${
                isAdmin ? 'text-blue-600 hover:text-blue-700' : 'text-green-600 hover:text-green-700'
              } font-semibold text-sm`}
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Default credentials: admin / [set in .env]</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;