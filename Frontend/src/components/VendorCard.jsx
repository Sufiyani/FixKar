// import React, { useState } from 'react';
// import { MapPin, Phone, Star, DollarSign, Award, Calendar, Clock } from 'lucide-react';

// const VendorCard = ({ vendor }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-300"
//     >
//       {/* Gradient Overlay on Hover */}
//       <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

//       {/* Top Badge */}
//       <div className="absolute top-4 right-4 z-10">
//         <div className={`px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md border transition-all duration-300 ${
//           vendor.available 
//             ? 'bg-emerald-500/90 text-white border-emerald-400 shadow-lg shadow-emerald-500/50' 
//             : 'bg-gray-500/90 text-white border-gray-400'
//         }`}>
//           {vendor.available ? '✓ Available Now' : '⏱ Busy'}
//         </div>
//       </div>

//       {/* Profile Header with Gradient Background */}
//       <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-8 text-center">
//         {/* Decorative Pattern */}
//         <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]"></div>
        
//         <div className="relative">
//           {/* Avatar with Animation */}
//           <div className={`inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 shadow-xl transition-transform duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
//             <span className="text-5xl">{vendor.image}</span>
//           </div>
          
//           <h3 className="text-2xl font-bold text-white mb-1">{vendor.name}</h3>
//           <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30">
//             <span className="text-white font-semibold">{vendor.category}</span>
//           </div>
//         </div>
//       </div>

//       {/* Card Content */}
//       <div className="relative p-6">
//         {/* Rating & Experience Section */}
//         <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1.5 rounded-lg shadow-md">
//               <Star size={16} className="text-white fill-white" />
//               <span className="text-white font-bold">{vendor.rating}</span>
//             </div>
//             <span className="text-sm text-gray-600">({vendor.bookings} bookings)</span>
//           </div>
          
//           <div className="flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
//             <Clock size={14} />
//             <span className="text-sm font-medium">{vendor.experience}</span>
//           </div>
//         </div>

//         {/* Info List */}
//         <div className="space-y-3 mb-5">
//           <div className="flex items-center gap-3 text-gray-700 group/item hover:text-blue-600 transition-colors">
//             <div className="bg-blue-50 p-2 rounded-lg group-hover/item:bg-blue-100 transition-colors">
//               <MapPin size={16} className="text-blue-600" />
//             </div>
//             <span className="text-sm font-medium">{vendor.location}</span>
//           </div>
          
//           <div className="flex items-center gap-3 text-gray-700 group/item hover:text-blue-600 transition-colors">
//             <div className="bg-green-50 p-2 rounded-lg group-hover/item:bg-green-100 transition-colors">
//               <Phone size={16} className="text-green-600" />
//             </div>
//             <span className="text-sm font-medium">{vendor.phone}</span>
//           </div>
          
//           <div className="flex items-center gap-3 text-gray-700 group/item hover:text-blue-600 transition-colors">
//             <div className="bg-purple-50 p-2 rounded-lg group-hover/item:bg-purple-100 transition-colors">
//               <DollarSign size={16} className="text-purple-600" />
//             </div>
//             <span className="text-sm font-medium">Rs. {vendor.price}</span>
//           </div>
//         </div>

//         {/* Verified Badge */}
//         <div className="flex items-center gap-2 bg-blue-50 px-4 py-2.5 rounded-lg mb-5">
//           <Award className="text-blue-600" size={18} />
//           <span className="text-sm font-semibold text-blue-700">Verified Professional</span>
//         </div>

//         {/* Book Button */}
//         <button
//           disabled={!vendor.available}
//           className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
//             vendor.available
//               ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
//               : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           <Calendar size={20} />
//           {vendor.available ? 'Book Now' : 'Currently Unavailable'}
//         </button>
//       </div>

//       {/* Hover Effect Border */}
//       <div className={`absolute inset-0 rounded-2xl border-2 border-blue-500 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
//     </div>
//   );
// };

// export default VendorCard;