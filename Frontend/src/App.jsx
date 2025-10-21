// import React from "react";
// import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./pages/ProtectedRoute";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import VendorSignup from "./pages/VendorSignup";
// import VendorDashboard from "./pages/VendorDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import Vendors from "./pages/Vendors";
// const App = () => {
//   return (
//     <Router>
   
//       {/* <Navbar /> */}

//        {/* Navbar automatically detects authentication state */}
//       <Navbar notifications={1} />


//       {/* Main content */}
//       <div className="min-h-[80vh]"> 
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login/:type" element={<Login />} />
//           <Route path="/register" element={<VendorSignup />} />
//           {/* <Route path="/vendor-dashboard" element={<VendorDashboard />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
//               {/* Protected Vendor Dashboard */}
//           <Route 
//             path="/vendor-dashboard" 
//             element={
//               <ProtectedRoute allowedType="vendor">
//                 <VendorDashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Protected Admin Dashboard */}
//           <Route 
//             path="/admin-dashboard" 
//             element={
//               <ProtectedRoute allowedType="admin">
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />

//             <Route path="/vendors" element={<Vendors />} />
//            {/* Catch all - redirect to home */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>

//       <Footer />
//     </Router>
//   );
// };

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./pages/ProtectedRoute";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import VendorSignup from "./pages/VendorSignup";
// import VendorDashboard from "./pages/VendorDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import VendorsManagement from "./pages/VendorsManagement";
// import BookingsManagement from "./pages/BookingsManagement";
// import Vendors from "./pages/Vendors";

// const App = () => {
//   return (
//     <Router>
//       {/* Navbar automatically detects authentication state */}
//       <Navbar notifications={1} />
      
//       {/* Main content */}
//       <div className="min-h-[80vh]"> 
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login/:type" element={<Login />} />
//           <Route path="/register" element={<VendorSignup />} />
          
//           {/* Protected Vendor Dashboard */}
//           <Route 
//             path="/vendor-dashboard" 
//             element={
//               <ProtectedRoute allowedType="vendor">
//                 <VendorDashboard />
//               </ProtectedRoute>
//             } 
//           />
          
//           {/* Protected Admin Dashboard */}
//           <Route 
//             path="/admin-dashboard" 
//             element={
//               <ProtectedRoute allowedType="admin">
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />

//           {/* Protected Admin - Vendors Management */}
//           <Route 
//             path="/admin/vendors" 
//             element={
//               <ProtectedRoute allowedType="admin">
//                 <VendorsManagement />
//               </ProtectedRoute>
//             } 
//           />

//           {/* Protected Admin - Bookings Management */}
//           <Route 
//             path="/admin/bookings" 
//             element={
//               <ProtectedRoute allowedType="admin">
//                 <BookingsManagement />
//               </ProtectedRoute>
//             } 
//           />

//           <Route path="/vendors" element={<Vendors />} />
          
//           {/* Catch all - redirect to home */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
      
//       <Footer />
//     </Router>
//   );
// };

// export default App;


// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VendorSignup from "./pages/VendorSignup";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VendorsManagement from "./pages/VendorsManagement";
import BookingsManagement from "./pages/BookingsManagement";
import Vendors from "./pages/Vendors";

const App = () => {
  return (
    <Router>
      {/* Navbar automatically detects authentication state */}
      <Navbar notifications={1} />
      
      {/* Main content */}
      <div className="min-h-[80vh]"> 
        <Routes>
          {/* ========== PUBLIC ROUTES ========== */}
          <Route path="/" element={<Home />} />
          <Route path="/login/:type" element={<Login />} />
          <Route path="/register" element={<VendorSignup />} />
          <Route path="/vendors" element={<Vendors />} />
          
          {/* ========== PROTECTED VENDOR ROUTES ========== */}
          <Route 
            path="/vendor-dashboard" 
            element={
              <ProtectedRoute allowedType="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* ========== PROTECTED ADMIN ROUTES ========== */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/vendors" 
            element={
              <ProtectedRoute allowedType="admin">
                <VendorsManagement />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/bookings" 
            element={
              <ProtectedRoute allowedType="admin">
                <BookingsManagement />
              </ProtectedRoute>
            } 
          />
          
          {/* ========== CATCH ALL ========== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      
      <Footer />
    </Router>
  );
};

export default App;