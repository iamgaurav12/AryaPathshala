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
      // Simple password validation - you can make this more secure
      if (formData.username === 'gaurav' && formData.password === 'aryapathshala123') {
        await login(formData);
        onLogin && onLogin();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`} />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
        </div>
      </div>

      {/* Login Card */}
      <div className={`
        relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg border
        ${theme === 'dark' 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
        }
      `}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`
            w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
            ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}
          `}>
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          
          <h1 className={`text-2xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Admin Access
          </h1>
          
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Aryapathshala Content Management
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`
            p-3 rounded-lg mb-4 flex items-center space-x-2 border
            ${theme === 'dark' 
              ? 'bg-red-900/20 border-red-500/50 text-red-400' 
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
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`
                  w-full pl-10 pr-4 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400' 
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
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`
                  w-full pl-10 pr-12 py-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }
                `}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
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
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-all hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
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

        {/* Demo Credentials */}
        <div className={`
          mt-6 p-4 rounded-lg border-2 border-dashed
          ${theme === 'dark' 
            ? 'border-gray-600 bg-gray-800/30' 
            : 'border-gray-300 bg-gray-50'
          }
        `}>
          <p className={`text-xs font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Demo Credentials:
          </p>
          <div className={`text-xs space-y-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p><strong>Username:</strong> gaurav</p>
            <p><strong>Password:</strong> aryapathshala123</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className={`text-xs ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Secure access to Aryapathshala content management system
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;