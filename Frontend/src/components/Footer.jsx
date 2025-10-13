// src/components/Footer.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaWhatsapp
} from "react-icons/fa";
import { Wrench, Heart, Shield, Award, Clock, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
    alert('Thanks for subscribing!');
  };

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/vendors", label: "Find Services" },
    { to: "/register", label: "Become a Vendor" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" }
  ];

  const services = [
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "AC Repair",
    "Mechanics"
  ];

  const socialMedia = [
    { icon: FaFacebook, color: "hover:bg-blue-600", link: "https://facebook.com" },
    { icon: FaTwitter, color: "hover:bg-sky-500", link: "https://twitter.com" },
    { icon: FaInstagram, color: "hover:bg-pink-600", link: "https://instagram.com" },
    { icon: FaLinkedin, color: "hover:bg-blue-700", link: "https://linkedin.com" },
    { icon: FaWhatsapp, color: "hover:bg-green-600", link: "https://wa.me/923001234567" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 80L60 70C120 60 240 40 360 33.3C480 27 600 33 720 36.7C840 40 960 40 1080 33.3C1200 27 1320 13 1380 6.7L1440 0V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="rgb(15 23 42)" fillOpacity="1"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur-md opacity-75"></div>
                <div className="relative bg-gradient-to-br from-white to-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-xl">
                  <Wrench className="text-blue-600" size={28} />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">FixKar</h2>
                <p className="text-xs text-blue-200">Home Services</p>
              </div>
            </Link>
            <p className="text-blue-100 mb-4 text-sm leading-relaxed">
              Your trusted platform for verified home service professionals. Quality guaranteed.
            </p>
            
            {/* Quick Stats */}
            <div className="flex gap-4 text-sm">
              <div>
                <p className="font-bold text-white">500+</p>
                <p className="text-blue-300 text-xs">Experts</p>
              </div>
              <div>
                <p className="font-bold text-white">10K+</p>
                <p className="text-blue-300 text-xs">Customers</p>
              </div>
              <div>
                <p className="font-bold text-white">4.9★</p>
                <p className="text-blue-300 text-xs">Rating</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-blue-100 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/vendors"
                    className="text-blue-100 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Stay Connected</h3>
            
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Mail size={18} />
                </button>
              </div>
            </form>

            {/* Contact */}
            <div className="space-y-2 mb-4 text-sm">
              <a href="tel:+923001234567" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                <Phone size={16} />
                <span>+92 300 1234567</span>
              </a>
              <a href="mailto:support@fixkar.com" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                <Mail size={16} />
                <span>support@fixkar.com</span>
              </a>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin size={16} />
                <span>Karachi, Pakistan</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-2">
              {socialMedia.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white/10 p-2 rounded-lg ${social.color} transition-all hover:scale-110 border border-white/20`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Features Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 mb-8 border-y border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-lg">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">24/7 Support</p>
              <p className="text-xs text-blue-200">Always available</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2.5 rounded-lg">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Verified Experts</p>
              <p className="text-xs text-blue-200">Background checked</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2.5 rounded-lg">
              <Award className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Satisfaction Guaranteed</p>
              <p className="text-xs text-blue-200">100% quality</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10 text-sm">
          <div className="flex items-center gap-2 text-blue-200">
            <span>© {currentYear} FixKar. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-2 text-blue-200">
            <span>Made with</span>
            <Heart className="text-red-400 fill-red-400 animate-pulse" size={14} />
            <span>in Pakistan</span>
          </div>
          
          <div className="flex gap-4">
            <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-blue-200 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;