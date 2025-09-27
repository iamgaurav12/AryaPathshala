import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-16 h-16 border-4'
  };
  const sizeClass = sizes[size] || sizes.md;
  
  return (
    <div className="relative inline-block">
      <div className={`${sizeClass} border-gray-800 rounded-full animate-spin`}></div>
      <div className={`${sizeClass} border-yellow-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
    </div>
  );
};

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-800 rounded-full animate-spin mx-auto"></div>
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-300">{message}</p>
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-2 rounded-full animate-pulse bg-yellow-500" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-yellow-500" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-yellow-500" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export { LoadingSpinner };
export default Loading;
