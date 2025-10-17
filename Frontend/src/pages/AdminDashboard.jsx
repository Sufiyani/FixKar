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
        
        fetchData();
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
        
        fetchData();
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
      'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
      'Confirmed': 'bg-blue-50 text-blue-700 border-blue-200',
      'Completed': 'bg-green-50 text-green-700 border-green-200',
      'Cancelled': 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={18} />
            {error}
            <button onClick={() => setError('')} className="ml-auto text-lg">×</button>
          </div>
        )}
        
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <CheckCircle size={18} />
            {success}
            <button onClick={() => setSuccess('')} className="ml-auto text-lg">×</button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Shield className="text-slate-900" size={28} />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm">Manage vendors, services and bookings</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-all mt-4 md:mt-0 text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {view === 'dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Users className="text-blue-600" size={20} />
                  </div>
                </div>
                <p className="text-gray-600 text-xs font-medium mb-1">Total Vendors</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalVendors}</p>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="text-green-600 font-medium">{stats.availableVendors} Available</span> • 
                  <span className="text-orange-600 font-medium ml-1">{stats.busyVendors} Busy</span>
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-amber-50 p-2 rounded-lg">
                    <Clock className="text-amber-600" size={20} />
                  </div>
                </div>
                <p className="text-gray-600 text-xs font-medium mb-1">Pending Services</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingServices}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                </div>
                <p className="text-gray-600 text-xs font-medium mb-1">Approved Services</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.approvedServices}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <Calendar className="text-purple-600" size={20} />
                  </div>
                </div>
                <p className="text-gray-600 text-xs font-medium mb-1">Total Bookings</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings || 0}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div 
                onClick={() => setView('vendors')}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Users className="text-white" size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-semibold text-gray-900">{stats.totalVendors}</p>
                    <p className="text-xs text-gray-600">Total Vendors</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Vendors</h3>
                <p className="text-gray-600 mb-4 text-sm">View all vendors, check availability status, and manage accounts</p>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Wifi className="text-green-600" size={14} />
                    <span className="text-gray-700">{stats.availableVendors} Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <WifiOff className="text-orange-600" size={14} />
                    <span className="text-gray-700">{stats.busyVendors} Busy</span>
                  </div>
                </div>
                <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-all text-sm">
                  View All Vendors →
                </button>
              </div>

              <div 
                onClick={() => setView('bookings')}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <Calendar className="text-white" size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-semibold text-gray-900">{stats.totalBookings || 0}</p>
                    <p className="text-xs text-gray-600">Total Bookings</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Bookings</h3>
                <p className="text-gray-600 mb-4 text-sm">Track all customer bookings, filter by service and status</p>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Clock className="text-amber-600" size={14} />
                    <span className="text-gray-700">{stats.pendingBookings || 0} Pending</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="text-green-600" size={14} />
                    <span className="text-gray-700">{stats.confirmedBookings || 0} Confirmed</span>
                  </div>
                </div>
                <button className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition-all text-sm">
                  View All Bookings →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="text-amber-600" size={20} />
                  Pending Service Approvals ({pendingServices.length})
                </h2>
                {pendingServices.length > 0 && (
                  <button
                    onClick={() => setView('pending')}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View All →
                  </button>
                )}
              </div>

              {pendingServices.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h3>
                  <p className="text-gray-600 text-sm">No pending services to review</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingServices.slice(0, 3).map((service) => (
                    <div key={service._id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900">{service.category}</h3>
                        <p className="text-xs text-gray-600">by {service.vendorId?.name} • {service.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(service._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 text-sm"
                        >
                          <CheckCircle size={14} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleDisapprove(service._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 text-sm"
                        >
                          <XCircle size={14} />
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
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="text-blue-600" size={20} />
                All Vendors ({filteredVendors.length})
              </h2>
              <button
                onClick={() => setView('dashboard')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                ← Back to Dashboard
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-3 mb-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={vendorFilter.search}
                  onChange={(e) => setVendorFilter({...vendorFilter, search: e.target.value})}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <select
                value={vendorFilter.status}
                onChange={(e) => setVendorFilter({...vendorFilter, status: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
              <select
                value={vendorFilter.availability}
                onChange={(e) => setVendorFilter({...vendorFilter, availability: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Availability</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
              </select>
              <button
                onClick={() => setVendorFilter({ status: 'all', availability: 'all', search: '' })}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-medium transition-all text-sm"
              >
                Clear Filters
              </button>
            </div>

            {filteredVendors.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Vendors Found</h3>
                <p className="text-gray-600 text-sm">No vendors match your search criteria</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredVendors.map((vendor) => (
                  <div key={vendor._id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-base font-semibold text-gray-900">{vendor.name}</h3>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${
                            vendor.availabilityStatus === 'available' 
                              ? 'bg-green-50 text-green-700 border-green-200 flex items-center gap-1' 
                              : 'bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1'
                          }`}>
                            {vendor.availabilityStatus === 'available' ? (
                              <><Wifi size={10} /> Available</>
                            ) : (
                              <><WifiOff size={10} /> Busy</>
                            )}
                          </span>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${
                            vendor.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {vendor.status}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Mail size={14} className="text-blue-600" />
                            <span className="text-xs">{vendor.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Phone size={14} className="text-green-600" />
                            <span className="text-xs">{vendor.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin size={14} className="text-red-600" />
                            <span className="text-xs">{vendor.location}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteVendor(vendor._id, vendor.name)}
                        className="ml-4 p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all flex items-center gap-1.5 font-medium border border-red-200 text-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'bookings' && (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="text-purple-600" size={20} />
                All Bookings ({filteredBookings.length})
              </h2>
              <button
                onClick={() => setView('dashboard')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                ← Back to Dashboard
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={bookingFilter.search}
                  onChange={(e) => setBookingFilter({...bookingFilter, search: e.target.value})}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <select
                value={bookingFilter.status}
                onChange={(e) => setBookingFilter({...bookingFilter, status: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => setBookingFilter({ service: 'all', status: 'all', search: '' })}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-medium transition-all text-sm"
              >
                Clear Filters
              </button>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Found</h3>
                <p className="text-gray-600 text-sm">No bookings match your search criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking._id} className="border border-gray-200 rounded-lg p-5 hover:border-purple-300 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base font-semibold text-gray-900">{booking.serviceCategory}</h3>
                          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
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
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all flex items-center gap-1.5 font-medium border border-red-200 text-sm"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-1.5 text-sm">
                          <User size={16} className="text-blue-600" />
                          Customer Details
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-start gap-2">
                            <User size={12} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Name</p>
                              <p className="font-semibold text-gray-900">{booking.userName}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Mail size={12} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Email</p>
                              <p className="text-gray-800">{booking.userEmail}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Phone size={12} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Phone</p>
                              <p className="text-gray-800">{booking.userPhone}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Home size={12} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Address</p>
                              <p className="text-gray-800">{booking.userAddress}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-1.5 text-sm">
                          <Users size={16} className="text-green-600" />
                          Vendor Details
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-start gap-2">
                            <User size={12} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Name</p>
                              <p className="font-semibold text-gray-900">{booking.vendorName}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Mail size={12} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Email</p>
                              <p className="text-gray-800">{booking.vendorEmail}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Phone size={12} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Phone</p>
                              <p className="text-gray-800">{booking.vendorPhone}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin size={12} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Service Location</p>
                              <p className="text-gray-800">{booking.serviceLocation}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <DollarSign size={12} className="text-gray-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Price</p>
                              <p className="font-semibold text-green-600">Rs. {booking.servicePrice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-1.5 text-xs">
                          <MessageSquare size={14} className="text-gray-600" />
                          Customer Notes
                        </h4>
                        <p className="text-xs text-gray-700">{booking.notes}</p>
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