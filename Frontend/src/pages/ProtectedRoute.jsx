import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedType }) => {
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");

  // If no token, redirect to login page of the allowed type
  if (!token) {
    return <Navigate to={`/login/${allowedType}`} replace />;
  }

  // If user type doesn't match, redirect to appropriate login
  if (userType !== allowedType) {
    return <Navigate to={`/login/${allowedType}`} replace />;
  }

  // If authenticated and correct type, render the protected component
  return children;
};

export default ProtectedRoute;