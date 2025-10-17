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
  const [vendorStatus, setVendorStatus] = useState('available');
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
      
      const profileRes = await fetch(`${API_BASE_URL}/vendors/profile`, {
        headers: getAuthHeaders()
      });
      const profileData = await profileRes.json();
      setVendorStatus(profileData.availabilityStatus || 'available');
      
      const servicesRes = await fetch(`${API_BASE_URL}/vendors/services`, {
        headers: getAuthHeaders()
      });
      const servicesData = await servicesRes.json();
      
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
        return <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 border border-green-200">
          <CheckCircle size={14} /> Approved
        </span>;
      case 'Pending':
        return <span className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 border border-amber-200">
          <Clock size={14} /> Pending
        </span>;
      case 'Disapproved':
        return <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 border border-red-200">
          <XCircle size={14} /> Disapproved
        </span>;
      default:
        return <span className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200">
          {status}
        </span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Wrench className="text-emerald-600" size={28} />
                Vendor Dashboard
              </h1>
              <p className="text-gray-600 text-sm">Manage your services and track performance</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={toggleAvailability}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  vendorStatus === 'available' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {vendorStatus === 'available' ? (
                  <>
                    <Wifi size={16} />
                    Available
                  </>
                ) : (
                  <>
                    <WifiOff size={16} />
                    Busy
                  </>
                )}
              </button>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-all text-sm"
              >
                <PlusCircle size={16} />
                Add Service
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <TrendingUp className="text-green-500" size={16} />
            </div>
            <p className="text-gray-600 text-xs font-medium mb-1">Total Bookings</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</p>
            <p className="text-green-600 text-xs mt-1">↑ 12% this month</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-amber-50 p-2 rounded-lg">
                <Star className="text-amber-600 fill-amber-600" size={20} />
              </div>
              <Award className="text-amber-500" size={16} />
            </div>
            <p className="text-gray-600 text-xs font-medium mb-1">Rating</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.rating}</p>
            <p className="text-gray-500 text-xs mt-1">{stats.reviews || 0} reviews</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-50 p-2 rounded-lg">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <TrendingUp className="text-green-500" size={16} />
            </div>
            <p className="text-gray-600 text-xs font-medium mb-1">Total Earnings</p>
            <p className="text-2xl font-semibold text-gray-900">Rs. {stats.earnings?.toLocaleString() || 0}</p>
            <p className="text-green-600 text-xs mt-1">↑ 8% increase</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Users className="text-purple-600" size={20} />
              </div>
              <CheckCircle className="text-purple-500" size={16} />
            </div>
            <p className="text-gray-600 text-xs font-medium mb-1">Active Services</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.activeServices}</p>
            <p className="text-gray-500 text-xs mt-1">Approved services</p>
          </div>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <PlusCircle className="text-emerald-600" size={24} />
                Add New Service
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Category *</label>
                <select
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
                <input
                  type="text"
                  placeholder="e.g., Karachi, Clifton"
                  value={newService.location}
                  onChange={(e) => setNewService({ ...newService, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Number *</label>
                <input
                  type="text"
                  placeholder="+92-300-1234567"
                  value={newService.contact}
                  onChange={(e) => setNewService({ ...newService, contact: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience *</label>
                <input
                  type="text"
                  placeholder="e.g., 5 years"
                  value={newService.experience}
                  onChange={(e) => setNewService({ ...newService, experience: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability *</label>
                <input
                  type="text"
                  placeholder="e.g., 9am - 6pm"
                  value={newService.availability}
                  onChange={(e) => setNewService({ ...newService, availability: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Price Range (Rs.) *</label>
                <input
                  type="text"
                  placeholder="e.g., 500-1500"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Description</label>
                <textarea
                  placeholder="Describe your service and expertise..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleAddService}
              disabled={submitting}
              className="mt-5 w-full bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Service
                </>
              )}
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Wrench className="text-emerald-600" size={20} />
                Your Services
              </h2>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg font-medium text-xs border border-emerald-200">
                {services.length} Total
              </span>
            </div>

            {services.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Services Added Yet</h3>
                <p className="text-gray-600 mb-5 text-sm">Start by adding your first service to get bookings</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-all inline-flex items-center gap-2 text-sm"
                >
                  <PlusCircle size={16} />
                  Add Your First Service
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((srv) => (
                  <div key={srv._id} className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-600 p-2.5 rounded-lg">
                          <Wrench className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{srv.category}</h3>
                          <p className="text-xs text-gray-600">{srv.experience} experience</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        {getStatusBadge(srv.status)}
                        <button 
                          onClick={() => handleDeleteService(srv._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="text-blue-600" size={16} />
                        <span className="text-sm">{srv.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="text-green-600" size={16} />
                        <span className="text-sm">{srv.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="text-purple-600" size={16} />
                        <span className="text-sm">{srv.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <DollarSign className="text-orange-600" size={16} />
                        <span className="text-sm">Rs. {srv.price}</span>
                      </div>
                    </div>

                    {srv.description && (
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-700 leading-relaxed">{srv.description}</p>
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Submitted: {new Date(srv.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="text-purple-600" size={20} />
              Recent Bookings
            </h2>

            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{booking.customer}</h4>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      booking.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-200' :
                      booking.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{booking.service}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{booking.date}</span>
                    <span className="text-green-600 font-semibold">Rs. {booking.amount}</span>
                  </div>
                </div>
              ))}

              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-medium transition-all text-sm">
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