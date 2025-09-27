import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import { useTheme } from '../hooks/useTheme';
import { Lock, LogOut, Shield, User } from 'lucide-react';

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
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-dark-primary' : 'bg-gray-50'
      }`}>
        {/* Background Pattern for Loading */}
        {darkMode && (
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
            </div>
          </div>
        )}
        
        <div className="relative z-10 text-center">
          <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${
            darkMode 
              ? 'bg-yellow-primary/20 shadow-yellow-glow' 
              : 'bg-blue-100'
          }`}>
            <Shield className={`h-8 w-8 animate-pulse ${
              darkMode ? 'text-yellow-primary' : 'text-blue-500'
            }`} />
          </div>
          
          <div className={`animate-spin rounded-full h-10 w-10 border-3 mx-auto mb-4 ${
            darkMode 
              ? 'border-yellow-primary border-t-transparent' 
              : 'border-blue-500 border-t-transparent'
          }`}></div>
          
          <p className={`text-lg font-medium ${
            darkMode ? 'text-dark-primary' : 'text-gray-700'
          }`}>
            Verifying admin access...
          </p>
          <p className={`text-sm mt-2 ${
            darkMode ? 'text-dark-muted' : 'text-gray-500'
          }`}>
            Please wait while we authenticate your credentials
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      darkMode ? 'bg-dark-primary' : 'bg-gray-50'
    }`}>
      {/* Admin Header */}
      <div className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-dark-card/95 backdrop-blur-lg border-dark-primary shadow-dark-elevation shadow-yellow-glow/20' 
          : 'bg-white/95 backdrop-blur border-gray-200 shadow-sm'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand Section */}
            <div className="flex items-center space-x-4">
              <div className={`p-2.5 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-yellow-primary to-yellow-secondary shadow-yellow-glow' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                <Lock className={`h-5 w-5 ${
                  darkMode ? 'text-black' : 'text-white'
                }`} />
              </div>
              
              <div>
                <h1 className={`text-xl font-bold ${
                  darkMode ? 'text-dark-primary' : 'text-gray-900'
                }`}>
                  AryaPathshala
                </h1>
                <p className={`text-xs font-medium ${
                  darkMode ? 'text-yellow-primary' : 'text-blue-600'
                }`}>
                  Admin Control Panel
                </p>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-6">
              {/* Welcome Message */}
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  darkMode 
                    ? 'bg-yellow-primary/20 border border-yellow-primary/30' 
                    : 'bg-blue-100 border border-blue-200'
                }`}>
                  <User className={`h-4 w-4 ${
                    darkMode ? 'text-yellow-primary' : 'text-blue-600'
                  }`} />
                </div>
                
                <div className="hidden sm:block">
                  <p className={`text-sm font-medium ${
                    darkMode ? 'text-dark-primary' : 'text-gray-900'
                  }`}>
                    Welcome back!
                  </p>
                  <p className={`text-xs ${
                    darkMode ? 'text-dark-muted' : 'text-gray-500'
                  }`}>
                    Administrator
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  darkMode
                    ? 'bg-dark-tertiary hover:bg-dark-hover text-dark-primary hover:text-yellow-primary border border-dark-primary hover:border-yellow-primary/50'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-200'
                }`}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className={`px-4 sm:px-6 lg:px-8 ${
          darkMode ? 'bg-dark-tertiary/50' : 'bg-gray-50'
        }`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between py-2 text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    darkMode ? 'bg-yellow-primary' : 'bg-green-500'
                  }`}></div>
                  <span className={darkMode ? 'text-dark-muted' : 'text-gray-500'}>
                    System Online
                  </span>
                </div>
                
                <div className={`h-3 w-px ${
                  darkMode ? 'bg-dark-primary' : 'bg-gray-300'
                }`}></div>
                
                <span className={darkMode ? 'text-dark-muted' : 'text-gray-500'}>
                  Last login: {new Date().toLocaleDateString()}
                </span>
              </div>
              
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                darkMode 
                  ? 'bg-yellow-primary/20 text-yellow-primary border border-yellow-primary/30' 
                  : 'bg-blue-100 text-blue-600 border border-blue-200'
              }`}>
                ADMIN MODE
              </div>
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