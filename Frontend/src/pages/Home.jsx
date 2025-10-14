// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Search, Shield, Clock, Award, Star, TrendingUp, 
//   CheckCircle, Phone, Mail, MapPin, Users, Zap,
//   ThumbsUp, ArrowRight, Play, Quote
// } from 'lucide-react';

// const Home = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       // Navigate to vendors page with search query
//       navigate(`/vendors?search=${searchTerm}`);
//     }
//   };

//   const services = [
//     { icon: '🔧', name: 'Plumbing', count: '150+ Experts', color: 'from-blue-500 to-cyan-500' },
//     { icon: '⚡', name: 'Electrical', count: '120+ Experts', color: 'from-yellow-500 to-orange-500' },
//     { icon: '🔨', name: 'Carpentry', count: '90+ Experts', color: 'from-amber-500 to-yellow-500' },
//     { icon: '🎨', name: 'Painting', count: '110+ Experts', color: 'from-purple-500 to-pink-500' },
//     { icon: '❄️', name: 'AC Repair', count: '80+ Experts', color: 'from-cyan-500 to-blue-500' },
//     { icon: '🚗', name: 'Car Mechanic', count: '95+ Experts', color: 'from-red-500 to-orange-500' },
//     { icon: '📱', name: 'Mobile Repair', count: '70+ Experts', color: 'from-indigo-500 to-purple-500' },
//     { icon: '🏠', name: 'Home Cleaning', count: '130+ Experts', color: 'from-green-500 to-teal-500' },
//   ];

//   const testimonials = [
//     {
//       id: 1,
//       name: 'Ahmed Hassan',
//       role: 'Business Owner',
//       image: '👨‍💼',
//       rating: 5,
//       text: 'FixKar helped me find an excellent electrician within minutes. The professional was punctual, skilled, and very reasonably priced. Highly recommend!',
//       service: 'Electrical Work'
//     },
//     {
//       id: 2,
//       name: 'Fatima Khan',
//       role: 'Homemaker',
//       image: '👩',
//       rating: 5,
//       text: 'I was worried about finding a reliable plumber, but FixKar made it so easy. The service was professional and the prices were transparent. Will definitely use again!',
//       service: 'Plumbing'
//     },
//     {
//       id: 3,
//       name: 'Ali Raza',
//       role: 'Software Engineer',
//       image: '👨‍💻',
//       rating: 5,
//       text: 'Best platform for home services in Karachi! I found a carpenter who did amazing work on my furniture. The booking process was seamless.',
//       service: 'Carpentry'
//     },
//     {
//       id: 4,
//       name: 'Sara Ahmed',
//       role: 'Teacher',
//       image: '👩‍🏫',
//       rating: 5,
//       text: 'Quick response, verified professionals, and excellent service. FixKar has become my go-to platform for all home maintenance needs.',
//       service: 'AC Repair'
//     }
//   ];

//   const stats = [
//     { icon: Users, value: '10,000+', label: 'Happy Customers', color: 'text-blue-600' },
//     { icon: Shield, value: '500+', label: 'Verified Experts', color: 'text-green-600' },
//     { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'text-yellow-600' },
//     { icon: CheckCircle, value: '50,000+', label: 'Jobs Completed', color: 'text-purple-600' }
//   ];

//   const howItWorks = [
//     {
//       step: '01',
//       title: 'Search Service',
//       description: 'Browse or search for the service you need from our wide range of categories',
//       icon: Search,
//       color: 'from-blue-500 to-cyan-500'
//     },
//     {
//       step: '02',
//       title: 'Choose Expert',
//       description: 'View profiles, ratings, and reviews to select the perfect professional for your job',
//       icon: Users,
//       color: 'from-purple-500 to-pink-500'
//     },
//     {
//       step: '03',
//       title: 'Book & Pay',
//       description: 'Schedule your service at your convenience and pay securely through our platform',
//       icon: CheckCircle,
//       color: 'from-green-500 to-emerald-500'
//     },
//     {
//       step: '04',
//       title: 'Get It Done',
//       description: 'Sit back and relax while our verified professional completes your job perfectly',
//       icon: ThumbsUp,
//       color: 'from-orange-500 to-red-500'
//     }
//   ];

//   const features = [
//     {
//       icon: Shield,
//       title: 'Verified Professionals',
//       description: 'All service providers undergo thorough background checks and verification',
//       color: 'bg-blue-500'
//     },
//     {
//       icon: Clock,
//       title: 'Quick Response Time',
//       description: 'Get connected with professionals within minutes of booking',
//       color: 'bg-green-500'
//     },
//     {
//       icon: Award,
//       title: 'Quality Guaranteed',
//       description: '100% satisfaction guarantee or your money back, no questions asked',
//       color: 'bg-purple-500'
//     },
//     {
//       icon: Star,
//       title: 'Top Rated Service',
//       description: 'Consistently rated 4.9/5 stars by thousands of satisfied customers',
//       color: 'bg-yellow-500'
//     },
//     {
//       icon: Zap,
//       title: 'Instant Booking',
//       description: 'Book services instantly with our easy-to-use platform',
//       color: 'bg-orange-500'
//     },
//     {
//       icon: Phone,
//       title: '24/7 Support',
//       description: 'Round-the-clock customer support to assist you anytime',
//       color: 'bg-red-500'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/30">
//               <Shield className="text-white" size={18} />
//               <span className="text-white font-medium">Trusted by 10,000+ Customers Across Pakistan</span>
//             </div>

//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//               Your Trusted Platform for
//               <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
//                 Home Services
//               </span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
//               Connect with verified, skilled professionals for all your service needs. Fast, reliable, and affordable.
//             </p>

//             {/* Search Bar */}
//             <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12">
//               <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2 backdrop-blur-lg border border-white/50">
//                 <div className="flex-1 relative">
//                   <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input
//                     type="text"
//                     placeholder="Search for plumbers, electricians, mechanics..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-14 pr-4 py-4 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-lg"
//                   />
//                 </div>
//                 <button 
//                   type="submit"
//                   className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
//                 >
//                   <Search size={20} className="group-hover:scale-110 transition-transform" />
//                   Search Now
//                 </button>
//               </div>
//             </form>

//             {/* Quick Action Buttons */}
//             <div className="flex flex-wrap justify-center gap-4 mb-16">
//               <button 
//                 onClick={() => navigate('/vendors')}
//                 className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-3 rounded-xl font-semibold border border-white/30 transition-all hover:scale-105"
//               >
//                 Browse All Services
//               </button>
//               <button 
//                 onClick={() => navigate('/register')}
//                 className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-xl font-semibold border border-white transition-all hover:scale-105 flex items-center gap-2"
//               >
//                 Become a Service Provider
//                 <ArrowRight size={18} />
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
//               {stats.map((stat, index) => (
//                 <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
//                   <stat.icon className={`${stat.color} mx-auto mb-3`} size={32} />
//                   <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
//                   <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
//             <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" fillOpacity="1"/>
//           </svg>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Popular Services
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Choose from our wide range of professional home services
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="group cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:scale-105"
//               >
//                 <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                   <span className="text-3xl">{service.icon}</span>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
//                 <p className="text-gray-600 text-sm font-medium">{service.count}</p>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <button 
//               onClick={() => navigate('/vendors')}
//               className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
//             >
//               View All Services
//               <ArrowRight size={20} />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               How FixKar Works
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Get your service done in 4 simple steps
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {howItWorks.map((step, index) => (
//               <div key={index} className="relative">
//                 <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full border-2 border-gray-100 hover:border-blue-300">
//                   <div className={`absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
//                     {step.step}
//                   </div>
//                   <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-6 mt-6`}>
//                     <step.icon className="text-white" size={32} />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
//                   <p className="text-gray-600">{step.description}</p>
//                 </div>
//                 {index < howItWorks.length - 1 && (
//                   <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
//                     <ArrowRight className="text-blue-300" size={32} />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Why Choose FixKar?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               We're committed to providing the best service experience
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all"
//               >
//                 <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
//                   <feature.icon className="text-white" size={28} />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
//                 <p className="text-gray-600 leading-relaxed">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//               What Our Customers Say
//             </h2>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//               Don't just take our word for it - hear from our satisfied customers
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             {testimonials.map((testimonial) => (
//               <div
//                 key={testimonial.id}
//                 className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
//               >
//                 <Quote className="text-white/40 mb-4" size={40} />
//                 <div className="flex items-center gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
//                   ))}
//                 </div>
//                 <p className="text-white text-lg mb-6 leading-relaxed italic">
//                   "{testimonial.text}"
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl">
//                     {testimonial.image}
//                   </div>
//                   <div>
//                     <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
//                     <p className="text-blue-200 text-sm">{testimonial.role}</p>
//                     <p className="text-blue-300 text-xs mt-1">Service: {testimonial.service}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 md:p-16 shadow-2xl">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Ready to Get Started?
//             </h2>
//             <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
//               Join thousands of satisfied customers who trust FixKar for their service needs
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button 
//                 onClick={() => navigate('/vendors')}
//                 className="bg-white hover:bg-gray-50 text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
//               >
//                 Find a Service
//                 <ArrowRight size={20} />
//               </button>
//               <button 
//                 onClick={() => navigate('/register')}
//                 className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold text-lg border-2 border-white transition-all inline-flex items-center justify-center gap-2"
//               >
//                 Become a Provider
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300">
//               <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Phone className="text-white" size={28} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
//               <p className="text-gray-600 mb-2">Mon-Sun: 24/7</p>
//               <a href="tel:+923001234567" className="text-blue-600 font-semibold text-lg hover:text-blue-700">
//                 +92 300 1234567
//               </a>
//             </div>

//             <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300">
//               <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Mail className="text-white" size={28} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
//               <p className="text-gray-600 mb-2">Response within 24 hours</p>
//               <a href="mailto:support@fixkar.com" className="text-blue-600 font-semibold text-lg hover:text-blue-700">
//                 support@fixkar.com
//               </a>
//             </div>

//             <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300">
//               <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <MapPin className="text-white" size={28} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
//               <p className="text-gray-600 mb-2">Mon-Fri: 9AM - 6PM</p>
//               <p className="text-blue-600 font-semibold text-lg">
//                 Karachi, Pakistan
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


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
      // Navigate to vendors page with search query
      navigate(`/vendors?search=${searchTerm}`);
    }
  };

  const services = [
    { icon: '🔧', name: 'Plumbing', count: '150+ Experts', color: 'from-blue-500 to-cyan-500' },
    { icon: '⚡', name: 'Electrical', count: '120+ Experts', color: 'from-yellow-500 to-orange-500' },
    { icon: '🔨', name: 'Carpentry', count: '90+ Experts', color: 'from-amber-500 to-yellow-500' },
    { icon: '🎨', name: 'Painting', count: '110+ Experts', color: 'from-purple-500 to-pink-500' },
    { icon: '❄️', name: 'AC Repair', count: '80+ Experts', color: 'from-cyan-500 to-blue-500' },
    { icon: '🚗', name: 'Car Mechanic', count: '95+ Experts', color: 'from-red-500 to-orange-500' },
    { icon: '📱', name: 'Mobile Repair', count: '70+ Experts', color: 'from-indigo-500 to-purple-500' },
    { icon: '🏠', name: 'Home Cleaning', count: '130+ Experts', color: 'from-green-500 to-teal-500' },
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
    { icon: Shield, value: '500+', label: 'Verified Experts', color: 'text-green-600' },
    { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'text-yellow-600' },
    { icon: CheckCircle, value: '50,000+', label: 'Jobs Completed', color: 'text-purple-600' }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Search Service',
      description: 'Browse or search for the service you need from our wide range of categories',
      icon: Search,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'Choose Expert',
      description: 'View profiles, ratings, and reviews to select the perfect professional for your job',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '03',
      title: 'Book & Pay',
      description: 'Schedule your service at your convenience and pay securely through our platform',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      step: '04',
      title: 'Get It Done',
      description: 'Sit back and relax while our verified professional completes your job perfectly',
      icon: ThumbsUp,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'All service providers undergo thorough background checks and verification',
      color: 'bg-blue-500'
    },
    {
      icon: Clock,
      title: 'Quick Response Time',
      description: 'Get connected with professionals within minutes of booking',
      color: 'bg-green-500'
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: '100% satisfaction guarantee or your money back, no questions asked',
      color: 'bg-purple-500'
    },
    {
      icon: Star,
      title: 'Top Rated Service',
      description: 'Consistently rated 4.9/5 stars by thousands of satisfied customers',
      color: 'bg-yellow-500'
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book services instantly with our easy-to-use platform',
      color: 'bg-orange-500'
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you anytime',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/30">
              <Shield className="text-white" size={18} />
              <span className="text-white font-medium">Trusted by 10,000+ Customers Across Pakistan</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your Trusted Platform for
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                Home Services
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Connect with verified, skilled professionals for all your service needs. Fast, reliable, and affordable.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12">
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
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <Search size={20} className="group-hover:scale-110 transition-transform" />
                  Search Now
                </button>
              </div>
            </form>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button 
                onClick={() => navigate('/vendors')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-3 rounded-xl font-semibold border border-white/30 transition-all hover:scale-105"
              >
                Browse All Services
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-xl font-semibold border border-white transition-all hover:scale-105 flex items-center gap-2"
              >
                Become a Service Provider
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                  <stat.icon className={`${stat.color} mx-auto mb-3`} size={32} />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" fillOpacity="1"/>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of professional home services
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => navigate(`/vendors?category=${service.name}`)}
                className="group cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm font-medium">{service.count}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/vendors')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How FixKar Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your service done in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full border-2 border-gray-100 hover:border-blue-300">
                  <div className={`absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.step}
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-6 mt-6`}>
                    <step.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-blue-300" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose FixKar?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best service experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all"
              >
                <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
              >
                <Quote className="text-white/40 mb-4" size={40} />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>
                <p className="text-white text-lg mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-blue-200 text-sm">{testimonial.role}</p>
                    <p className="text-blue-300 text-xs mt-1">Service: {testimonial.service}</p>
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 md:p-16 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust FixKar for their service needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/vendors')}
                className="bg-white hover:bg-gray-50 text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
              >
                Find a Service
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold text-lg border-2 border-white transition-all inline-flex items-center justify-center gap-2"
              >
                Become a Provider
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600 mb-2">Mon-Sun: 24/7</p>
              <a href="tel:+923001234567" className="text-blue-600 font-semibold text-lg hover:text-blue-700">
                +92 300 1234567
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600 mb-2">Response within 24 hours</p>
              <a href="mailto:support@fixkar.com" className="text-blue-600 font-semibold text-lg hover:text-blue-700">
                support@fixkar.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-600 mb-2">Mon-Fri: 9AM - 6PM</p>
              <p className="text-blue-600 font-semibold text-lg">
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