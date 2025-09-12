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
  const [adminPassword, setAdminPassword] = useState('');
  
  // Default password - can be changed
  const correctPassword = 'aryaadmin123';

  useEffect(() => {
    // Check if user was previously authenticated
    const savedAuth = sessionStorage.getItem('adminAuth');
    const savedPassword = sessionStorage.getItem('adminPassword');
    
    if (savedAuth === 'true' && savedPassword) {
      setIsAuthenticated(true);
      setAdminPassword(savedPassword);
    }
  }, []);

  const login = (password) => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setAdminPassword(password);
      sessionStorage.setItem('adminAuth', 'true');
      sessionStorage.setItem('adminPassword', password);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminPassword('');
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminPassword');
  };

  const value = {
    isAuthenticated,
    adminPassword,
    login,
    logout,
    correctPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};