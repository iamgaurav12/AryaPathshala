import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStudentAuth } from '../../context/StudentAuthContext';
import Loading from '../common/Loading';

const StudentProtectedRoute = ({ children }) => {
  const { currentStudent, loading } = useStudentAuth();

  if (loading) {
    return <Loading />;
  }

  if (!currentStudent) {
    return <Navigate to="/student/login" />;
  }

  return children;
};

export default StudentProtectedRoute;