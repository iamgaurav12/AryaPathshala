import React from 'react';

const Loading = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  type = 'spinner'
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  // Spinner Loading Animation
  const SpinnerLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 dark:border-gray-700`}></div>
        <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin absolute top-0 left-0`}></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400 font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  // Dots Loading Animation
  const DotsLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  // Books Loading Animation (Educational theme)
  const BooksLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="flex space-x-1">
          <div className="w-4 h-8 bg-gradient-to-t from-blue-400 to-blue-600 rounded-sm animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-4 h-10 bg-gradient-to-t from-purple-400 to-purple-600 rounded-sm animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-4 h-6 bg-gradient-to-t from-pink-400 to-pink-600 rounded-sm animate-pulse" style={{ animationDelay: '400ms' }}></div>
          <div className="w-4 h-9 bg-gradient-to-t from-green-400 to-green-600 rounded-sm animate-pulse" style={{ animationDelay: '600ms' }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute -top-1 -left-1">
          <div className="w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '500ms' }}></div>
        </div>
      </div>
      
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  // Pulse Wave Animation
  const PulseLoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-12 bg-gradient-to-t from-purple-500 to-purple-300 rounded-full animate-pulse" style={{ animationDelay: '100ms' }}></div>
        <div className="w-2 h-6 bg-gradient-to-t from-pink-500 to-pink-300 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
        <div className="w-2 h-10 bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        <div className="w-2 h-4 bg-gradient-to-t from-teal-500 to-teal-300 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
      </div>
      
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <DotsLoader />;
      case 'books':
        return <BooksLoader />;
      case 'pulse':
        return <PulseLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
          {renderLoader()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {renderLoader()}
    </div>
  );
};

// Loading Skeleton Component for content
export const LoadingSkeleton = ({ lines = 3, className = '' }) => (
  <div className={`animate-pulse space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} className="flex space-x-3">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

// Button Loading State
export const LoadingButton = ({ 
  children, 
  loading = false, 
  disabled = false, 
  className = '',
  ...props 
}) => (
  <button
    disabled={loading || disabled}
    className={`relative transition-all duration-300 ${className} ${
      loading || disabled ? 'opacity-70 cursor-not-allowed' : ''
    }`}
    {...props}
  >
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}
    <span className={loading ? 'invisible' : 'visible'}>
      {children}
    </span>
  </button>
);

export default Loading;