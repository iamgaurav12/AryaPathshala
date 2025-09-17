import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import { useTheme } from '../hooks/useTheme';
import { Lock } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading } = useAuth(); // include loading
  const { darkMode } = useTheme();

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        // Force a page reload to clear any remaining state
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
      <div className={`sticky top-0 z-50 ${
        darkMode 
          ? 'bg-gray-900/95 backdrop-blur border-gray-700' 
          : 'bg-white/95 backdrop-blur border-gray-200'
        } border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <h1 className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                AryaPathshala Admin Panel
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Welcome, Admin
              </span>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
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
