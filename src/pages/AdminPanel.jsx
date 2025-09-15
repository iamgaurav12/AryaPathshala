// src/pages/AdminPanel.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/admin/AdminDashboard';
import { useTheme } from '../hooks/useTheme';
import { AlertCircle, Lock } from 'lucide-react';

const AdminPanel = () => {
  const { password } = useParams();
  const navigate = useNavigate();
  const { login, isAuthenticated, logout, ADMIN_PASSWORD } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    // Verify the password in URL matches the admin password
    if (password !== ADMIN_PASSWORD) {
      navigate('/gaurav');
      return;
    }

    // If not already authenticated, try to authenticate with the URL password
    if (!isAuthenticated) {
      const success = login(password);
      if (!success) {
        navigate('/gaurav');
        return;
      }
    }
  }, [password, isAuthenticated, login, navigate, ADMIN_PASSWORD]);

  // Show loading while verifying authentication
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  // Invalid password in URL
  if (password !== ADMIN_PASSWORD) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-md mx-auto p-6 text-center">
          <AlertCircle className={`h-16 w-16 mx-auto mb-4 ${
            darkMode ? 'text-red-400' : 'text-red-500'
          }`} />
          <h2 className={`text-xl font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Access Denied
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Invalid credentials. Please check your access URL.
          </p>
          <button
            onClick={() => navigate('/gaurav')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Admin Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Lock className="h-6 w-6 text-blue-500" />
              <h1 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                AryaPathshala Admin Panel
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Welcome, Admin
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className={`px-3 py-1 text-sm rounded ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <AdminDashboard />
    </div>
  );
};

export default AdminPanel;