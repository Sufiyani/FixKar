import React from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp
} from "react-icons/fa";
import { Wrench, Heart, Shield, Award, Clock, Users } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Top Wave Decoration */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 80L60 70C120 60 240 40 360 33.3C480 27 600 33 720 36.7C840 40 960 40 1080 33.3C1200 27 1320 13 1380 6.7L1440 0V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="rgb(248 250 252)" fillOpacity="1"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur-md opacity-75"></div>
                <div className="relative bg-gradient-to-br from-white to-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Wrench className="text-blue-600" size={32} />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  FixKar
                </h2>
                <p className="text-xs text-blue-200">Home Services Platform</p>
              </div>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Your trusted partner for finding verified professionals. Quality service, guaranteed satisfaction.
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Shield className="text-green-400" size={16} />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Award className="text-yellow-400" size={16} />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Users className="text-purple-400" size={16} />
                <span>10,000+ Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/login/vendor", label: "Become a Vendor" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Our Services" },
                { to: "/pricing", label: "Pricing" },
                { to: "/faq", label: "FAQs" }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-blue-100 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                "Plumbing Services",
                "Electrical Work",
                "Mechanical Repairs",
                "Carpentry",
                "Painting",
                "AC Repair"
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/"
                    className="text-blue-100 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
              Get In Touch
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 group">
                <div className="bg-blue-800/50 p-2 rounded-lg group-hover:bg-blue-700/50 transition-colors">
                  <FaMapMarkerAlt className="text-blue-300" size={18} />
                </div>
                <div className="text-blue-100 text-sm">
                  <p className="font-semibold text-white mb-1">Address</p>
                  <p>Karachi, Sindh, Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-blue-800/50 p-2 rounded-lg group-hover:bg-blue-700/50 transition-colors">
                  <FaPhone className="text-green-300" size={18} />
                </div>
                <div className="text-blue-100 text-sm">
                  <p className="font-semibold text-white mb-1">Phone</p>
                  <a href="tel:+923001234567" className="hover:text-white transition-colors">
                    +92 300 1234567
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-blue-800/50 p-2 rounded-lg group-hover:bg-blue-700/50 transition-colors">
                  <FaEnvelope className="text-red-300" size={18} />
                </div>
                <div className="text-blue-100 text-sm">
                  <p className="font-semibold text-white mb-1">Email</p>
                  <a href="mailto:support@fixkar.com" className="hover:text-white transition-colors">
                    support@fixkar.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media - Enhanced */}
          <div>
  <p className="font-semibold text-white mb-3">Follow Us</p>
  <div className="flex gap-3">
    {[
      { icon: FaFacebook, color: "hover:bg-blue-600", link: "#" },
      { icon: FaTwitter, color: "hover:bg-sky-500", link: "#" },
      { icon: FaInstagram, color: "hover:bg-pink-600", link: "#" },
      { icon: FaLinkedin, color: "hover:bg-blue-700", link: "#" },
      { icon: FaWhatsapp, color: "hover:bg-green-600", link: "#" },
    ].map((social, idx) => (
      <a
        key={idx}
        href={social.link}
        className={`bg-white/10 backdrop-blur-sm p-3 rounded-xl ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20 group`}
      >
        <social.icon className="text-white group-hover:scale-110 transition-transform" size={20} />
      </a>
    ))}
  </div>
</div>

          </div>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 mb-8 border-y border-white/10">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-4 rounded-xl shadow-lg">
              <Clock className="text-white" size={28} />
            </div>
            <div>
              <p className="font-bold text-white">24/7 Support</p>
              <p className="text-sm text-blue-200">Always here for you</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-xl shadow-lg">
              <Shield className="text-white" size={28} />
            </div>
            <div>
              <p className="font-bold text-white">Secure Platform</p>
              <p className="text-sm text-blue-200">Your data is safe</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-xl shadow-lg">
              <Award className="text-white" size={28} />
            </div>
            <div>
              <p className="font-bold text-white">Quality Guaranteed</p>
              <p className="text-sm text-blue-200">100% satisfaction</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-blue-200">
            <span>© {currentYear} FixKar. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-1 text-blue-200">
            <span>Made with</span>
            <Heart className="text-red-400 fill-red-400 animate-pulse" size={16} />
            <span>in Pakistan</span>
          </div>
          
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-blue-200 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;