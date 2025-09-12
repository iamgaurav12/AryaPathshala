import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use Theme Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('aryapathshala_theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Use system preference if no saved theme
        setIsDarkMode(prefersDark);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      setIsDarkMode(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
          document.body.style.backgroundColor = '#111827'; // gray-900
        } else {
          document.documentElement.classList.remove('dark');
          document.body.style.backgroundColor = '#f9fafb'; // gray-50
        }
        
        // Save theme preference to localStorage
        localStorage.setItem('aryapathshala_theme', isDarkMode ? 'dark' : 'light');
      } catch (error) {
        console.error('Error applying theme:', error);
      }
    }
  }, [isDarkMode, isLoading]);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Set specific theme
  const setTheme = (theme) => {
    setIsDarkMode(theme === 'dark');
  };

  // Get current theme name
  const getCurrentTheme = () => {
    return isDarkMode ? 'dark' : 'light';
  };

  // Theme-aware class generator
  const getThemeClasses = (lightClasses, darkClasses) => {
    return isDarkMode ? darkClasses : lightClasses;
  };

  // Common theme-based styles
  const themeStyles = {
    // Background styles
    background: {
      primary: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
      secondary: isDarkMode ? 'bg-gray-800' : 'bg-white',
      tertiary: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
    },
    
    // Text styles
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      tertiary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      muted: isDarkMode ? 'text-gray-500' : 'text-gray-400',
    },
    
    // Border styles
    border: {
      primary: isDarkMode ? 'border-gray-700' : 'border-gray-200',
      secondary: isDarkMode ? 'border-gray-600' : 'border-gray-300',
      light: isDarkMode ? 'border-gray-800' : 'border-gray-100',
    },
    
    // Button styles
    button: {
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
      secondary: isDarkMode 
        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
      danger: isDarkMode 
        ? 'bg-red-600 text-white hover:bg-red-700' 
        : 'bg-red-600 text-white hover:bg-red-700',
      ghost: isDarkMode 
        ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    },
    
    // Card styles
    card: {
      primary: isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200',
      elevated: isDarkMode 
        ? 'bg-gray-800 shadow-2xl border-gray-700' 
        : 'bg-white shadow-lg border-gray-200',
      hover: isDarkMode 
        ? 'hover:bg-gray-750 hover:shadow-2xl' 
        : 'hover:shadow-xl hover:bg-gray-50',
    },
    
    // Input styles
    input: {
      primary: isDarkMode 
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
      focus: 'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    },
    
    // Gradient styles
    gradient: {
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600',
      secondary: 'bg-gradient-to-r from-green-500 to-teal-600',
      accent: 'bg-gradient-to-r from-pink-500 to-rose-600',
      warm: 'bg-gradient-to-r from-orange-500 to-red-600',
    }
  };

  // Animation classes based on theme
  const animations = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    bounce: 'animate-bounce',
    pulse: isDarkMode ? 'animate-pulse-dark' : 'animate-pulse',
    glow: isDarkMode ? 'animate-glow-dark' : 'animate-glow',
  };

  const contextValue = {
    // State
    isDarkMode,
    isLoading,
    
    // Actions
    toggleTheme,
    setTheme,
    getCurrentTheme,
    
    // Utilities
    getThemeClasses,
    themeStyles,
    animations,
    
    // Theme metadata
    themeName: getCurrentTheme(),
    isSystemTheme: !localStorage.getItem('aryapathshala_theme'),
  };

  // Show loading spinner while theme is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;