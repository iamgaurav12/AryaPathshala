// src/pages/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthContext';
import { useTheme } from '../hooks/useTheme';
import { Lock, Eye, EyeOff, Shield, AlertCircle, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { darkMode } = useTheme();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/authenticated');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login({
        username: import.meta.env.VITE_ADMIN_USERNAME,
        password
      });
      
      if (success) {
        navigate('/admin/authenticated');
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      darkMode ? 'bg-dark-primary' : 'bg-gray-50'
    }`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`} />
        {darkMode && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-tertiary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 ${
            darkMode 
              ? 'bg-yellow-primary/20 shadow-yellow-glow animate-pulse' 
              : 'bg-blue-100'
          }`}>
            <Shield className={`h-10 w-10 ${
              darkMode ? 'text-yellow-primary' : 'text-blue-500'
            }`} />
          </div>
          
          <h1 className={`text-3xl font-bold mb-3 ${
            darkMode ? 'text-dark-primary' : 'text-gray-900'
          }`}>
            Admin Access
          </h1>
          
          <p className={`text-base ${
            darkMode ? 'text-dark-muted' : 'text-gray-600'
          }`}>
            Enter your password to access the AryaPathshala admin panel
          </p>
        </div>

        {/* Login Form */}
        <div className={`rounded-2xl p-8 backdrop-blur-lg border transition-all duration-300 ${
          darkMode 
            ? 'bg-dark-card/90 shadow-dark-elevation-lg border-dark-primary shadow-yellow-glow/50' 
            : 'bg-white shadow-lg border-gray-200'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div>
              <label 
                htmlFor="password"
                className={`block text-sm font-medium mb-3 ${
                  darkMode ? 'text-dark-secondary' : 'text-gray-700'
                }`}
              >
                Admin Password
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${
                    darkMode ? 'text-dark-muted' : 'text-gray-400'
                  }`} />
                </div>
                
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent ${
                    error 
                      ? darkMode 
                        ? 'border-red-500 bg-red-900/20 text-dark-primary focus:ring-red-500' 
                        : 'border-red-500 bg-red-50 text-gray-900 focus:ring-red-500'
                      : darkMode 
                      ? 'border-dark-primary bg-dark-tertiary/70 text-dark-primary hover:border-yellow-primary/50 focus:ring-yellow-primary focus:border-yellow-primary' 
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your admin password"
                  required
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200 ${
                    darkMode 
                      ? 'text-dark-muted hover:text-yellow-primary' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'bg-red-900/30 border-red-500/50 text-red-400' 
                  : 'bg-red-50 border-red-200 text-red-600'
              }`}>
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                darkMode
                  ? 'bg-gradient-to-r from-yellow-primary to-yellow-secondary text-black shadow-yellow-glow hover:shadow-yellow-glow-lg hover:from-yellow-hover hover:to-yellow-primary focus:ring-yellow-primary focus:ring-offset-dark-card'
                  : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-white'
              }`}
            >
              {loading ? (
                <>
                  <div className={`animate-spin rounded-full h-5 w-5 border-2 ${
                    darkMode 
                      ? 'border-black border-t-transparent' 
                      : 'border-white border-t-transparent'
                  }`} />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  <span>Access Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={`mt-6 pt-6 border-t text-center ${
            darkMode ? 'border-dark-primary' : 'border-gray-200'
          }`}>
            <p className={`text-sm ${
              darkMode ? 'text-dark-muted' : 'text-gray-600'
            }`}>
              🔒 Authorized access only
            </p>
            <p className={`text-xs mt-2 ${
              darkMode ? 'text-dark-muted' : 'text-gray-500'
            }`}>
              Contact administrator if you need access to AryaPathshala
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className={`inline-flex items-center space-x-2 font-medium transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'text-yellow-primary hover:text-yellow-hover' 
                : 'text-blue-500 hover:text-blue-600'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;