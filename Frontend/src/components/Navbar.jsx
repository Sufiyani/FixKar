import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Bell, LogOut, User, Shield, Wrench } from 'lucide-react';
import { logout, isAuthenticated, getUserType } from '../utils/auth';

const Navbar = ({ notifications = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = isAuthenticated();
  const userType = getUserType();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const recentNotifications = [
    { id: 1, text: "New booking request from Ali Raza", time: "2 mins ago", unread: true },
    { id: 2, text: "Payment received - Rs. 1500", time: "1 hour ago", unread: true },
    { id: 3, text: "Service completed successfully", time: "3 hours ago", unread: false },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section - Enhanced */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-white to-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <Wrench className="text-blue-600" size={28} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                FixKar
              </div>
              <div className="text-xs bg-gradient-to-r from-blue-400/50 to-indigo-400/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 shadow-inner">
                Professional Home Services
              </div>
            </div>
          </Link>

          {/* Show Auth Buttons if NOT logged in */}
          {!isLoggedIn ? (
            <>
              {/* Desktop Menu - Enhanced */}
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 group ${
                    isActive('/')
                      ? 'bg-white/20 backdrop-blur-md shadow-lg border border-white/30'
                      : 'hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <Home size={18} className="group-hover:scale-110 transition-transform" />
                  Home
                </Link>

                <Link
                  to="/login/vendor"
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 group ${
                    isActive('/login/vendor')
                      ? 'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl scale-105'
                      : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
                  }`}
                >
                  <User size={18} className="group-hover:rotate-12 transition-transform" />
                  Vendor Login
                </Link>

                <Link
                  to="/login/admin"
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 group ${
                    isActive('/login/admin')
                      ? 'bg-gradient-to-r from-white to-blue-50 text-blue-700 shadow-xl scale-105'
                      : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
                  }`}
                >
                  <Shield size={18} className="group-hover:scale-110 transition-transform" />
                  Admin Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Register
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-3 rounded-xl hover:bg-white/10 transition-colors border border-white/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          ) : (
            /* Authenticated User Menu - Enhanced */
            <div className="flex items-center gap-4">
              {/* Dashboard Link */}
              <Link
                to={userType === 'admin' ? '/admin-dashboard' : '/vendor-dashboard'}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
              >
                <Home size={18} />
                Dashboard
              </Link>

              {/* User Type Badge */}
              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/30 shadow-lg">
                {userType === 'vendor' ? (
                  <>
                    <div className="bg-blue-500 p-1.5 rounded-lg">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="font-bold">Vendor Panel</span>
                  </>
                ) : (
                  <>
                    <div className="bg-purple-500 p-1.5 rounded-lg">
                      <Shield size={16} className="text-white" />
                    </div>
                    <span className="font-bold">Admin Panel</span>
                  </>
                )}
              </div>

              {/* Enhanced Notifications */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/20 group"
                >
                  <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                  {notifications > 0 && (
                    <>
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                        {notifications}
                      </span>
                      <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-6 w-6 animate-ping opacity-75"></span>
                    </>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
                      <h3 className="font-bold text-lg">Notifications</h3>
                      <p className="text-sm text-blue-100">{notifications} unread messages</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {recentNotifications.map(notif => (
                        <div key={notif.id} className={`px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 ${notif.unread ? 'bg-blue-50/50' : ''}`}>
                          <div className="flex items-start gap-3">
                            {notif.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                            <div className="flex-1">
                              <p className={`text-sm ${notif.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                {notif.text}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-6 py-3 bg-gray-50 text-center">
                      <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button - Enhanced */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-red-400"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Mobile Menu Button for Authenticated Users */}
              <button
                className="md:hidden p-3 rounded-xl hover:bg-white/10 transition-colors border border-white/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown - Enhanced */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 py-6 space-y-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all ${
                    isActive('/')
                      ? 'bg-white/20 shadow-lg border border-white/30'
                      : 'hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <Home size={22} />
                  <span className="text-lg">Home</span>
                </Link>
                <Link
                  to="/login/vendor"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all ${
                    isActive('/login/vendor')
                      ? 'bg-white text-blue-700 shadow-lg'
                      : 'hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <User size={22} />
                  <span className="text-lg">Vendor Login</span>
                </Link>
                <Link
                  to="/login/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all ${
                    isActive('/login/admin')
                      ? 'bg-white text-blue-700 shadow-lg'
                      : 'hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <Shield size={22} />
                  <span className="text-lg">Admin Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
                >
                  <User size={22} />
                  <span className="text-lg">Register</span>
                </Link>
              </>
            ) : (
              <>
                {/* Mobile User Badge */}
                <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/20 border border-white/30">
                  {userType === 'vendor' ? (
                    <>
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <User size={20} className="text-white" />
                      </div>
                      <span className="font-bold text-lg">Vendor Panel</span>
                    </>
                  ) : (
                    <>
                      <div className="bg-purple-500 p-2 rounded-lg">
                        <Shield size={20} className="text-white" />
                      </div>
                      <span className="font-bold text-lg">Admin Panel</span>
                    </>
                  )}
                </div>

                {/* Dashboard Link */}
                <Link
                  to={userType === 'admin' ? '/admin-dashboard' : '/vendor-dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all hover:bg-white/10"
                >
                  <Home size={22} />
                  <span className="text-lg">Dashboard</span>
                </Link>

                {/* Mobile Notifications */}
                <button className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all hover:bg-white/10 w-full">
                  <div className="relative">
                    <Bell size={22} />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </div>
                  <span className="text-lg">Notifications</span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 w-full"
                >
                  <LogOut size={22} />
                  <span className="text-lg">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;