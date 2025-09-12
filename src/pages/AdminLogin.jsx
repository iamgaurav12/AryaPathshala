import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  AlertCircle, 
  ArrowLeft,
  User,
  Key,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { 
    login, 
    error, 
    isLoading: authLoading, 
    clearError,
    isAuthenticated,
    currentPassword,
    getLockoutInfo,
    config
  } = useAuth();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Get lockout information
  const lockoutInfo = getLockoutInfo();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && currentPassword) {
      navigate(`/admin/${currentPassword}`);
    }
  }, [isAuthenticated, currentPassword, navigate]);

  // Clear errors when component mounts or password changes
  useEffect(() => {
    return () => {
      if (error) clearError();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    try {
      const result = await login(password, rememberMe);
      
      if (result.success) {
        setShowSuccess(true);
        // Navigation is handled by the AuthContext
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) clearError();
  };

  // Format remaining lockout time
  const formatLockoutTime = (minutes) => {
    if (minutes <= 0) return '0 seconds';
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${minutes} minutes`;
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link 
            to="/" 
            className={`inline-flex items-center px-4 py-2 rounded-lg mb-6 ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-white/50 text-gray-600'} transition-colors duration-200`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-6 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <Shield className={`h-10 w-10 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Admin Access
          </h2>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Enter your password to access the content management panel
          </p>
        </div>

        {/* Lockout Warning */}
        {lockoutInfo && lockoutInfo.isLockedOut && (
          <div className={`${isDark ? 'bg-red-900/20 border-red-500/20' : 'bg-red-50 border-red-200'} border rounded-2xl p-4 mb-6`}>
            <div className="flex items-center">
              <XCircle className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <h3 className={`font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  Account Temporarily Locked
                </h3>
                <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-500'}`}>
                  Too many failed attempts. Try again in {formatLockoutTime(lockoutInfo.remainingTime)}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/70'} backdrop-blur-md rounded-2xl shadow-xl p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {showSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>
                Access Granted!
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Redirecting to admin panel...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Admin Info */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                <div className="flex items-center">
                  <User className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                  <div>
                    <div className={`font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      AryaPathshala Content Manager
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Manage chapters, notes, DPPs, and lecture links for Classes 9 & 10
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  <Key className="w-4 h-4 inline mr-2" />
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    disabled={lockoutInfo?.isLockedOut || isLoading}
                    className={`block w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      error 
                        ? 'border-red-500 focus:ring-red-500' 
                        : isDark 
                          ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
                    } pr-12 disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder="Enter your admin password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={lockoutInfo?.isLockedOut}
                    className={`absolute inset-y-0 right-0 flex items-center pr-4 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} disabled:opacity-50`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {error && (
                  <div className="flex items-center mt-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={lockoutInfo?.isLockedOut}
                  className={`h-4 w-4 rounded border-gray-300 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white'} text-blue-600 focus:ring-blue-500 disabled:opacity-50`}
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Keep me logged in for longer
                </label>
              </div>

              {/* Security Info */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700/30 border border-gray-600/30' : 'bg-gray-50 border border-gray-200'}`}>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-2`}>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Session timeout: {config.sessionTimeout} minutes
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Max attempts: {config.maxLoginAttempts}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                    Default password: {config.defaultPassword}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !password.trim() || lockoutInfo?.isLockedOut}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition-all duration-200 transform ${
                  isLoading || !password.trim() || lockoutInfo?.isLockedOut
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:scale-105 active:scale-95'
                }`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Lock className={`h-5 w-5 ${isLoading || !password.trim() || lockoutInfo?.isLockedOut ? 'text-gray-300' : 'text-blue-300 group-hover:text-blue-200'}`} />
                </span>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Verifying...
                  </div>
                ) : lockoutInfo?.isLockedOut ? (
                  `Locked - ${formatLockoutTime(lockoutInfo.remainingTime)} remaining`
                ) : (
                  'Access Admin Panel'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Security Notice */}
        <div className={`text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-4 h-4 mr-1" />
            Secure Admin Access
          </div>
          <p>
            This area is protected by session management, attempt limits, and automatic lockouts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;