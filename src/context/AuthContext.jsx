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
  const [loading, setLoading] = useState(true);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const authData = localStorage.getItem('aryapathshala_auth');
    if (authData) {
      try {
        const { password, timestamp } = JSON.parse(authData);
        // Check if authentication is still valid (24 hours)
        const isValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;
        if (isValid) {
          setIsAuthenticated(true);
          setCurrentPassword(password);
        } else {
          localStorage.removeItem('aryapathshala_auth');
        }
      } catch (error) {
        localStorage.removeItem('aryapathshala_auth');
      }
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    // Simple password validation - you can make this more secure
    const validPasswords = ['admin123', 'aryaadmin', 'pathshala2024'];
    
    if (validPasswords.includes(password)) {
      setIsAuthenticated(true);
      setCurrentPassword(password);
      
      // Store authentication in localStorage
      localStorage.setItem('aryapathshala_auth', JSON.stringify({
        password,
        timestamp: Date.now()
      }));
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPassword('');
    localStorage.removeItem('aryapathshala_auth');
  };

  const value = {
    isAuthenticated,
    currentPassword,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};