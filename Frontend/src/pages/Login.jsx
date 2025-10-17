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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className={`${
            isAdmin 
              ? 'bg-slate-900' 
              : 'bg-emerald-600'
          } w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-5 shadow-sm`}>
            {isAdmin ? (
              <Shield className="text-white" size={28} />
            ) : (
              <Wrench className="text-white" size={28} />
            )}
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {isAdmin ? 'Admin Login' : 'Vendor Login'}
          </h1>
          <p className="text-gray-600 text-sm">
            {isAdmin 
              ? 'Sign in to manage FixKar platform' 
              : 'Sign in to manage your services'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Admin uses 'name', Vendor uses 'email' */}
            {isAdmin ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Admin Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all text-sm"
                    placeholder="Enter admin name"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all text-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 ${
                    isAdmin ? 'focus:ring-slate-900 focus:border-slate-900' : 'focus:ring-emerald-600 focus:border-emerald-600'
                  } transition-all text-sm`}
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
                  ? 'bg-slate-900 hover:bg-slate-800'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              } text-white py-2.5 rounded-lg font-medium shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm mt-5`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing in...
                </>
              ) : (
                <>
                  {isAdmin ? <Shield size={18} /> : <Wrench size={18} />}
                  Sign In as {isAdmin ? 'Admin' : 'Vendor'}
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center space-y-2">
            {isVendor && (
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Register as Vendor
                </button>
              </p>
            )}
            <button
              onClick={() => navigate('/')}
              className={`${
                isAdmin ? 'text-slate-900 hover:text-slate-700' : 'text-emerald-600 hover:text-emerald-700'
              } font-medium text-sm`}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;