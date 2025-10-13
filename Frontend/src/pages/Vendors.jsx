
import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Phone, Mail, Briefcase, Clock, Shield, TrendingUp, CheckCircle } from 'lucide-react';

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Hardcoded Vendors Data (Replace with API call later)
  const vendors = [
    {
      id: 1,
      name: 'Ali Raza',
      category: 'Plumber',
      location: 'Gulshan-e-Iqbal',
      city: 'Karachi',
      rating: 4.8,
      reviews: 156,
      experience: '5 years',
      phone: '+92-300-1234567',
      email: 'ali.raza@fixkar.com',
      price: 'Rs. 500-1500',
      image: '👨‍🔧',
      available: true,
      completedJobs: 234,
      verified: true,
      description: 'Expert in all types of plumbing work including pipe fitting, leak repairs, and bathroom installations.',
      services: ['Pipe Fitting', 'Leak Repair', 'Bathroom Installation', 'Water Tank Cleaning']
    },
    {
      id: 2,
      name: 'Ahmed Khan',
      category: 'Electrician',
      location: 'Defence',
      city: 'Karachi',
      rating: 4.9,
      reviews: 203,
      experience: '7 years',
      phone: '+92-301-2345678',
      email: 'ahmed.khan@fixkar.com',
      price: 'Rs. 600-2000',
      image: '⚡',
      available: true,
      completedJobs: 312,
      verified: true,
      description: 'Licensed electrician specializing in residential and commercial electrical work.',
      services: ['Wiring', 'Circuit Breaker', 'Fan Installation', 'Light Fixtures']
    },
    {
      id: 3,
      name: 'Hassan Ali',
      category: 'Mechanic',
      location: 'Clifton',
      city: 'Karachi',
      rating: 4.7,
      reviews: 134,
      experience: '4 years',
      phone: '+92-302-3456789',
      email: 'hassan.ali@fixkar.com',
      price: 'Rs. 800-2500',
      image: '🔧',
      available: false,
      completedJobs: 178,
      verified: true,
      description: 'Professional car mechanic with expertise in all major car brands.',
      services: ['Engine Repair', 'Oil Change', 'Brake Service', 'AC Repair']
    },
    {
      id: 4,
      name: 'Bilal Ahmed',
      category: 'Carpenter',
      location: 'North Nazimabad',
      city: 'Karachi',
      rating: 4.6,
      reviews: 98,
      experience: '6 years',
      phone: '+92-303-4567890',
      email: 'bilal.ahmed@fixkar.com',
      price: 'Rs. 700-2200',
      image: '🪚',
      available: true,
      completedJobs: 145,
      verified: true,
      description: 'Skilled carpenter for custom furniture, kitchen cabinets, and wooden fixtures.',
      services: ['Furniture Making', 'Cabinet Installation', 'Door Repair', 'Wood Flooring']
    },
    {
      id: 5,
      name: 'Imran Malik',
      category: 'Painter',
      location: 'Malir',
      city: 'Karachi',
      rating: 4.5,
      reviews: 87,
      experience: '3 years',
      phone: '+92-304-5678901',
      email: 'imran.malik@fixkar.com',
      price: 'Rs. 400-1800',
      image: '🎨',
      available: true,
      completedJobs: 112,
      verified: true,
      description: 'Professional painter for interior and exterior painting services.',
      services: ['Interior Painting', 'Exterior Painting', 'Wall Textures', 'Color Consultation']
    },
    {
      id: 6,
      name: 'Farhan Shah',
      category: 'AC Technician',
      location: 'Saddar',
      city: 'Karachi',
      rating: 4.9,
      reviews: 221,
      experience: '8 years',
      phone: '+92-305-6789012',
      email: 'farhan.shah@fixkar.com',
      price: 'Rs. 900-3000',
      image: '❄️',
      available: true,
      completedJobs: 289,
      verified: true,
      description: 'AC expert for installation, repair, and maintenance of all AC brands.',
      services: ['AC Installation', 'AC Repair', 'Gas Refilling', 'Maintenance']
    },
    {
      id: 7,
      name: 'Usman Ali',
      category: 'Plumber',
      location: 'Korangi',
      city: 'Karachi',
      rating: 4.4,
      reviews: 76,
      experience: '4 years',
      phone: '+92-306-7890123',
      email: 'usman.ali@fixkar.com',
      price: 'Rs. 450-1400',
      image: '👨‍🔧',
      available: true,
      completedJobs: 98,
      verified: true,
      description: 'Reliable plumber for emergency and routine plumbing services.',
      services: ['Emergency Repairs', 'Drain Cleaning', 'Fixture Installation', 'Water Heater']
    },
    {
      id: 8,
      name: 'Zain Abbas',
      category: 'Electrician',
      location: 'Gulistan-e-Jauhar',
      city: 'Karachi',
      rating: 4.7,
      reviews: 142,
      experience: '5 years',
      phone: '+92-307-8901234',
      email: 'zain.abbas@fixkar.com',
      price: 'Rs. 550-1900',
      image: '⚡',
      available: true,
      completedJobs: 187,
      verified: true,
      description: 'Certified electrician for home and office electrical solutions.',
      services: ['Panel Upgrades', 'Smart Home Setup', 'Generator Installation', 'Emergency Service']
    }
  ];

  const categories = [
    { name: 'All', icon: '🏠' },
    { name: 'Plumber', icon: '🚰' },
    { name: 'Electrician', icon: '💡' },
    { name: 'Mechanic', icon: '🔧' },
    { name: 'Carpenter', icon: '🪵' },
    { name: 'Painter', icon: '🎨' },
    { name: 'AC Technician', icon: '❄️' }
  ];

  const locations = [
    'All',
    'Gulshan-e-Iqbal',
    'Defence',
    'Clifton',
    'North Nazimabad',
    'Malir',
    'Saddar',
    'Korangi',
    'Gulistan-e-Jauhar'
  ];

  // Filter vendors
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || vendor.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Service Provider
            </h1>
            <p className="text-xl text-blue-100">
              Browse through {vendors.length} verified professionals in Karachi
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, category, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
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
                <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== 'All' || selectedLocation !== 'All') && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLocation('All');
                  }}
                  className="w-full mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Vendors Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredVendors.length} Professional{filteredVendors.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-gray-600">
                  {selectedCategory !== 'All' && `Category: ${selectedCategory}`}
                  {selectedLocation !== 'All' && ` • Location: ${selectedLocation}`}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp size={16} className="text-blue-600" />
                <span>Sorted by rating</span>
              </div>
            </div>

            {/* Vendors List */}
            {filteredVendors.length > 0 ? (
              <div className="space-y-6">
                {filteredVendors.map(vendor => (
                  <div
                    key={vendor.id}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Vendor Image/Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-5xl shadow-lg">
                          {vendor.image}
                        </div>
                        {vendor.available ? (
                          <div className="mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold text-center">
                            Available Now
                          </div>
                        ) : (
                          <div className="mt-3 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold text-center">
                            Busy
                          </div>
                        )}
                      </div>

                      {/* Vendor Details */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl font-bold text-gray-900">{vendor.name}</h3>
                              {vendor.verified && (
                                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                                  <Shield size={12} />
                                  <span>Verified</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Briefcase size={16} className="text-blue-600" />
                                {vendor.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={16} className="text-red-600" />
                                {vendor.location}, {vendor.city}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={16} className="text-green-600" />
                                {vendor.experience}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="text-yellow-500 fill-yellow-500" size={20} />
                              <span className="text-xl font-bold text-gray-900">{vendor.rating}</span>
                              <span className="text-sm text-gray-600">({vendor.reviews} reviews)</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <CheckCircle size={14} className="inline text-green-600" /> {vendor.completedJobs} jobs completed
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{vendor.description}</p>

                        {/* Services Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {vendor.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {service}
                            </span>
                          ))}
                        </div>

                        {/* Contact & Price */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
                          <div className="flex gap-4">
                            <a
                              href={`tel:${vendor.phone}`}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                            >
                              <Phone size={18} />
                              <span className="hidden sm:inline">{vendor.phone}</span>
                            </a>
                            <a
                              href={`mailto:${vendor.email}`}
                              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                            >
                              <Mail size={18} />
                              <span className="hidden sm:inline">Email</span>
                            </a>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Starting from</p>
                              <p className="text-xl font-bold text-blue-600">{vendor.price}</p>
                            </div>
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No vendors found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedLocation('All');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendors;