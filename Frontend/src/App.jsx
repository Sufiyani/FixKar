import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Router>
   
      <Navbar />

      {/* Main content */}
      <div className="min-h-[80vh]"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:type" element={<Login />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
