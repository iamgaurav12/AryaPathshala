// src/components/common/Loading.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const Loading = ({ message = "Loading..." }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin mx-auto"></div>
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        </div>
        
        {/* Loading text */}
        <p className={`mt-4 text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {message}
        </p>
        
        {/* Loading dots animation */}
        <div className="flex justify-center mt-2 space-x-1">
          <div className={`w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-gray-400' : 'bg-gray-600'}`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-gray-400' : 'bg-gray-600'}`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-gray-400' : 'bg-gray-600'}`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;