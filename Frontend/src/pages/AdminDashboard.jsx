import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, Eye, Users, TrendingUp, Clock, AlertCircle, LogOut, Calendar, Filter, Search, Wifi, WifiOff, Phone, Mail, MapPin, Award, Trash2, User, Home, MessageSquare, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [pendingServices, setPendingServices] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [stats, setStats] = useState({
    totalVendors: 0,
    pendingServices: 0,
    approvedServices: 0,
    totalServices: 0,
    totalBookings: 0,
    availableVendors: 0,
    busyVendors: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  const [vendorFilter, setVendorFilter] = useState({ status: 'all', availability: 'all', search: '' });
  const [bookingFilter, setBookingFilter] = useState({ service: 'all', status: 'all', search: '' });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchData();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [servicesRes, vendorsRes, bookingsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/services/pending`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/admin/vendors`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/admin/bookings`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/admin/stats`, { headers: getAuthHeaders() })
      ]);
      
      const servicesData = await servicesRes.json();
      const vendorsData = await vendorsRes.json();
      const bookingsData = await bookingsRes.json();
      const statsData = await statsRes.json();
      
      setPendingServices(servicesData);
      setAllVendors(vendorsData);
      setAllBookings(bookingsData);
      setStats(statsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleApprove = async (serviceId) => {
    try {
      setError('');
      setSuccess('');
      
      const response = await fetch(`${API_BASE_URL}/admin/services/${serviceId}/approve`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Service approved successfully!');
        setPendingServices(pendingServices.filter(s => s._id !== serviceId));
        setStats({
          ...stats,
          pendingServices: stats.pendingServices - 1,
          approvedServices: stats.approvedServices + 1
        });
        setSelectedService(null);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to approve service');
      }
    } catch (err) {
      setError('Failed to approve service');
    }
  };

  const handleDisapprove = async (serviceId) => {
    if (!window.confirm('Are you sure you want to disapprove this service?')) {
      return;
    }
    
    try {
      setError('');
      setSuccess('');
      
      const response = await fetch(`${API_BASE_URL}/admin/services/${serviceId}/disapprove`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Service disapproved and deleted');
        setPendingServices(pendingServices.filter(s => s._id !== serviceId));
        setStats({
          ...stats,
          pendingServices: stats.pendingServices - 1,
          totalServices: stats.totalServices - 1
        });
        setSelectedService(null);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to disapprove service');
      }
    } catch (err) {
      setError('Failed to disapprove service');
    }
  };

  const handleDeleteVendor = async (vendorId, vendorName) => {
    if (!window.confirm(`Are you sure you want to delete vendor "${vendorName}"? This will also delete all their services.`)) {
      return;
    }
    
    try {
      setError('');
      setSuccess('');
      
      const response = await fetch(`${API_BASE_URL}/admin/vendors/${vendorId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Vendor and their services deleted successfully!');
        setAllVendors(allVendors.filter(v => v._id !== vendorId));
        setStats({
          ...stats,
          totalVendors: stats.totalVendors - 1
        });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete vendor');
      }
    } catch (err) {
      setError('Failed to delete vendor');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }
    
    try {
      setError('');
      setSuccess('');
      
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Booking deleted successfully!');
        setAllBookings(allBookings.filter(b => b._id !== bookingId));
        setStats({
          ...stats,
          totalBookings: stats.totalBookings - 1
        });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to delete booking');
      }
    } catch (err) {
      setError('Failed to delete booking');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/admin/login';
  };

  const filteredVendors = allVendors.filter(vendor => {
    const matchesStatus = vendorFilter.status === 'all' || vendor.status === vendorFilter.status;
    const matchesAvailability = vendorFilter.availability === 'all' || vendor.availabilityStatus === vendorFilter.availability;
    const matchesSearch = vendor.name.toLowerCase().includes(vendorFilter.search.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(vendorFilter.search.toLowerCase());
    return matchesStatus && matchesAvailability && matchesSearch;
  });

  const filteredBookings = allBookings.filter(booking => {
    const matchesService = bookingFilter.service === 'all' || booking.serviceCategory === bookingFilter.service;
    const matchesStatus = bookingFilter.status === 'all' || booking.status === bookingFilter.status;
    const matchesSearch = booking.userName?.toLowerCase().includes(bookingFilter.search.toLowerCase()) ||
                         booking.vendorName?.toLowerCase().includes(bookingFilter.search.toLowerCase()) ||
                         booking.userPhone?.includes(bookingFilter.search);
    return matchesService && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Confirmed': 'bg-blue-100 text-blue-700',
      'Completed': 'bg-green-100 text-green-700',
      'Cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
            <button onClick={() => setError('')} className="ml-auto text-xl">×</button>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle size={20} />
            {success}
            <button onClick={() => setSuccess('')} className="ml-auto text-xl">×</button>
          </div>
        )}

        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="relative flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Shield className="text-white" size={32} />
                </div>
                Admin Dashboard
              </h1>
              <p className="text-blue-100 text-lg">Manage vendors, services and bookings</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold border border-white/30 transition-all mt-4 md:mt-0"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {view === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Users className="text-blue-600" size={28} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Vendors</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalVendors}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="text-green-600 font-semibold">{stats.availableVendors} Available</span> • 
                  <span className="text-orange-600 font-semibold ml-1">{stats.busyVendors} Busy</span>
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-100 p-3 rounded-xl">
                    <Clock className="text-yellow-600" size={28} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Pending Services</p>
                <p className="text-3xl font-bold text-gray-800">{stats.pendingServices}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle className="text-green-600" size={28} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Approved Services</p>
                <p className="text-3xl font-bold text-gray-800">{stats.approvedServices}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Calendar className="text-purple-600" size={28} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalBookings || 0}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div 
                onClick={() => setView('vendors')}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all cursor-pointer group border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl">
                    <Users className="text-white" size={32} />
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-800">{stats.totalVendors}</p>
                    <p className="text-sm text-gray-600">Total Vendors</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Manage Vendors</h3>
                <p className="text-gray-600 mb-4">View all vendors, check availability status, and manage their accounts</p>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Wifi className="text-green-600" size={16} />
                    <span className="text-gray-700">{stats.availableVendors} Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <WifiOff className="text-orange-600" size={16} />
                    <span className="text-gray-700">{stats.busyVendors} Busy</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold group-hover:from-blue-600 group-hover:to-indigo-700 transition-all">
                  View All Vendors →
                </button>
              </div>

              <div 
                onClick={() => setView('bookings')}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all cursor-pointer group border-2 border-transparent hover:border-purple-500"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-xl">
                    <Calendar className="text-white" size={32} />
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-800">{stats.totalBookings || 0}</p>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Manage Bookings</h3>
                <p className="text-gray-600 mb-4">Track all customer bookings, filter by service and status, view details</p>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="text-yellow-600" size={16} />
                    <span className="text-gray-700">{stats.pendingBookings || 0} Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-gray-700">{stats.confirmedBookings || 0} Confirmed</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-bold group-hover:from-purple-600 group-hover:to-pink-700 transition-all">
                  View All Bookings →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <Clock className="text-yellow-600" size={28} />
                  Pending Service Approvals ({pendingServices.length})
                </h2>
                {pendingServices.length > 0 && (
                  <button
                    onClick={() => setView('pending')}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    View All →
                  </button>
                )}
              </div>

              {pendingServices.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-gray-400" size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">All caught up!</h3>
                  <p className="text-gray-600">No pending services to review</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingServices.slice(0, 3).map((service) => (
                    <div key={service._id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{service.category}</h3>
                        <p className="text-sm text-gray-600">by {service.vendorId?.name} • {service.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(service._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1"
                        >
                          <CheckCircle size={16} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleDisapprove(service._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-1"
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {view === 'vendors' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Users className="text-blue-600" size={28} />
                All Vendors ({filteredVendors.length})
              </h2>
              <button
                onClick={() => setView('dashboard')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to Dashboard
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={vendorFilter.search}
                  onChange={(e) => setVendorFilter({...vendorFilter, search: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={vendorFilter.status}
                onChange={(e) => setVendorFilter({...vendorFilter, status: e.target.value})}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
              <select
                value={vendorFilter.availability}
                onChange={(e) => setVendorFilter({...vendorFilter, availability: e.target.value})}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Availability</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
              </select>
              <button
                onClick={() => setVendorFilter({ status: 'all', availability: 'all', search: '' })}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Clear Filters
              </button>
            </div>

            <div className="space-y-4">
              {filteredVendors.map((vendor) => (
                <div key={vendor._id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          vendor.availabilityStatus === 'available' 
                            ? 'bg-green-100 text-green-700 flex items-center gap-1' 
                            : 'bg-orange-100 text-orange-700 flex items-center gap-1'
                        }`}>
                          {vendor.availabilityStatus === 'available' ? (
                            <><Wifi size={12} /> Available</>
                          ) : (
                            <><WifiOff size={12} /> Busy</>
                          )}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          vendor.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {vendor.status}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail size={16} className="text-blue-600" />
                          <span className="text-sm">{vendor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone size={16} className="text-green-600" />
                          <span className="text-sm">{vendor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin size={16} className="text-red-600" />
                          <span className="text-sm">{vendor.location}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteVendor(vendor._id, vendor.name)}
                      className="ml-4 p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all flex items-center gap-2 font-semibold"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Calendar className="text-purple-600" size={28} />
                All Bookings ({filteredBookings.length})
              </h2>
              <button
                onClick={() => setView('dashboard')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to Dashboard
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={bookingFilter.search}
                  onChange={(e) => setBookingFilter({...bookingFilter, search: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={bookingFilter.status}
                onChange={(e) => setBookingFilter({...bookingFilter, status: e.target.value})}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => setBookingFilter({ service: 'all', status: 'all', search: '' })}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Clear Filters
              </button>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-gray-400" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookings Found</h3>
                <p className="text-gray-600">No bookings match your search criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking._id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{booking.serviceCategory}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Booked on: {new Date(booking.bookingDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all flex items-center gap-2 font-semibold"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <User size={18} className="text-blue-600" />
                          Customer Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <User size={14} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">Name</p>
                              <p className="font-bold text-gray-900">{booking.userName}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Mail size={14} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">Email</p>
                              <p className="text-gray-800">{booking.userEmail}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Phone size={14} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">Phone</p>
                              <p className="text-gray-800">{booking.userPhone}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Home size={14} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">Address</p>
                              <p className="text-gray-800">{booking.userAddress}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Users size={18} className="text-green-600" />
                          Vendor Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <User size={14} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">Name</p>
                              <p className="font-bold text-gray-900">{booking.vendorName}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Mail size={14} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">Email</p>
                              <p className="text-gray-800">{booking.vendorEmail}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Phone size={14} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">Phone</p>
                              <p className="text-gray-800">{booking.vendorPhone}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin size={14} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">Service Location</p>
                              <p className="text-gray-800">{booking.serviceLocation}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <DollarSign size={14} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">Price</p>
                              <p className="font-bold text-green-600">Rs. {booking.servicePrice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                          <MessageSquare size={16} className="text-gray-600" />
                          Customer Notes
                        </h4>
                        <p className="text-sm text-gray-700">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;