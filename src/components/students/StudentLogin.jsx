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
      navigate('/dashboard'); 
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
    } catch (err) {
      console.error('Password reset error occurred:', err);
      let errorMessage = 'Failed to send reset email: ';
      
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
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-color-dodge filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute -right-4 -top-4 w-72 h-72 bg-yellow-600 rounded-full mix-blend-color-dodge filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-color-dodge filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      <div 
        className="relative max-w-md w-full rounded-2xl p-8 space-y-8 bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#1a1a1a] shadow-[0_0_15px_rgba(255,255,0,0.2)] hover:shadow-[0_0_20px_rgba(255,255,0,0.3)] transition-all duration-300"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-yellow-200/80">
            Sign in to continue your learning journey
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3 rounded-lg relative shadow-[0_0_10px_rgba(255,0,0,0.2)]" role="alert">
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
                className="appearance-none relative block w-full px-4 py-3 bg-black/70 text-white placeholder-gray-500 rounded-lg border border-[#333333] focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 shadow-[inset_0_1px_2px_rgba(255,255,0,0.1)] hover:shadow-[inset_0_1px_2px_rgba(255,255,0,0.2)] backdrop-blur-sm transition-all duration-200 text-sm hover:border-[#444444]"
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
                className="appearance-none relative block w-full px-4 py-3 bg-black/70 text-white placeholder-gray-500 rounded-lg border border-[#333333] focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 shadow-[inset_0_1px_2px_rgba(255,255,0,0.1)] hover:shadow-[inset_0_1px_2px_rgba(255,255,0,0.2)] backdrop-blur-sm transition-all duration-200 text-sm hover:border-[#444444]"
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
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-black bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500/70 shadow-[0_0_15px_rgba(255,255,0,0.3)] hover:shadow-[0_0_20px_rgba(255,255,0,0.4)] backdrop-blur-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

          <div className="mt-6 text-center space-y-4">
            <p className="text-gray-400">
              <button 
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-200 underline decoration-yellow-400/30 hover:decoration-yellow-300/50"
              >
                Forgot Password?
              </button>
            </p>
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/student/signup" 
                className="font-medium text-yellow-400 hover:text-yellow-300 transition-colors duration-200 underline decoration-yellow-400/30 hover:decoration-yellow-300/50"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>

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
          <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel 
              className="mx-auto max-w-sm rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#1a1a1a] p-6 shadow-[0_0_15px_rgba(255,255,0,0.2)]"
            >
              <Dialog.Title className="text-xl font-semibold text-white mb-4">
                Password Reset Link Sent
              </Dialog.Title>

              {resetSuccess ? (
                <div className="space-y-4">
                  <p className="text-green-400">
                    A password reset link has been successfully sent to '{resetEmail}'. Please check your inbox for instructions.
                  </p>
                  <p className="text-yellow-300 text-sm">
                    If the email does not appear shortly, please 'verify your spam or junk mail folder'.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetModalOpen(false);
                      setResetEmail('');
                      setResetSuccess(false);
                    }}
                    className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg transition-colors duration-200 font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  {resetError && (
                    <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3 rounded-lg relative shadow-[0_0_10px_rgba(255,0,0,0.2)]">
                      {resetError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email address
                    </label>
                    <input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-black/70 text-white placeholder-gray-500 rounded-lg border border-[#333333] focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 hover:border-[#444444] transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsResetModalOpen(false)}
                      className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 border border-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2 px-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg transition-colors duration-200 disabled:opacity-50 font-medium"
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