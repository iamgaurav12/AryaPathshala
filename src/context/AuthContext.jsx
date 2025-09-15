// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin password from environment variables
  const ADMIN_PASSWORD = import.meta.env.REACT_APP_ADMIN_PASSWORD || 'aryapathshala2024';

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('admin_auth');
      if (authData) {
        try {
          const { timestamp, authenticated } = JSON.parse(authData);
          const currentTime = new Date().getTime();
          const authTime = new Date(timestamp).getTime();
          
          // Check if authentication is still valid (24 hours)
          if (authenticated && (currentTime - authTime) < 24 * 60 * 60 * 1000) {
            setIsAuthenticated(true);
            setUser({ role: 'admin', loginTime: timestamp });
          } else {
            // Clear expired authentication
            localStorage.removeItem('admin_auth');
          }
        } catch (error) {
          console.error('Error parsing auth data:', error);
          localStorage.removeItem('admin_auth');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      const authData = {
        authenticated: true,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('admin_auth', JSON.stringify(authData));
      setIsAuthenticated(true);
      setUser({ role: 'admin', loginTime: authData.timestamp });
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Check if user is admin
  const isAdmin = () => {
    return isAuthenticated && user?.role === 'admin';
  };

  const contextValue = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    isAdmin,
    ADMIN_PASSWORD
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Export the context for direct use if needed
export { AuthContext };
export default AuthContext;