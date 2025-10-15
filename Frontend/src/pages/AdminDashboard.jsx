import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, Eye, Users, TrendingUp, Clock, AlertCircle, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [pendingServices, setPendingServices] = useState([]);
  const [stats, setStats] = useState({
    totalVendors: 0,
    pendingServices: 0,
    approvedServices: 0,
    totalServices: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedService, setSelectedService] = useState(null);

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
      
      // Fetch pending services
      const servicesRes = await fetch(`${API_BASE_URL}/admin/services/pending`, {
        headers: getAuthHeaders()
      });
      const servicesData = await servicesRes.json();
      
      // Fetch stats
      const statsRes = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: getAuthHeaders()
      });
      const statsData = await statsRes.json();
      
      setPendingServices(servicesData);
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
      } else {
        setError(data.message || 'Failed to approve service');
      }
    } catch (err) {
      setError('Failed to approve service');
    }
  };

  const handleDisapprove = async (serviceId) => {
    if (!window.confirm('Are you sure you want to disapprove this service? This action cannot be undone.')) {
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
      } else {
        setError(data.message || 'Failed to disapprove service');
      }
    } catch (err) {
      setError('Failed to disapprove service');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/admin/login';
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
        
        {/* Alert Messages */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle size={20} />
            {success}
          </div>
        )}

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="relative flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Shield className="text-white" size={32} />
                </div>
                Admin Dashboard
              </h1>
              <p className="text-blue-100 text-lg">Manage vendors and approve services</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold border border-white/30 transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="text-blue-600" size={28} />
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">Total Vendors</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalVendors}</p>
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
                <TrendingUp className="text-purple-600" size={28} />
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">Total Services</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalServices}</p>
          </div>
        </div>

        {/* Pending Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Clock className="text-yellow-600" size={28} />
            Pending Service Approvals ({pendingServices.length})
          </h2>

          {pendingServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-gray-400" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">All caught up!</h3>
              <p className="text-gray-600">No pending services to review</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingServices.map((service) => (
                <div key={service._id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Service Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{service.category}</h3>
                          <p className="text-gray-600">Submitted by: <span className="font-semibold text-blue-600">{service.vendorId?.name}</span></p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-bold">
                          Pending
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">📧 Email</p>
                          <p className="font-medium text-gray-800">{service.vendorId?.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">📱 Phone</p>
                          <p className="font-medium text-gray-800">{service.contact}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">📍 Location</p>
                          <p className="font-medium text-gray-800">{service.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">💰 Price Range</p>
                          <p className="font-medium text-gray-800">Rs. {service.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">🕒 Availability</p>
                          <p className="font-medium text-gray-800">{service.availability}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">⭐ Experience</p>
                          <p className="font-medium text-gray-800">{service.experience}</p>
                        </div>
                      </div>

                      {service.description && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <p className="text-sm text-gray-600 mb-1">📝 Description</p>
                          <p className="text-gray-800">{service.description}</p>
                        </div>
                      )}

                      <div className="text-sm text-gray-500">
                        Submitted: {new Date(service.createdAt).toLocaleString()}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex lg:flex-col gap-3 lg:w-48">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="flex-1 lg:flex-none bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <Eye size={20} />
                        View Details
                      </button>
                      <button
                        onClick={() => handleApprove(service._id)}
                        className="flex-1 lg:flex-none bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={20} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleDisapprove(service._id)}
                        className="flex-1 lg:flex-none bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <XCircle size={20} />
                        Disapprove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedService(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Service Details</h2>
                <button onClick={() => setSelectedService(null)} className="text-gray-400 hover:text-gray-600 text-3xl">
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedService.category}</h3>
                  <p className="text-gray-600">by {selectedService.vendorId?.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{selectedService.vendorId?.email}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-semibold text-gray-900">{selectedService.contact}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="font-semibold text-gray-900">{selectedService.location}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Price</p>
                    <p className="font-semibold text-gray-900">Rs. {selectedService.price}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Availability</p>
                    <p className="font-semibold text-gray-900">{selectedService.availability}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Experience</p>
                    <p className="font-semibold text-gray-900">{selectedService.experience}</p>
                  </div>
                </div>

                {selectedService.description && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-2">Description</p>
                    <p className="text-gray-900">{selectedService.description}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      handleApprove(selectedService._id);
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Approve Service
                  </button>
                  <button
                    onClick={() => {
                      handleDisapprove(selectedService._id);
                    }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle size={20} />
                    Disapprove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;