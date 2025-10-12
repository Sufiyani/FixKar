import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Shield, Clock, Award } from 'lucide-react';
import VendorCard from '../components/VendorCard';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const vendors = [
    { id: 1, name: 'Ali Raza', category: 'Plumber', location: 'Karachi', rating: 4.8, experience: '5 years', phone: '+92-300-1234567', price: '500-1500', image: '👨‍🔧', available: true, bookings: 156 },
    { id: 2, name: 'Ahmed Khan', category: 'Electrician', location: 'Karachi', rating: 4.9, experience: '7 years', phone: '+92-301-2345678', price: '600-2000', image: '⚡', available: true, bookings: 203 },
    { id: 3, name: 'Hassan Ali', category: 'Mechanic', location: 'Karachi', rating: 4.7, experience: '4 years', phone: '+92-302-3456789', price: '800-2500', image: '🔧', available: false, bookings: 134 },
    { id: 4, name: 'Bilal Ahmed', category: 'Carpenter', location: 'Karachi', rating: 4.6, experience: '6 years', phone: '+92-303-4567890', price: '700-2200', image: '🪚', available: true, bookings: 98 },
  ];

  const categories = [
    { name: 'All', icon: '🏠' },
    { name: 'Plumber', icon: '🚰' },
    { name: 'Electrician', icon: '💡' },
    { name: 'Mechanic', icon: '🔧' },
    { name: 'Carpenter', icon: '🪵' },
    { name: 'Painter', icon: '🎨' },
  ];

  const filteredVendors = vendors.filter(v =>
    (selectedCategory === 'All' || v.category === selectedCategory) &&
    (v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section - Modern & Beautiful */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/30">
              <Shield className="text-white" size={18} />
              <span className="text-white font-medium">Trusted by 10,000+ Customers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                Service Provider
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Connect with verified professionals for all your home service needs in Karachi
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2 backdrop-blur-lg border border-white/50">
                <div className="flex-1 relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for plumbers, electricians, mechanics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-lg"
                  />
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                  <Search size={20} className="group-hover:scale-110 transition-transform" />
                  Search
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-blue-100 text-sm font-medium">Verified Experts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-blue-100 text-sm font-medium">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-4xl font-bold text-white mb-2">4.9</div>
                <div className="text-blue-100 text-sm font-medium">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-100 text-sm font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" fillOpacity="1"/>
          </svg>
        </div>
      </div>

      {/* Categories Section - Beautiful Card Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
              <Filter size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Browse by Category</h2>
              <p className="text-gray-600">Find the perfect service for your needs</p>
            </div>
          </div>
        </div>

        {/* Category Pills - Modern Design */}
        <div className="flex gap-4 flex-wrap mb-12">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                selectedCategory === cat.name
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/50 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-lg">{cat.name}</span>
              {selectedCategory === cat.name && (
                <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {selectedCategory === 'All' ? 'All Professionals' : `${selectedCategory}s`}
            </h3>
            <p className="text-gray-600">{filteredVendors.length} professionals available</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp size={16} className="text-blue-600" />
            <span>Sorted by popularity</span>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVendors.map(v => <VendorCard key={v.id} vendor={v} />)}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No vendors found</h3>
            <p className="text-gray-600">Try adjusting your search or category filters</p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose FixKar?</h2>
            <p className="text-blue-100 text-lg">Your trusted partner for home services</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Verified Professionals</h3>
              <p className="text-blue-100">All service providers are thoroughly verified and background-checked</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Quick Response</h3>
              <p className="text-blue-100">Get connected with professionals within minutes of booking</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Quality Guaranteed</h3>
              <p className="text-blue-100">100% satisfaction guarantee or your money back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;