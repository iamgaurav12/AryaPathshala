// src/components/common/Loading.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-16 h-16 border-4'
  };
  
  const sizeClass = sizes[size] || sizes.md;
  
  return (
    <div className="relative inline-block">
      <div className={`${sizeClass} border-zinc-800 dark:border-zinc-800 rounded-full animate-spin`}></div>
      <div className={`${sizeClass} border-yellow-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
    </div>
  );
};

// Full-page loading component
const Loading = ({ message = "Loading..." }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-zinc-800 dark:border-zinc-800 rounded-full animate-spin mx-auto"></div>
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        </div>
        
        {/* Loading text */}
        <p className={`mt-4 text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {message}
        </p>
        
        {/* Loading dots animation */}
        <div className="flex justify-center mt-2 space-x-1">
          <div className={`w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-yellow-500' : 'bg-gray-600'}`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-yellow-500' : 'bg-gray-600'}`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-yellow-500' : 'bg-gray-600'}`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export { LoadingSpinner };
export default Loading;