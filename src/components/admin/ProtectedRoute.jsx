import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Check if user is authenticated and is an admin
  if (loading) {
    return null; // or a small loader if you prefer
  }
  if (!isAuthenticated || !isAdmin()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
