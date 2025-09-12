import { useContext, useCallback, useMemo } from 'react';
import ThemeContext from '../context/ThemeContext';
import useLocalStorage from './useLocalStorage';

/**
 * Custom hook for theme management
 * Provides theme utilities, styles, and animations
 * Can be used independently or with ThemeContext
 */
const useTheme = () => {
  // Try to get theme from context first
  const contextTheme = useContext(ThemeContext);
  
  // Fallback to localStorage-based theme management if no context
  const [localTheme, setLocalTheme] = useLocalStorage('aryapathshala_theme', 'light');
  const [systemPreference] = useLocalStorage('aryapathshala_system_preference', 
    typeof window !== 'undefined' ? 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
      'light'
  );

  // If context is available, use it; otherwise use local state
  const isDarkMode = contextTheme?.isDarkMode ?? (localTheme === 'dark');
  const isLoading = contextTheme?.isLoading ?? false;

  // Theme toggle function
  const toggleTheme = useCallback(() => {
    if (contextTheme?.toggleTheme) {
      contextTheme.toggleTheme();
    } else {
      const newTheme = localTheme === 'dark' ? 'light' : 'dark';
      setLocalTheme(newTheme);
      
      // Apply theme to document
      if (typeof window !== 'undefined') {
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
          document.body.style.backgroundColor = '#111827';
        } else {
          document.documentElement.classList.remove('dark');
          document.body.style.backgroundColor = '#f9fafb';
        }
      }
    }
  }, [contextTheme, localTheme, setLocalTheme]);

  // Set specific theme
  const setTheme = useCallback((theme) => {
    if (contextTheme?.setTheme) {
      contextTheme.setTheme(theme);
    } else {
      setLocalTheme(theme);
      
      // Apply theme to document
      if (typeof window !== 'undefined') {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.body.style.backgroundColor = '#111827';
        } else {
          document.documentElement.classList.remove('dark');
          document.body.style.backgroundColor = '#f9fafb';
        }
      }
    }
  }, [contextTheme, setLocalTheme]);

  // Get current theme name
  const getCurrentTheme = useCallback(() => {
    return isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  // Use system theme
  const useSystemTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }
  }, [setTheme]);

  // Theme-aware class generator
  const getThemeClasses = useCallback((lightClasses, darkClasses) => {
    return isDarkMode ? darkClasses : lightClasses;
  }, [isDarkMode]);

  // Comprehensive theme styles object
  const themeStyles = useMemo(() => ({
    // Background styles
    background: {
      primary: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
      secondary: isDarkMode ? 'bg-gray-800' : 'bg-white',
      tertiary: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
      quaternary: isDarkMode ? 'bg-gray-600' : 'bg-gray-200',
      elevated: isDarkMode ? 'bg-gray-800 shadow-2xl' : 'bg-white shadow-lg',
      overlay: isDarkMode ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50',
      gradient: {
        primary: 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600',
        secondary: 'bg-gradient-to-r from-green-500 to-teal-600',
        warm: 'bg-gradient-to-r from-orange-500 to-red-600',
        cool: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        sunset: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
        ocean: 'bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500'
      }
    },
    
    // Text styles
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      tertiary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      muted: isDarkMode ? 'text-gray-500' : 'text-gray-400',
      inverse: isDarkMode ? 'text-gray-900' : 'text-white',
      accent: 'text-blue-600 dark:text-blue-400',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-red-600 dark:text-red-400',
      info: 'text-cyan-600 dark:text-cyan-400'
    },
    
    // Border styles
    border: {
      primary: isDarkMode ? 'border-gray-700' : 'border-gray-200',
      secondary: isDarkMode ? 'border-gray-600' : 'border-gray-300',
      light: isDarkMode ? 'border-gray-800' : 'border-gray-100',
      accent: 'border-blue-500',
      success: 'border-green-500',
      warning: 'border-yellow-500',
      error: 'border-red-500'
    },
    
    // Button styles
    button: {
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500',
      secondary: isDarkMode 
        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500' 
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 focus:ring-gray-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
      ghost: isDarkMode 
        ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300 focus:ring-gray-500' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
      outline: isDarkMode
        ? 'border border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500'
        : 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
    },
    
    // Card styles
    card: {
      primary: isDarkMode 
        ? 'bg-gray-800 border-gray-700 text-white' 
        : 'bg-white border-gray-200 text-gray-900',
      elevated: isDarkMode 
        ? 'bg-gray-800 shadow-2xl border-gray-700 text-white' 
        : 'bg-white shadow-lg border-gray-200 text-gray-900',
      interactive: isDarkMode 
        ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:shadow-2xl transition-all duration-300' 
        : 'bg-white border-gray-200 hover:shadow-xl hover:bg-gray-50 transition-all duration-300',
      gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700'
    },
    
    // Input styles
    input: {
      primary: isDarkMode 
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
      error: isDarkMode
        ? 'bg-gray-700 border-red-500 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500'
        : 'bg-white border-red-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500',
      success: isDarkMode
        ? 'bg-gray-700 border-green-500 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500'
        : 'bg-white border-green-300 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-green-500'
    },
    
    // Navigation styles
    navigation: {
      primary: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      link: isDarkMode 
        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
      active: isDarkMode
        ? 'text-white bg-gray-700 border-blue-500'
        : 'text-gray-900 bg-gray-100 border-blue-500'
    },
    
    // Alert/notification styles
    alert: {
      success: isDarkMode
        ? 'bg-green-900 border-green-700 text-green-200'
        : 'bg-green-50 border-green-300 text-green-800',
      warning: isDarkMode
        ? 'bg-yellow-900 border-yellow-700 text-yellow-200'
        : 'bg-yellow-50 border-yellow-300 text-yellow-800',
      error: isDarkMode
        ? 'bg-red-900 border-red-700 text-red-200'
        : 'bg-red-50 border-red-300 text-red-800',
      info: isDarkMode
        ? 'bg-cyan-900 border-cyan-700 text-cyan-200'
        : 'bg-cyan-50 border-cyan-300 text-cyan-800'
    }
  }), [isDarkMode]);

  // Animation classes
  const animations = useMemo(() => ({
    fadeIn: 'animate-fade-in opacity-0',
    slideUp: 'animate-slide-up transform translate-y-4 opacity-0',
    slideDown: 'animate-slide-down transform -translate-y-4 opacity-0',
    slideLeft: 'animate-slide-left transform translate-x-4 opacity-0',
    slideRight: 'animate-slide-right transform -translate-x-4 opacity-0',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    ping: 'animate-ping',
    glow: isDarkMode ? 'animate-glow-dark' : 'animate-glow',
    float: 'animate-float',
    wiggle: 'animate-wiggle',
    scale: 'transform hover:scale-105 transition-transform duration-200',
    rotate: 'transform hover:rotate-3 transition-transform duration-200'
  }), [isDarkMode]);

  // CSS variables for dynamic theming
  const cssVariables = useMemo(() => ({
    '--color-primary': isDarkMode ? '#3b82f6' : '#2563eb',
    '--color-primary-dark': isDarkMode ? '#1e40af' : '#1d4ed8',
    '--color-background': isDarkMode ? '#111827' : '#f9fafb',
    '--color-surface': isDarkMode ? '#1f2937' : '#ffffff',
    '--color-text': isDarkMode ? '#ffffff' : '#111827',
    '--color-text-secondary': isDarkMode ? '#d1d5db' : '#374151',
    '--color-border': isDarkMode ? '#374151' : '#e5e7eb',
    '--shadow-color': isDarkMode ? '0, 0, 0' : '0, 0, 0',
    '--shadow-opacity': isDarkMode ? '0.3' : '0.1'
  }), [isDarkMode]);

  // Apply CSS variables to document
  const applyCssVariables = useCallback(() => {
    if (typeof window !== 'undefined') {
      Object.entries(cssVariables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }, [cssVariables]);

  // Theme transition helper
  const withThemeTransition = useCallback((className) => {
    return `${className} transition-colors duration-300`;
  }, []);

  // Color scheme generator
  const getColorScheme = useCallback((baseColor = 'blue') => {
    const colors = {
      blue: {
        50: isDarkMode ? '#1e3a8a' : '#eff6ff',
        100: isDarkMode ? '#1e40af' : '#dbeafe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        900: isDarkMode ? '#dbeafe' : '#1e3a8a'
      },
      purple: {
        50: isDarkMode ? '#581c87' : '#faf5ff',
        100: isDarkMode ? '#6b21a8' : '#f3e8ff',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        900: isDarkMode ? '#f3e8ff' : '#581c87'
      },
      green: {
        50: isDarkMode ? '#14532d' : '#f0fdf4',
        100: isDarkMode ? '#166534' : '#dcfce7',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        900: isDarkMode ? '#dcfce7' : '#14532d'
      }
    };
    
    return colors[baseColor] || colors.blue;
  }, [isDarkMode]);

  // Media query helpers
  const mediaQueries = useMemo(() => ({
    prefersDark: typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null,
    prefersLight: typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: light)') : null,
    prefersReducedMotion: typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null,
    isMobile: typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)') : null,
    isTablet: typeof window !== 'undefined' ? window.matchMedia('(max-width: 1024px)') : null
  }), []);

  return {
    // Theme state
    isDarkMode,
    isLoading,
    themeName: getCurrentTheme(),
    isSystemTheme: !contextTheme && localTheme === systemPreference,
    
    // Theme actions
    toggleTheme,
    setTheme,
    getCurrentTheme,
    useSystemTheme,
    
    // Styling utilities
    getThemeClasses,
    themeStyles,
    animations,
    cssVariables,
    applyCssVariables,
    withThemeTransition,
    getColorScheme,
    
    // Media queries
    mediaQueries,
    
    // Context availability
    hasContext: !!contextTheme,
    
    // Utility functions
    isDark: isDarkMode,
    isLight: !isDarkMode
  };
};

// Export both default and named export to support both import patterns
export default useTheme;
export { useTheme };