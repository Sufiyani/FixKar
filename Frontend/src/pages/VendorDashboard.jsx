import React, { useState, useEffect } from "react";
import { 
  PlusCircle, MapPin, Wrench, Phone, Calendar, Star, DollarSign, Clock,
  TrendingUp, Award, Users, CheckCircle, Edit2, Trash2, Save, AlertCircle,
  XCircle, Power, Wifi, WifiOff
} from "lucide-react";

const VendorDashboard = () => {
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    rating: 4.8,
    earnings: 0,
    activeServices: 0
  });
  const [vendorStatus, setVendorStatus] = useState('available'); // available or busy
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    category: "",
    location: "",
    contact: "",
    availability: "",
    price: "",
    experience: "",
    description: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchVendorData();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchVendorData = async () => {
    try {
      setLoading(true);
      
      // Fetch vendor profile (includes status)
      const profileRes = await fetch(`${API_BASE_URL}/vendors/profile`, {
        headers: getAuthHeaders()
      });
      const profileData = await profileRes.json();
      setVendorStatus(profileData.availabilityStatus || 'available');
      
      // Fetch vendor services
      const servicesRes = await fetch(`${API_BASE_URL}/vendors/services`, {
        headers: getAuthHeaders()
      });
      const servicesData = await servicesRes.json();
      
      // Fetch vendor stats
      const statsRes = await fetch(`${API_BASE_URL}/vendors/stats`, {
        headers: getAuthHeaders()
      });
      const statsData = await statsRes.json();
      
      setServices(servicesData);
      setStats(statsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    try {
      const newStatus = vendorStatus === 'available' ? 'busy' : 'available';
      
      const response = await fetch(`${API_BASE_URL}/vendors/availability`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ availabilityStatus: newStatus })
      });

      if (response.ok) {
        setVendorStatus(newStatus);
        setSuccess(`You are now ${newStatus === 'available' ? 'Available' : 'Busy'}`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to update availability');
      }
    } catch (err) {
      setError('Failed to update availability');
    }
  };

  const handleAddService = async () => {
    if (!newService.category || !newService.location || !newService.contact || !newService.availability) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      const response = await fetch(`${API_BASE_URL}/vendors/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newService)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Service submitted successfully! Waiting for admin approval.');
        setServices([...services, data.service]);
        setNewService({
          category: "",
          location: "",
          contact: "",
          availability: "",
          price: "",
          experience: "",
          description: ""
        });
        setShowAddForm(false);
        
        setTimeout(() => {
          fetchVendorData();
          setSuccess('');
        }, 2000);
      } else {
        setError(data.message || 'Failed to create service');
      }
    } catch (err) {
      setError('Failed to create service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      const response = await fetch(`${API_BASE_URL}/vendors/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Service deleted successfully');
        setServices(services.filter(s => s._id !== id));
        setTimeout(() => setSuccess(''), 2000);
      } else {
        setError(data.message || 'Failed to delete service');
      }
    } catch (err) {
      setError('Failed to delete service');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <CheckCircle size={16} /> Approved
        </span>;
      case 'Pending':
        return <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <Clock size={16} /> Pending Approval
        </span>;
      case 'Disapproved':
        return <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <XCircle size={16} /> Disapproved
        </span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-bold">
          {status}
        </span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  };

  const recentBookings = [
    { id: 1, customer: "Hassan Malik", service: "Plumbing", date: "2025-10-10", status: "completed", amount: 1200 },
    { id: 2, customer: "Fatima Khan", service: "Repair", date: "2025-10-11", status: "pending", amount: 1500 },
    { id: 3, customer: "Ali Ahmed", service: "Installation", date: "2025-10-12", status: "in-progress", amount: 2000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Alert Messages */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
            <button onClick={() => setError('')} className="ml-auto">×</button>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle size={20} />
            {success}
            <button onClick={() => setSuccess('')} className="ml-auto">×</button>
          </div>
        )}

        {/* Welcome Banner with Availability Toggle */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="mb-4 md:mb-0">
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Wrench className="text-white" size={32} />
                </div>
                Welcome Back, Vendor! 👋
              </h1>
              <p className="text-green-100 text-lg">Manage your services and track your performance</p>
            </div>
            
            <div className="flex gap-3">
              {/* Availability Toggle */}
              <button
                onClick={toggleAvailability}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  vendorStatus === 'available' 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}
              >
                {vendorStatus === 'available' ? (
                  <>
                    <Wifi size={20} />
                    Available
                  </>
                ) : (
                  <>
                    <WifiOff size={20} />
                    Busy
                  </>
                )}
              </button>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <PlusCircle size={20} />
                Add Service
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="text-blue-600" size={28} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
            <p className="text-green-600 text-sm mt-2 font-semibold">↑ 12% this month</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Star className="text-yellow-600 fill-yellow-600" size={28} />
              </div>
              <Award className="text-yellow-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">Rating</p>
            <p className="text-3xl font-bold text-gray-800">{stats.rating}</p>
            <p className="text-gray-600 text-sm mt-2">Based on {stats.reviews || 0} reviews</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="text-green-600" size={28} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-gray-800">Rs. {stats.earnings?.toLocaleString() || 0}</p>
            <p className="text-green-600 text-sm mt-2 font-semibold">↑ 8% increase</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users className="text-purple-600" size={28} />
              </div>
              <CheckCircle className="text-purple-500" size={20} />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">Active Services</p>
            <p className="text-3xl font-bold text-gray-800">{stats.activeServices}</p>
            <p className="text-gray-600 text-sm mt-2">Approved services</p>
          </div>
        </div>

        {/* Add Service Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-xl">
                  <PlusCircle className="text-white" size={24} />
                </div>
                Add New Service
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Category *</label>
                <select
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Category</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Car Mechanic">Car Mechanic</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Painting">Painting</option>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Mobile Repair">Mobile Repair</option>
                  <option value="Home Cleaning">Home Cleaning</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  placeholder="e.g., Karachi, Clifton"
                  value={newService.location}
                  onChange={(e) => setNewService({ ...newService, location: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number *</label>
                <input
                  type="text"
                  placeholder="+92-300-1234567"
                  value={newService.contact}
                  onChange={(e) => setNewService({ ...newService, contact: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Experience *</label>
                <input
                  type="text"
                  placeholder="e.g., 5 years"
                  value={newService.experience}
                  onChange={(e) => setNewService({ ...newService, experience: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Availability *</label>
                <input
                  type="text"
                  placeholder="e.g., 9am - 6pm"
                  value={newService.availability}
                  onChange={(e) => setNewService({ ...newService, availability: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (Rs.) *</label>
                <input
                  type="text"
                  placeholder="e.g., 500-1500"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Description</label>
                <textarea
                  placeholder="Describe your service and expertise..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  rows="4"
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleAddService}
              disabled={submitting}
              className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="group-hover:scale-110 transition-transform" size={20} />
                  Save Service
                </>
              )}
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                  <Wrench className="text-white" size={24} />
                </div>
                Your Services
              </h2>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm">
                {services.length} Total
              </span>
            </div>

            {services.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="text-gray-400" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Services Added Yet</h3>
                <p className="text-gray-600 mb-6">Start by adding your first service to get bookings!</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all inline-flex items-center gap-2"
                >
                  <PlusCircle size={20} />
                  Add Your First Service
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {services.map((srv) => (
                  <div key={srv._id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl shadow-lg">
                          <Wrench className="text-white" size={28} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{srv.category}</h3>
                          <p className="text-sm text-gray-600">{srv.experience} experience</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        {getStatusBadge(srv.status)}
                        <button 
                          onClick={() => handleDeleteService(srv._id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <MapPin className="text-blue-600" size={18} />
                        </div>
                        <span className="text-sm font-medium">{srv.location}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="bg-green-50 p-2 rounded-lg">
                          <Phone className="text-green-600" size={18} />
                        </div>
                        <span className="text-sm font-medium">{srv.contact}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="bg-purple-50 p-2 rounded-lg">
                          <Clock className="text-purple-600" size={18} />
                        </div>
                        <span className="text-sm font-medium">{srv.availability}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="bg-orange-50 p-2 rounded-lg">
                          <DollarSign className="text-orange-600" size={18} />
                        </div>
                        <span className="text-sm font-medium">Rs. {srv.price}</span>
                      </div>
                    </div>

                    {srv.description && (
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed">{srv.description}</p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Submitted: {new Date(srv.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Bookings Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                <Calendar className="text-white" size={24} />
              </div>
              Recent Bookings
            </h2>

            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-800">{booking.customer}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{booking.service}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{booking.date}</span>
                    <span className="text-green-600 font-bold">Rs. {booking.amount}</span>
                  </div>
                </div>
              ))}

              <button className="w-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 py-3 rounded-xl font-bold hover:from-green-200 hover:to-emerald-200 transition-all">
                View All Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;