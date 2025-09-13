import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');

  // Check if user is authenticated on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('aryapathshala-auth');
    const savedPassword = localStorage.getItem('aryapathshala-password');
    
    if (savedAuth === 'true' && savedPassword) {
      setIsAuthenticated(true);
      setCurrentPassword(savedPassword);
    }
  }, []);

  const login = (password) => {
    if (password && password.trim() !== '') {
      setIsAuthenticated(true);
      setCurrentPassword(password);
      localStorage.setItem('aryapathshala-auth', 'true');
      localStorage.setItem('aryapathshala-password', password);
      return password; // Return password for navigation
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPassword('');
    localStorage.removeItem('aryapathshala-auth');
    localStorage.removeItem('aryapathshala-password');
    return true; // Return true to indicate successful logout
  };

  const isValidPassword = (password) => {
    return isAuthenticated && password === currentPassword;
  };

  const value = {
    isAuthenticated,
    currentPassword,
    login,
    logout,
    isValidPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};