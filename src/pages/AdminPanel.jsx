import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/admin/AdminDashboard';
import { useTheme } from '../hooks/useTheme';
import { Lock } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading } = useAuth(); // include loading
  const { darkMode } = useTheme();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      navigate('/admin/login' , {replace : true});
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading only while verifying authentication
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Admin Header */}
      <div
        className={`${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Lock className="h-6 w-6 text-blue-500" />
              <h1
                className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                AryaPathshala Admin Panel
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <span
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Welcome, Admin
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate('/admin/login', { replace: true });
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
