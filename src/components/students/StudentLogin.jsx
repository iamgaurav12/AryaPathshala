import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { Dialog } from '@headlessui/react';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');
  
  const { login, resetPassword } = useStudentAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard'); // Navigate to student dashboard after login
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setResetError('');
      setLoading(true);
      console.log('Starting password reset process for:', resetEmail);
      await resetPassword(resetEmail);
      console.log('Password reset email sent successfully');
      setResetSuccess(true);
      // Keep the modal open to show success message
    } catch (err) {
      console.error('Password reset error occurred:', err);
      let errorMessage = 'Failed to send reset email: ';
      
      // Provide more user-friendly error messages
      switch(err.code) {
        case 'auth/user-not-found':
          errorMessage += 'No account exists with this email address.';
          break;
        case 'auth/invalid-email':
          errorMessage += 'Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage += 'Too many attempts. Please try again later.';
          break;
        default:
          errorMessage += err.message;
      }
      
      setResetError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-color-dodge filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -right-4 -top-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-color-dodge filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-color-dodge filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-md w-full rounded-2xl p-8 space-y-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700 shadow-[0_0_15px_rgba(49,120,198,0.2)] hover:shadow-[0_0_20px_rgba(49,120,198,0.3)] transition-all duration-300">
        <div>
          <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-blue-300/80">
            Sign in to continue your learning journey
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3 rounded-lg relative shadow-[0_0_10px_rgba(220,38,38,0.2)]" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 text-blue-100 placeholder-blue-300/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-[inset_0_1px_2px_rgba(49,120,198,0.15)] hover:shadow-[inset_0_1px_2px_rgba(49,120,198,0.25)] backdrop-blur-xl transition-all duration-200 text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 text-blue-100 placeholder-blue-300/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-[inset_0_1px_2px_rgba(49,120,198,0.15)] hover:shadow-[inset_0_1px_2px_rgba(49,120,198,0.25)] backdrop-blur-xl transition-all duration-200 text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-blue-100 bg-gradient-to-r from-blue-600/80 to-blue-800/80 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/70 shadow-[0_0_15px_rgba(49,120,198,0.3)] hover:shadow-[0_0_20px_rgba(49,120,198,0.4)] backdrop-blur-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Links */}
          <div className="mt-6 text-center space-y-4">
            <p className="text-blue-300/70">
              <button 
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text hover:from-blue-300 hover:to-cyan-300"
              >
                Forgot Password?
              </button>
            </p>
            <p className="text-blue-300/70">
              Don't have an account?{' '}
              <Link 
                to="/student/signup" 
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text hover:from-blue-300 hover:to-cyan-300"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>

        {/* Reset Password Modal */}
        <Dialog
          open={isResetModalOpen}
          onClose={() => {
            setIsResetModalOpen(false);
            setResetEmail('');
            setResetError('');
            setResetSuccess(false);
          }}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-sm rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700 p-6 shadow-[0_0_15px_rgba(49,120,198,0.2)]">
              <Dialog.Title className="text-xl font-semibold text-blue-100 mb-4">
                Reset Password
              </Dialog.Title>

              {resetSuccess ? (
                <div className="space-y-4">
                  <p className="text-green-400">
                    Password reset email sent! Check your inbox for further instructions.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetModalOpen(false);
                      setResetEmail('');
                      setResetSuccess(false);
                    }}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  {resetError && (
                    <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3 rounded-lg relative shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                      {resetError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-blue-300 mb-1">
                      Email address
                    </label>
                    <input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-gray-900/50 text-blue-100 placeholder-blue-300/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsResetModalOpen(false)}
                      className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentLogin;