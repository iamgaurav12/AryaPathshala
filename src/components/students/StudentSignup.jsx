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
    // 1. MAIN BACKGROUND: Set to pure black #000000
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Animated background effects (subtle yellow on black) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-color-dodge filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute -right-4 -top-4 w-72 h-72 bg-yellow-600 rounded-full mix-blend-color-dodge filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-color-dodge filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      {/* Signup Card */}
      <div 
        // 2. CARD BACKGROUND: Set to a very dark grey/near black for contrast with the pure black background
        // 3. BORDER/SHADOW: Border set to very dark grey, shadow uses yellow accent
        className="relative max-w-md w-full rounded-2xl p-8 space-y-8 bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#1a1a1a] shadow-[0_0_15px_rgba(255,255,0,0.2)] hover:shadow-[0_0_20px_rgba(255,255,0,0.3)] transition-all duration-300"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
            Join Arya Pathshala
          </h2>
          <p className="mt-2 text-center text-sm text-yellow-200/80">
            Create your account to start learning
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-3 rounded-lg relative shadow-[0_0_10px_rgba(255,0,0,0.2)]" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                // 4. INPUT FIELDS: Set to pure black/very dark grey for background, yellow focus ring
                className="appearance-none relative block w-full px-4 py-3 bg-black/70 text-white placeholder-gray-500 rounded-lg border border-[#333333] focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 shadow-[inset_0_1px_2px_rgba(255,255,0,0.1)] hover:shadow-[inset_0_1px_2px_rgba(255,255,0,0.2)] backdrop-blur-sm transition-all duration-200 text-sm hover:border-[#444444]"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                // 4. INPUT FIELDS: Dark background, yellow focus ring
                className="appearance-none relative block w-full px-4 py-3 bg-black/70 text-white placeholder-gray-500 rounded-lg border border-[#333333] focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 shadow-[inset_0_1px_2px_rgba(255,255,0,0.1)] hover:shadow-[inset_0_1px_2px_rgba(255,255,0,0.2)] backdrop-blur-sm transition-all duration-200 text-sm hover:border-[#444444]"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {/* Class Select */}
            <div>
              <label htmlFor="class" className="sr-only">Class</label>
              <select
                id="class"
                name="class"
                required
                // 4. INPUT FIELDS: Dark background, yellow focus ring
                className="appearance-none relative block w-full px-4 py-3 bg-black/70 text-white rounded-lg border border-[#333333] focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 shadow-[inset_0_1px_2px_rgba(255,255,0,0.1)] hover:shadow-[inset_0_1px_2px_rgba(255,255,0,0.2)] backdrop-blur-sm transition-all duration-200 text-sm hover:border-[#444444]"
                value={formData.class}
                onChange={handleChange}
              >
                {/* 5. SELECT OPTIONS: Ensure options are readable on a black background */}
                <option value="" className="bg-black text-gray-400">Select Class</option>
                <option value="9" className="bg-black text-white">Class 9</option>
                <option value="10" className="bg-black text-white">Class 10</option>
              </select>
            </div>
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                // 4. INPUT FIELDS: Dark background, yellow focus ring
                className="appearance-none relative block w-full px-4 py-3 bg-black/70 text-white placeholder-gray-500 rounded-lg border border-[#333333] focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 shadow-[inset_0_1px_2px_rgba(255,255,0,0.1)] hover:shadow-[inset_0_1px_2px_rgba(255,255,0,0.2)] backdrop-blur-sm transition-all duration-200 text-sm hover:border-[#444444]"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                // 4. INPUT FIELDS: Dark background, yellow focus ring
                className="appearance-none relative block w-full px-4 py-3 bg-black/70 text-white placeholder-gray-500 rounded-lg border border-[#333333] focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 shadow-[inset_0_1px_2px_rgba(255,255,0,0.1)] hover:shadow-[inset_0_1px_2px_rgba(255,255,0,0.2)] backdrop-blur-sm transition-all duration-200 text-sm hover:border-[#444444]"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              // 6. BUTTON: Yellow background/gradient for primary CTA, black text
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-black bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500/70 shadow-[0_0_15px_rgba(255,255,0,0.3)] hover:shadow-[0_0_20px_rgba(255,255,0,0.4)] backdrop-blur-xl transition-all duration-200 disabled:opacity-50 mt-6"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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