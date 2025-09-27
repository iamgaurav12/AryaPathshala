import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';

// --- Mock AuthContext ---
// This is a placeholder to simulate the missing AuthContext and resolve the import error.
const useAuth = () => {
  const login = async (formData) => {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate a successful login for demonstration purposes
    if (formData.username === 'admin' && formData.password === 'password') {
      return true;
    }
    return false;
  };

  return { login };
};

const LoginForm = ({ onLogin }) => {
  const { login } = useAuth(); // Using the mock hook
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg border bg-black/50 border-gray-800 shadow-yellow-500/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 bg-yellow-500/20 shadow-lg shadow-yellow-500/20">
            <Shield className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-white">Admin Access</h1>
          <p className="text-sm text-gray-400">Aryapathshala Content Management</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg mb-4 flex items-center space-x-2 border bg-red-900/30 border-red-500/50 text-red-400 shadow-lg">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-5 h-5 transition-colors text-gray-500" />
              </div>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 rounded-lg border bg-black/70 border-gray-700 text-white placeholder-gray-500 hover:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Enter your username" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 transition-colors text-gray-500" />
              </div>
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-10 pr-12 py-3 rounded-lg border bg-black/70 border-gray-700 text-white placeholder-gray-500 hover:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Enter your password" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200 text-gray-500 hover:text-yellow-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 focus:ring-offset-black">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
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

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">Secure access to Aryapathshala content management system</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

