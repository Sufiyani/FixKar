import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Shield, Clock, Award, Star, TrendingUp, 
  CheckCircle, Phone, Mail, MapPin, Users, Zap,
  ThumbsUp, ArrowRight, Play, Quote
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/vendors?search=${searchTerm}`);
    }
  };

  const services = [
    { icon: '🔧', name: 'Plumbing', count: '150+ Experts', color: 'from-blue-500 to-blue-600' },
    { icon: '⚡', name: 'Electrical', count: '120+ Experts', color: 'from-amber-500 to-amber-600' },
    { icon: '🔨', name: 'Carpentry', count: '90+ Experts', color: 'from-orange-500 to-orange-600' },
    { icon: '🎨', name: 'Painting', count: '110+ Experts', color: 'from-purple-500 to-purple-600' },
    { icon: '❄️', name: 'AC Repair', count: '80+ Experts', color: 'from-cyan-500 to-cyan-600' },
    { icon: '🚗', name: 'Car Mechanic', count: '95+ Experts', color: 'from-red-500 to-red-600' },
    { icon: '📱', name: 'Mobile Repair', count: '70+ Experts', color: 'from-indigo-500 to-indigo-600' },
    { icon: '🏠', name: 'Home Cleaning', count: '130+ Experts', color: 'from-emerald-500 to-emerald-600' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      role: 'Business Owner',
      image: '👨‍💼',
      rating: 5,
      text: 'FixKar helped me find an excellent electrician within minutes. The professional was punctual, skilled, and very reasonably priced. Highly recommend!',
      service: 'Electrical Work'
    },
    {
      id: 2,
      name: 'Fatima Khan',
      role: 'Homemaker',
      image: '👩',
      rating: 5,
      text: 'I was worried about finding a reliable plumber, but FixKar made it so easy. The service was professional and the prices were transparent. Will definitely use again!',
      service: 'Plumbing'
    },
    {
      id: 3,
      name: 'Ali Raza',
      role: 'Software Engineer',
      image: '👨‍💻',
      rating: 5,
      text: 'Best platform for home services in Karachi! I found a carpenter who did amazing work on my furniture. The booking process was seamless.',
      service: 'Carpentry'
    },
    {
      id: 4,
      name: 'Sara Ahmed',
      role: 'Teacher',
      image: '👩‍🏫',
      rating: 5,
      text: 'Quick response, verified professionals, and excellent service. FixKar has become my go-to platform for all home maintenance needs.',
      service: 'AC Repair'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Customers', color: 'text-blue-600' },
    { icon: Shield, value: '500+', label: 'Verified Experts', color: 'text-emerald-600' },
    { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'text-amber-500' },
    { icon: CheckCircle, value: '50,000+', label: 'Jobs Completed', color: 'text-purple-600' }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Search Service',
      description: 'Browse or search for the service you need from our wide range of categories',
      icon: Search,
      color: 'from-blue-500 to-blue-600'
    },
    {
      step: '02',
      title: 'Choose Expert',
      description: 'View profiles, ratings, and reviews to select the perfect professional for your job',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      step: '03',
      title: 'Book & Pay',
      description: 'Schedule your service at your convenience and pay securely through our platform',
      icon: CheckCircle,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      step: '04',
      title: 'Get It Done',
      description: 'Sit back and relax while our verified professional completes your job perfectly',
      icon: ThumbsUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All service providers undergo thorough background checks and verification',
      color: 'bg-blue-600'
    },
    {
      icon: Clock,
      title: 'Quick Response Time',
      description: 'Get connected with professionals within minutes of booking',
      color: 'bg-emerald-600'
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: '100% satisfaction guarantee or your money back, no questions asked',
      color: 'bg-purple-600'
    },
    {
      icon: Star,
      title: 'Top Rated Service',
      description: 'Consistently rated 4.9/5 stars by thousands of satisfied customers',
      color: 'bg-amber-500'
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book services instantly with our easy-to-use platform',
      color: 'bg-orange-600'
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you anytime',
      color: 'bg-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
              <Shield className="text-emerald-400" size={16} />
              <span className="text-white text-sm font-medium">Trusted by 10,000+ Customers</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Your Trusted Platform for
              <span className="block text-emerald-400 mt-2">
                Home Services
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Connect with verified, skilled professionals for all your service needs. Fast, reliable, and affordable.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for plumbers, electricians, mechanics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 text-gray-700 rounded-xl focus:outline-none bg-transparent"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-medium shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  Search
                </button>
              </div>
            </form>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button 
                onClick={() => navigate('/vendors')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium border border-white/20 transition-all"
              >
                Browse All Services
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2"
              >
                Become a Service Provider
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <stat.icon className={`${stat.color} mx-auto mb-3`} size={28} />
                  <div className="text-3xl font-semibold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of professional home services
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => navigate(`/vendors?category=${service.name}`)}
                className="group cursor-pointer bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                <p className="text-gray-500 text-sm">{service.count}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/vendors')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-medium shadow-sm transition-all inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              How FixKar Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your service done in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-full hover:shadow-md transition-all">
                  <div className={`absolute -top-4 left-6 w-10 h-10 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
                    {step.step}
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-4 mt-6`}>
                    <step.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-gray-300" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Why Choose FixKar?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best service experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all"
              >
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="text-white" size={22} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Quote className="text-white/20 mb-3" size={32} />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-amber-400" size={16} />
                  ))}
                </div>
                <p className="text-white text-sm mb-6 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                    <p className="text-emerald-400 text-xs mt-0.5">Service: {testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-900 rounded-3xl p-12 md:p-16 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust FixKar for their service needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/vendors')}
                className="bg-white hover:bg-gray-100 text-slate-900 px-8 py-3.5 rounded-xl font-medium shadow-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Find a Service
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-medium transition-all inline-flex items-center justify-center gap-2"
              >
                Become a Provider
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center border border-gray-200 hover:shadow-md transition-all">
              <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-500 text-sm mb-2">Mon-Sun: 24/7</p>
              <a href="tel:+923001234567" className="text-blue-600 font-medium hover:text-blue-700">
                +92 300 1234567
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm text-center border border-gray-200 hover:shadow-md transition-all">
              <div className="bg-emerald-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-500 text-sm mb-2">Response within 24 hours</p>
              <a href="mailto:support@fixkar.com" className="text-emerald-600 font-medium hover:text-emerald-700">
                support@fixkar.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm text-center border border-gray-200 hover:shadow-md transition-all">
              <div className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-500 text-sm mb-2">Mon-Fri: 9AM - 6PM</p>
              <p className="text-purple-600 font-medium">
                Karachi, Pakistan
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;