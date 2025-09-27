import React, { useState, useContext } from 'react';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = ({ onLogin }) => {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData);
      if (success) {
        onLogin && onLogin();
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Pattern - Dark Theme */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`} />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-tertiary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
        </div>
      </div>

      {/* Login Card - Dark Theme */}
      <div className={`
        relative z-10 w-full max-w-md p-8 rounded-2xl shadow-dark-elevation-lg backdrop-blur-lg border
        ${theme === 'dark' 
          ? 'bg-dark-card/90 border-dark-primary shadow-yellow-glow' 
          : 'bg-white/80 border-gray-200'
        }
      `}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`
            w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300
            ${theme === 'dark' 
              ? 'bg-yellow-primary/20 shadow-yellow-glow' 
              : 'bg-blue-100'
            }
          `}>
            <Shield className={`w-8 h-8 ${
              theme === 'dark' ? 'text-yellow-primary' : 'text-blue-500'
            }`} />
          </div>
          
          <h1 className={`text-2xl font-bold mb-2 ${
            theme === 'dark' ? 'text-dark-primary' : 'text-gray-900'
          }`}>
            Admin Access
          </h1>
          
          <p className={`text-sm ${
            theme === 'dark' ? 'text-dark-muted' : 'text-gray-600'
          }`}>
            Aryapathshala Content Management
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`
            p-3 rounded-lg mb-4 flex items-center space-x-2 border transition-all duration-300
            ${theme === 'dark' 
              ? 'bg-red-900/30 border-red-500/50 text-red-400 shadow-lg' 
              : 'bg-red-50 border-red-200 text-red-600'
            }
          `}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-dark-secondary' : 'text-gray-700'
            }`}>
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`w-5 h-5 transition-colors ${
                  theme === 'dark' ? 'text-dark-muted' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-yellow-primary focus:border-yellow-primary
                  ${theme === 'dark' 
                    ? 'bg-dark-tertiary/70 border-dark-primary text-dark-primary placeholder-dark-muted hover:border-yellow-primary/50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                `}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-dark-secondary' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`w-5 h-5 transition-colors ${
                  theme === 'dark' ? 'text-dark-muted' : 'text-gray-400'
                }`} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`
                  w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-yellow-primary focus:border-yellow-primary
                  ${theme === 'dark' 
                    ? 'bg-dark-tertiary/70 border-dark-primary text-dark-primary placeholder-dark-muted hover:border-yellow-primary/50' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                `}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-dark-muted hover:text-yellow-primary' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 focus:ring-2 focus:ring-yellow-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-yellow-primary to-yellow-secondary text-black shadow-yellow-glow hover:shadow-yellow-glow-lg hover:from-yellow-hover hover:to-yellow-primary focus:ring-offset-dark-card'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
              }
            `}
          >
            {isLoading ? (
              <>
                <div className={`animate-spin rounded-full h-5 w-5 border-2 ${
                  theme === 'dark' 
                    ? 'border-black border-t-transparent' 
                    : 'border-white border-t-transparent'
                }`} />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Access Admin Panel</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className={`text-xs ${
            theme === 'dark' ? 'text-dark-muted' : 'text-gray-400'
          }`}>
            Secure access to Aryapathshala content management system
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;