import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Clock, DollarSign, Star, Award, Wrench, Filter,
  CheckCircle, TrendingUp, Shield, Briefcase, Wifi, WifiOff, X, Calendar,
  User, Mail, Phone as PhoneIcon, Home, MessageSquare
} from 'lucide-react';

const Vendors = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  
  // Booking modal states
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const karachiAreas = [
    'All', 'Clifton', 'Defence (DHA)', 'Gulshan-e-Iqbal', 'North Nazimabad',
    'Nazimabad', 'FB Area', 'Saddar', 'Buffer Zone', 'Bahadurabad', 'Numaish',
    'New Karachi', 'North Karachi', 'Malir', 'Korangi', 'Landhi',
    'Gulistan-e-Jauhar', 'Scheme 33', 'Surjani Town', 'Tariq Road', 'PECHS',
    'Shahrah-e-Faisal', 'Soldier Bazaar', 'Garden', 'Liaquatabad',
    'Orangi Town', 'Baldia Town', 'SITE Area', 'Kemari', 'Lyari'
  ];

  const categories = [
    { name: 'All', icon: '🏠' },
    { name: 'Plumbing', icon: '🚰' },
    { name: 'Electrical', icon: '💡' },
    { name: 'Car Mechanic', icon: '🔧' },
    { name: 'Carpentry', icon: '🪵' },
    { name: 'Painting', icon: '🎨' },
    { name: 'AC Repair', icon: '❄️' },
    { name: 'Mobile Repair', icon: '📱' },
    { name: 'Home Cleaning', icon: '🧹' }
  ];

  useEffect(() => {
    fetchApprovedServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchTerm, selectedCategory, selectedLocation, availabilityFilter, services]);

  const fetchApprovedServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/services/approved`);
      const data = await response.json();
      
      if (response.ok) {
        setServices(data);
        setFilteredServices(data);
      } else {
        setError('Failed to fetch services');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to connect to server');
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = [...services];

    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.vendorId?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(service => 
        service.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(service => 
        service.vendorId?.availabilityStatus === availabilityFilter
      );
    }

    setFilteredServices(filtered);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Plumbing': '🔧',
      'Electrical': '⚡',
      'Car Mechanic': '🚗',
      'Carpentry': '🪚',
      'Painting': '🎨',
      'AC Repair': '❄️',
      'Mobile Repair': '📱',
      'Home Cleaning': '🧹'
    };
    return icons[category] || '🔧';
  };

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
    setBookingSuccess(null);
    setError('');
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingForm,
          serviceId: selectedService._id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingSuccess(data);
        setBookingForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          notes: ''
        });
      } else {
        setError(data.message || 'Failed to create booking');
      }
    } catch (err) {
      setError('Failed to submit booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedService(null);
    setBookingSuccess(null);
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    });
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-b-3xl py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Wrench className="text-white" size={40} />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">Find Expert Vendors</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Browse verified professionals for all your home service needs
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <CheckCircle className="text-green-300" size={20} />
              <span className="text-blue-100 font-semibold">
                {filteredServices.length} Verified Professionals Available
              </span>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by service, location, or vendor name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && !showBookingModal && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Wifi size={18} className="text-green-600" />
                  Availability
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setAvailabilityFilter('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      availabilityFilter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Vendors
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('available')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      availabilityFilter === 'available'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Wifi size={16} />
                    Available Now
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('busy')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      availabilityFilter === 'busy'
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <WifiOff size={16} />
                    Busy
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Wrench size={18} className="text-blue-600" />
                  Category
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {categories.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        selectedCategory === cat.name
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-red-600" />
                  Location (Karachi)
                </h3>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {karachiAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchTerm || availabilityFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedLocation('All');
                    setAvailabilityFilter('all');
                  }}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all font-semibold shadow-lg"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'} Found
              </h2>
              {(selectedCategory !== 'All' || selectedLocation !== 'All' || availabilityFilter !== 'all') && (
                <p className="text-gray-600 mt-1">
                  {selectedCategory !== 'All' && `Category: ${selectedCategory}`}
                  {selectedLocation !== 'All' && selectedCategory !== 'All' && ' • '}
                  {selectedLocation !== 'All' && `Location: ${selectedLocation}`}
                  {availabilityFilter !== 'all' && ' • '}
                  {availabilityFilter === 'available' && 'Available Now'}
                  {availabilityFilter === 'busy' && 'Busy Vendors'}
                </p>
              )}
            </div>

            {filteredServices.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Services Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedLocation('All');
                    setAvailabilityFilter('all');
                  }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-1 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:scale-[1.02]"
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-5xl shadow-lg">
                          {getCategoryIcon(service.category)}
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold text-center flex items-center justify-center gap-1">
                            <CheckCircle size={12} />
                            Verified
                          </div>
                          {service.vendorId?.availabilityStatus && (
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold text-center flex items-center justify-center gap-1 ${
                              service.vendorId.availabilityStatus === 'available'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {service.vendorId.availabilityStatus === 'available' ? (
                                <>
                                  <Wifi size={12} />
                                  Available
                                </>
                              ) : (
                                <>
                                  <WifiOff size={12} />
                                  Busy
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl font-bold text-gray-900">{service.vendorId?.name}</h3>
                              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                                <Shield size={12} />
                                <span>Verified</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Briefcase size={16} className="text-blue-600" />
                                {service.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={16} className="text-red-600" />
                                {service.location}
                              </span>
                              {service.experience && (
                                <span className="flex items-center gap-1">
                                  <Award size={16} className="text-orange-600" />
                                  {service.experience}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right mt-2 md:mt-0">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="text-yellow-500 fill-yellow-500" size={20} />
                              <span className="text-xl font-bold text-gray-900">4.8</span>
                              <span className="text-sm text-gray-600">(50+)</span>
                            </div>
                          </div>
                        </div>

                        {service.description && (
                          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-purple-50 p-2 rounded-lg">
                              <Clock className="text-purple-600" size={18} />
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-1">Availability</p>
                              <p className="text-sm font-bold text-gray-800">{service.availability}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-green-50 p-2 rounded-lg">
                              <DollarSign className="text-green-600" size={18} />
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-1">Price Range</p>
                              <p className="text-lg font-bold text-green-600">Rs. {service.price}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <button
                            onClick={() => handleBookNow(service)}
                            disabled={service.vendorId?.availabilityStatus === 'busy'}
                            className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                              service.vendorId?.availabilityStatus === 'busy'
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                            }`}
                          >
                            <Calendar size={18} />
                            {service.vendorId?.availabilityStatus === 'busy' ? 'Currently Busy' : 'Book Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredServices.length > 0 && (
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-blue-500">
                  <TrendingUp className="text-blue-600 mx-auto mb-3" size={32} />
                  <p className="text-3xl font-bold text-gray-800 mb-1">{services.length}+</p>
                  <p className="text-gray-600 font-semibold">Verified Vendors</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-green-500">
                  <Wifi className="text-green-600 mx-auto mb-3" size={32} />
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {services.filter(s => s.vendorId?.availabilityStatus === 'available').length}+
                  </p>
                  <p className="text-gray-600 font-semibold">Available Now</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-purple-500">
                  <CheckCircle className="text-green-600 mx-auto mb-3" size={32} />
                  <p className="text-3xl font-bold text-gray-800 mb-1">100%</p>
                  <p className="text-gray-600 font-semibold">Verified Services</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Book Service</h2>
                <p className="text-blue-100">Fill in your details to book this service</p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {!bookingSuccess ? (
                <>
                  <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Briefcase size={18} className="text-blue-600" />
                      Service Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <p className="text-gray-700"><span className="font-semibold">Vendor:</span> {selectedService.vendorId?.name}</p>
                      <p className="text-gray-700"><span className="font-semibold">Service:</span> {selectedService.category}</p>
                      <p className="text-gray-700"><span className="font-semibold">Location:</span> {selectedService.location}</p>
                      <p className="text-gray-700"><span className="font-semibold">Price:</span> Rs. {selectedService.price}</p>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                      <X size={20} />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <User size={16} className="text-blue-600" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Mail size={16} className="text-blue-600" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <PhoneIcon size={16} className="text-blue-600" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="+92 300 1234567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Home size={16} className="text-blue-600" />
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.address}
                        onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your complete address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <MessageSquare size={16} className="text-blue-600" />
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Any specific requirements or details..."
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {bookingLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={20} />
                            Confirm Booking
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Booking Confirmed!</h3>
                  <p className="text-gray-600 mb-6">Your booking has been successfully created.</p>
                  
                  <div className="bg-blue-50 rounded-xl p-6 mb-6 text-left border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <PhoneIcon size={20} className="text-blue-600" />
                      Vendor Contact Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-gray-600" />
                        <div>
                          <p className="text-xs text-gray-600 font-semibold">Name</p>
                          <p className="text-sm font-bold text-gray-900">{bookingSuccess.vendorContact.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <PhoneIcon size={18} className="text-green-600" />
                        <div>
                          <p className="text-xs text-gray-600 font-semibold">Phone</p>
                          <a href={`tel:${bookingSuccess.vendorContact.phone}`} className="text-sm font-bold text-blue-600 hover:text-blue-700">
                            {bookingSuccess.vendorContact.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-600 font-semibold">Email</p>
                          <a href={`mailto:${bookingSuccess.vendorContact.email}`} className="text-sm font-bold text-blue-600 hover:text-blue-700">
                            {bookingSuccess.vendorContact.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;