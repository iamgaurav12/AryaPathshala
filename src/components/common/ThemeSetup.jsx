import { useEffect } from 'react';

const ThemeSetup = () => {
  useEffect(() => {
    // Force dark theme on mount
    document.documentElement.classList.add('dark');
    // Clean up any saved theme preferences
    localStorage.removeItem('theme');
  }, []);

  return null; // This component renders nothing
};

export default ThemeSetup;
