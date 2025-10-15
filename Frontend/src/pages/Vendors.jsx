import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  DollarSign, 
  Star, 
  Award,
  Wrench,
  Filter,
  CheckCircle,
  TrendingUp,
  Mail,
  Shield,
  Briefcase
} from 'lucide-react';

const Vendors = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Karachi areas list
  const karachiAreas = [
    'All',
    'Clifton',
    'Defence (DHA)',
    'Gulshan-e-Iqbal',
    'North Nazimabad',
    'Nazimabad',
    'FB Area',
    'Saddar',
    'Buffer Zone',
    'Bahadurabad',
    'Numaish',
    'New Karachi',
    'North Karachi',
    'Malir',
    'Korangi',
    'Landhi',
    'Gulistan-e-Jauhar',
    'Scheme 33',
    'Surjani Town',
    'North Karachi',
    'Tariq Road',
    'PECHS',
    'Shahrah-e-Faisal',
    'Soldier Bazaar',
    'Garden',
    'Liaquatabad',
    'Orangi Town',
    'Baldia Town',
    'SITE Area',
    'Kemari',
    'Lyari',
    'Jamshed Town',
    'Gulberg',
    'Johar',
    'Shah Faisal Colony',
    'Model Colony',
    'Khayaban-e-Ittehad',
    'Khayaban-e-Seher',
    'Khayaban-e-Shahbaz',
    'Khayaban-e-Bukhari',
    'Khayaban-e-Rahat',
    'Khayaban-e-Jami',
    'Khayaban-e-Mujahid',
    'Pakistan Chowk',
    'Shahra-e-Pakistan',
    'Shahra-e-Quaideen',
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
  }, [searchTerm, selectedCategory, selectedLocation, services]);

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

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.vendorId?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== 'All') {
      filtered = filtered.filter(service => 
        service.location.toLowerCase().includes(selectedLocation.toLowerCase())
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
        {error && (
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

              {/* Category Filter */}
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

              {/* Location Filter */}
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

              {/* Clear Filters */}
              {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchTerm) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedLocation('All');
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
              {(selectedCategory !== 'All' || selectedLocation !== 'All') && (
                <p className="text-gray-600 mt-1">
                  {selectedCategory !== 'All' && `Category: ${selectedCategory}`}
                  {selectedLocation !== 'All' && selectedCategory !== 'All' && ' • '}
                  {selectedLocation !== 'All' && `Location: ${selectedLocation}`}
                </p>
              )}
            </div>

            {/* Services Grid */}
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
                      {/* Service Icon & Status */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-5xl shadow-lg">
                          {getCategoryIcon(service.category)}
                        </div>
                        <div className="mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold text-center flex items-center justify-center gap-1">
                          <CheckCircle size={12} />
                          Verified
                        </div>
                      </div>

                      {/* Service Details */}
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

                        {/* Description */}
                        {service.description && (
                          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        )}

                        {/* Availability & Contact */}
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
                              <Phone className="text-green-600" size={18} />
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 font-semibold mb-1">Contact</p>
                              <p className="text-sm font-bold text-gray-800">{service.contact}</p>
                            </div>
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <DollarSign className="text-green-600" size={20} />
                                <div>
                                  <p className="text-xs text-gray-600">Price Range</p>
                                  <p className="text-lg font-bold text-green-600">Rs. {service.price}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={`tel:${service.contact}`}
                                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                              >
                                <Phone size={18} />
                                Contact Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stats Footer */}
            {filteredServices.length > 0 && (
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-blue-500">
                  <TrendingUp className="text-blue-600 mx-auto mb-3" size={32} />
                  <p className="text-3xl font-bold text-gray-800 mb-1">{services.length}+</p>
                  <p className="text-gray-600 font-semibold">Verified Vendors</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-l-4 border-green-500">
                  <Star className="text-yellow-500 fill-yellow-500 mx-auto mb-3" size={32} />
                  <p className="text-3xl font-bold text-gray-800 mb-1">4.8+</p>
                  <p className="text-gray-600 font-semibold">Average Rating</p>
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
    </div>
  );
};

export default Vendors;