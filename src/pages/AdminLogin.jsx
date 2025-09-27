// src/pages/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthContext';
import { Lock, Eye, EyeOff, Shield, AlertCircle, ArrowLeft } from 'lucide-react';


const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  // const { darkMode } = useTheme(); // COMMENTED OUT: We are forcing dark mode

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
    // FORCED DARK MODE: Replaced conditional with the pure black class
    <div className={`min-h-screen flex items-center justify-center p-4 bg-black`}> 
      
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div 
          // Replaced conditional background gradient with dark colors
          className={`absolute inset-0 bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A1A]`} 
        />
        {/* Yellow glowing blobs - Always show, simplified opacity/class names */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-15" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#FFC700] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000 opacity-10" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#FFE87C] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000 opacity-10" />
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            // Icon container: Yellow accent on dark base
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all duration-300 bg-[#FFD700]/20 shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-pulse`}
          >
            {/* Icon color: Primary yellow */}
            <Shield className={`h-10 w-10 text-[#FFD700]`} /> 
          </div>
          
          <h1 
            // Title text color: White
            className={`text-3xl font-bold mb-3 text-white`}
          >
            Admin Access
          </h1>
          
          <p 
            // Subtitle text color: Muted grey
            className={`text-base text-gray-400`}
          >
            Enter your password to access the AryaPathshala admin panel
          </p>
        </div>

        {/* Login Form Card */}
        <div 
          // Card background: Very dark grey, subtle yellow shadow/border
          className={`rounded-2xl p-8 backdrop-blur-lg border transition-all duration-300 bg-[#0a0a0a]/90 shadow-[0_0_20px_rgba(255,215,0,0.2)] border-[#1a1a1a]`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div>
              <label 
                htmlFor="password"
                // Label color: Light grey
                className={`block text-sm font-medium mb-3 text-gray-300`}
              >
                Admin Password
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Lock icon color: Muted grey */}
                  <Lock className={`h-5 w-5 transition-colors text-gray-500`} />
                </div>
                
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // Input styles: Dark background, light text, yellow focus ring
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent ${
                    error 
                      ? 'border-red-500 bg-red-900/20 text-white focus:ring-red-500' // Error state
                      : 'border-[#333333] bg-black/70 text-white hover:border-[#444444] focus:ring-[#FFD700] focus:border-[#FFD700]' // Normal state
                  }`}
                  placeholder="Enter your admin password"
                  required
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  // Show/Hide button: Muted grey hover yellow
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200 text-gray-500 hover:text-[#FFD700]`}
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
              <div 
                // Error box: Dark red background, red text
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 bg-red-900/30 border-red-500/50 text-red-400`}
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password.trim()}
              // Button: Yellow gradient background, black text, yellow shadow
              className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-black shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] hover:from-[#FFE87C] hover:to-[#FFD700] focus:ring-[#FFD700] focus:ring-offset-[#0a0a0a]`}
            >
              {loading ? (
                <>
                  {/* Spinner: Black color to stand out on yellow */}
                  <div className={`animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent`} />
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
          <div 
            // Footer border: Dark grey
            className={`mt-6 pt-6 border-t border-[#1a1a1a] text-center`}
          >
            <p 
              // Footer text: Muted grey
              className={`text-sm text-gray-400`}
            >
              🔒 Authorized access only
            </p>
            <p 
              // Footer text: Muted grey
              className={`text-xs mt-2 text-gray-500`}
            >
              Contact administrator if you need access to AryaPathshala
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            // Back button: Yellow text, yellow hover
            className={`inline-flex items-center space-x-2 font-medium transition-all duration-300 hover:scale-105 text-[#FFD700] hover:text-[#FFE87C]`}
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