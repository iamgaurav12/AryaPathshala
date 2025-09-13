import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { password } = useParams();
  const { isAuthenticated, isValidPassword } = useAuth();

  // Check if user is authenticated and password matches
  if (!isAuthenticated || !isValidPassword(password)) {
    return <Navigate to="/gaurav" replace />;
  }

  return children;
};

export default ProtectedRoute;