import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, currentPassword, loading } = useAuth();
  const { password } = useParams();

  if (loading) {
    return <Loading />;
  }

  // Check if user is authenticated and password matches the route
  if (!isAuthenticated || currentPassword !== password) {
    return <Navigate to="/gaurav" replace />;
  }

  return children;
};

export default ProtectedRoute;