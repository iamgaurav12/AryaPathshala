import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { createStudent } from '../../firebase/collections';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    class: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useStudentAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords don't match");
    }

    try {
      setError('');
      setLoading(true);
      
      const additionalData = {
        name: formData.name,
        class: formData.class,
        savedContent: [],
        progress: {}
      };

      const result = await signup(formData.email, formData.password, additionalData);
      // Create student document in the students collection
      await createStudent(result.uid, {
        name: formData.name,
        email: formData.email,
        class: formData.class
      });
      navigate('/dashboard'); // Navigate to student dashboard after signup
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
            Join AryaPathshala
          </h2>
          <p className="mt-2 text-center text-sm text-blue-300/80">
            Create your account to start learning
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3 rounded-lg relative shadow-[0_0_10px_rgba(220,38,38,0.2)]" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 text-blue-100 placeholder-blue-300/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-[inset_0_1px_2px_rgba(49,120,198,0.15)] hover:shadow-[inset_0_1px_2px_rgba(49,120,198,0.25)] backdrop-blur-xl transition-all duration-200 text-sm"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 text-blue-100 placeholder-blue-300/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-[inset_0_1px_2px_rgba(49,120,198,0.15)] hover:shadow-[inset_0_1px_2px_rgba(49,120,198,0.25)] backdrop-blur-xl transition-all duration-200 text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="class" className="sr-only">Class</label>
              <select
                id="class"
                name="class"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 text-blue-100 placeholder-blue-300/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-[inset_0_1px_2px_rgba(49,120,198,0.15)] hover:shadow-[inset_0_1px_2px_rgba(49,120,198,0.25)] backdrop-blur-xl transition-all duration-200 text-sm"
                value={formData.class}
                onChange={handleChange}
              >
                <option value="" className="bg-gray-900 text-blue-100">Select Class</option>
                <option value="9" className="bg-gray-900 text-blue-100">Class 9</option>
                <option value="10" className="bg-gray-900 text-blue-100">Class 10</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 text-blue-100 placeholder-blue-300/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-[inset_0_1px_2px_rgba(49,120,198,0.15)] hover:shadow-[inset_0_1px_2px_rgba(49,120,198,0.25)] backdrop-blur-xl transition-all duration-200 text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-4 py-3 bg-gray-900/50 text-blue-100 placeholder-blue-300/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 shadow-[inset_0_1px_2px_rgba(49,120,198,0.15)] hover:shadow-[inset_0_1px_2px_rgba(49,120,198,0.25)] backdrop-blur-xl transition-all duration-200 text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-blue-100 bg-gradient-to-r from-blue-600/80 to-blue-800/80 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/70 shadow-[0_0_15px_rgba(49,120,198,0.3)] hover:shadow-[0_0_20px_rgba(49,120,198,0.4)] backdrop-blur-xl transition-all duration-200 disabled:opacity-50 mt-6"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;