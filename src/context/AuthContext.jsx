import React, { createContext, useState, useEffect } from 'react';
import { hashPassword } from '../utils/crypto';

// Create the context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin credentials from environment variables
  const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH;

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
          if (
            authenticated &&
            currentTime - authTime < 24 * 60 * 60 * 1000
          ) {
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
  const login = async ({ username, password }) => {
    const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'gaurav';

    try {
      const passwordHash = await hashPassword(password);
      if (username === ADMIN_USERNAME && passwordHash === ADMIN_PASSWORD_HASH) {
        const authData = {
          authenticated: true,
          username,
          timestamp: new Date().toISOString(),
        };

        localStorage.setItem('admin_auth', JSON.stringify(authData));
        setIsAuthenticated(true);
        setUser({ role: 'admin', username, loginTime: authData.timestamp });
        return true;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    return false;
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear local storage first
      localStorage.removeItem('admin_auth');
      
      // Clear the state
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);

      // Return success
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context for direct use if needed
export { AuthContext };
export default AuthContext;

