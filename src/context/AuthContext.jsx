import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Admin credentials and settings
const ADMIN_CONFIG = {
  // Default password (can be changed later)
  defaultPassword: 'aryapathshala2024',
  
  // Session timeout (in minutes)
  sessionTimeout: 120, // 2 hours
  
  // Max login attempts
  maxLoginAttempts: 5,
  
  // Lockout time (in minutes)
  lockoutTime: 15,
  
  // Storage keys
  storageKeys: {
    session: 'aryapathshala_admin_session',
    attempts: 'aryapathshala_login_attempts',
    lockout: 'aryapathshala_lockout',
    settings: 'aryapathshala_admin_settings'
  }
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null); // Store current session password
  
  // Login attempts and lockout
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutEndTime, setLockoutEndTime] = useState(null);
  
  // Session management
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionWarningShown, setSessionWarningShown] = useState(false);

  // Initialize auth state on component mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Session timeout checker
  useEffect(() => {
    if (isAuthenticated && sessionStartTime) {
      const interval = setInterval(checkSessionTimeout, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, sessionStartTime]);

  // Lockout timer
  useEffect(() => {
    if (isLockedOut && lockoutEndTime) {
      const interval = setInterval(checkLockoutStatus, 1000); // Check every second
      return () => clearInterval(interval);
    }
  }, [isLockedOut, lockoutEndTime]);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check for existing session
      const savedSession = localStorage.getItem(ADMIN_CONFIG.storageKeys.session);
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        
        // Check if session is still valid
        const sessionAge = (Date.now() - new Date(sessionData.startTime).getTime()) / (1000 * 60);
        
        if (sessionAge < ADMIN_CONFIG.sessionTimeout) {
          // Session is still valid
          setIsAuthenticated(true);
          setUser(sessionData.user);
          setSessionStartTime(new Date(sessionData.startTime));
          setCurrentPassword(sessionData.password); // Restore password from session
        } else {
          // Session expired
          await logout();
        }
      }
      
      // Check lockout status
      const lockoutData = localStorage.getItem(ADMIN_CONFIG.storageKeys.lockout);
      if (lockoutData) {
        const lockout = JSON.parse(lockoutData);
        const lockoutEndTime = new Date(lockout.endTime);
        
        if (new Date() < lockoutEndTime) {
          setIsLockedOut(true);
          setLockoutEndTime(lockoutEndTime);
        } else {
          // Lockout expired, clear it
          localStorage.removeItem(ADMIN_CONFIG.storageKeys.lockout);
          localStorage.removeItem(ADMIN_CONFIG.storageKeys.attempts);
        }
      }
      
      // Load login attempts
      const attempts = localStorage.getItem(ADMIN_CONFIG.storageKeys.attempts);
      if (attempts) {
        setLoginAttempts(parseInt(attempts, 10));
      }
      
    } catch (error) {
      console.error('Error initializing auth:', error);
      setError('Failed to initialize authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const checkSessionTimeout = () => {
    if (!sessionStartTime) return;
    
    const sessionAge = (Date.now() - sessionStartTime.getTime()) / (1000 * 60);
    const warningTime = ADMIN_CONFIG.sessionTimeout - 10; // Show warning 10 minutes before timeout
    
    if (sessionAge >= ADMIN_CONFIG.sessionTimeout) {
      // Session expired
      logout();
      setError('Session expired. Please login again.');
    } else if (sessionAge >= warningTime && !sessionWarningShown) {
      // Show session warning
      setSessionWarningShown(true);
      if (window.confirm('Your session will expire in 10 minutes. Do you want to extend it?')) {
        extendSession();
      }
    }
  };

  const checkLockoutStatus = () => {
    if (!lockoutEndTime) return;
    
    if (new Date() >= lockoutEndTime) {
      // Lockout expired
      setIsLockedOut(false);
      setLockoutEndTime(null);
      setLoginAttempts(0);
      localStorage.removeItem(ADMIN_CONFIG.storageKeys.lockout);
      localStorage.removeItem(ADMIN_CONFIG.storageKeys.attempts);
    }
  };

  const login = async (password, rememberMe = false) => {
    try {
      setError(null);
      
      // Check if locked out
      if (isLockedOut) {
        const remainingTime = Math.ceil((lockoutEndTime - new Date()) / (1000 * 60));
        throw new Error(`Account locked. Try again in ${remainingTime} minutes.`);
      }
      
      // Get stored password or use default
      const storedSettings = localStorage.getItem(ADMIN_CONFIG.storageKeys.settings);
      const adminPassword = storedSettings 
        ? JSON.parse(storedSettings).password 
        : ADMIN_CONFIG.defaultPassword;
      
      // Validate password
      if (password !== adminPassword) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem(ADMIN_CONFIG.storageKeys.attempts, newAttempts.toString());
        
        // Check if should lockout
        if (newAttempts >= ADMIN_CONFIG.maxLoginAttempts) {
          const lockoutEnd = new Date(Date.now() + (ADMIN_CONFIG.lockoutTime * 60 * 1000));
          setIsLockedOut(true);
          setLockoutEndTime(lockoutEnd);
          
          localStorage.setItem(ADMIN_CONFIG.storageKeys.lockout, JSON.stringify({
            endTime: lockoutEnd.toISOString(),
            attempts: newAttempts
          }));
          
          throw new Error(`Too many failed attempts. Account locked for ${ADMIN_CONFIG.lockoutTime} minutes.`);
        }
        
        const remainingAttempts = ADMIN_CONFIG.maxLoginAttempts - newAttempts;
        throw new Error(`Invalid password. ${remainingAttempts} attempts remaining.`);
      }
      
      // Successful login
      const now = new Date();
      const userData = {
        id: 'admin',
        name: 'Administrator',
        email: 'admin@aryapathshala.com',
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'manage'],
        loginTime: now.toISOString()
      };
      
      const sessionData = {
        user: userData,
        password: password, // Store password in session for URL routing
        startTime: now.toISOString(),
        rememberMe: rememberMe,
        loginMethod: 'password'
      };
      
      // Save session
      localStorage.setItem(ADMIN_CONFIG.storageKeys.session, JSON.stringify(sessionData));
      
      // Clear login attempts
      setLoginAttempts(0);
      localStorage.removeItem(ADMIN_CONFIG.storageKeys.attempts);
      localStorage.removeItem(ADMIN_CONFIG.storageKeys.lockout);
      
      // Set auth state
      setIsAuthenticated(true);
      setUser(userData);
      setCurrentPassword(password);
      setSessionStartTime(now);
      setSessionWarningShown(false);
      
      // Navigate to admin panel with password in URL
      navigate(`/admin/${password}`);
      
      return { success: true, user: userData };
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = useCallback(async () => {
    try {
      // Clear all auth data
      localStorage.removeItem(ADMIN_CONFIG.storageKeys.session);
      
      // Reset state
      setIsAuthenticated(false);
      setUser(null);
      setCurrentPassword(null);
      setSessionStartTime(null);
      setSessionWarningShown(false);
      setError(null);
      
      // Navigate to login
      navigate('/gaurav');
      
      return { success: true };
      
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  }, [navigate]);

  const extendSession = useCallback(() => {
    try {
      if (!isAuthenticated || !user || !currentPassword) {
        throw new Error('No active session to extend');
      }
      
      const now = new Date();
      const sessionData = {
        user: user,
        password: currentPassword,
        startTime: now.toISOString(),
        rememberMe: false,
        loginMethod: 'extension'
      };
      
      localStorage.setItem(ADMIN_CONFIG.storageKeys.session, JSON.stringify(sessionData));
      setSessionStartTime(now);
      setSessionWarningShown(false);
      
      return { success: true };
      
    } catch (error) {
      console.error('Session extension error:', error);
      return { success: false, error: error.message };
    }
  }, [isAuthenticated, user, currentPassword]);

  const changePassword = useCallback(async (currentPasswordInput, newPassword) => {
    try {
      if (!isAuthenticated) {
        throw new Error('Must be logged in to change password');
      }
      
      // Validate current password
      const storedSettings = localStorage.getItem(ADMIN_CONFIG.storageKeys.settings);
      const currentStoredPassword = storedSettings 
        ? JSON.parse(storedSettings).password 
        : ADMIN_CONFIG.defaultPassword;
      
      if (currentPasswordInput !== currentStoredPassword) {
        throw new Error('Current password is incorrect');
      }
      
      // Validate new password
      if (newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }
      
      if (newPassword === currentPasswordInput) {
        throw new Error('New password must be different from current password');
      }
      
      // Save new password
      const settings = storedSettings ? JSON.parse(storedSettings) : {};
      settings.password = newPassword;
      settings.updatedAt = new Date().toISOString();
      
      localStorage.setItem(ADMIN_CONFIG.storageKeys.settings, JSON.stringify(settings));
      
      // Update current session
      if (currentPassword) {
        const sessionData = JSON.parse(localStorage.getItem(ADMIN_CONFIG.storageKeys.session) || '{}');
        sessionData.password = newPassword;
        localStorage.setItem(ADMIN_CONFIG.storageKeys.session, JSON.stringify(sessionData));
        setCurrentPassword(newPassword);
        
        // Redirect to new URL with new password
        navigate(`/admin/${newPassword}`);
      }
      
      return { success: true };
      
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: error.message };
    }
  }, [isAuthenticated, currentPassword, navigate]);

  const resetPassword = useCallback(() => {
    try {
      // This would typically send an email or require additional verification
      // For now, we'll just reset to default password
      const settings = {
        password: ADMIN_CONFIG.defaultPassword,
        resetAt: new Date().toISOString()
      };
      
      localStorage.setItem(ADMIN_CONFIG.storageKeys.settings, JSON.stringify(settings));
      
      // Clear all sessions and attempts
      localStorage.removeItem(ADMIN_CONFIG.storageKeys.session);
      localStorage.removeItem(ADMIN_CONFIG.storageKeys.attempts);
      localStorage.removeItem(ADMIN_CONFIG.storageKeys.lockout);
      
      // Reset state
      setIsAuthenticated(false);
      setUser(null);
      setCurrentPassword(null);
      setLoginAttempts(0);
      setIsLockedOut(false);
      setLockoutEndTime(null);
      
      return { success: true, defaultPassword: ADMIN_CONFIG.defaultPassword };
      
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const getSessionInfo = useCallback(() => {
    if (!isAuthenticated || !sessionStartTime) {
      return null;
    }
    
    const sessionAge = (Date.now() - sessionStartTime.getTime()) / (1000 * 60); // in minutes
    const remainingTime = ADMIN_CONFIG.sessionTimeout - sessionAge;
    
    return {
      startTime: sessionStartTime,
      sessionAge: Math.floor(sessionAge),
      remainingTime: Math.floor(remainingTime),
      isExpiringSoon: remainingTime <= 10,
      user: user,
      currentPassword: currentPassword
    };
  }, [isAuthenticated, sessionStartTime, user, currentPassword]);

  const checkPermission = useCallback((permission) => {
    if (!isAuthenticated || !user) {
      return false;
    }
    
    return user.permissions && user.permissions.includes(permission);
  }, [isAuthenticated, user]);

  const getLockoutInfo = useCallback(() => {
    if (!isLockedOut || !lockoutEndTime) {
      return null;
    }
    
    const remainingTime = Math.ceil((lockoutEndTime - new Date()) / (1000 * 60));
    
    return {
      isLockedOut: true,
      remainingTime: remainingTime,
      endTime: lockoutEndTime,
      attempts: loginAttempts
    };
  }, [isLockedOut, lockoutEndTime, loginAttempts]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Protected route helper - now checks both auth and password match
  const requireAuth = useCallback((requiredPassword = null, redirectTo = '/gaurav') => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return false;
    }
    
    // If a specific password is required for the route, validate it
    if (requiredPassword && currentPassword !== requiredPassword) {
      navigate('/gaurav');
      return false;
    }
    
    return true;
  }, [isAuthenticated, currentPassword, navigate]);

  // Activity logging
  const logActivity = useCallback((activity, details = {}) => {
    try {
      const activityLog = {
        timestamp: new Date().toISOString(),
        activity: activity,
        user: user?.id || 'unknown',
        details: details
      };
      
      // Store in localStorage (in a real app, this would be sent to a server)
      const existingLogs = JSON.parse(localStorage.getItem('aryapathshala_activity_log') || '[]');
      existingLogs.push(activityLog);
      
      // Keep only last 100 logs
      if (existingLogs.length > 100) {
        existingLogs.splice(0, existingLogs.length - 100);
      }
      
      localStorage.setItem('aryapathshala_activity_log', JSON.stringify(existingLogs));
      
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }, [user]);

  const getActivityLogs = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem('aryapathshala_activity_log') || '[]');
    } catch (error) {
      console.error('Error retrieving activity logs:', error);
      return [];
    }
  }, []);

  // Auto-logout on tab close/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isAuthenticated) {
        logActivity('session_ended', { reason: 'tab_closed' });
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isAuthenticated, logActivity]);

  const contextValue = {
    // Auth state
    isAuthenticated,
    isLoading,
    user,
    error,
    currentPassword,
    
    // Login state
    loginAttempts,
    isLockedOut,
    lockoutEndTime,
    
    // Auth actions
    login,
    logout,
    extendSession,
    changePassword,
    resetPassword,
    clearError,
    
    // Utilities
    getSessionInfo,
    checkPermission,
    getLockoutInfo,
    requireAuth,
    
    // Activity logging
    logActivity,
    getActivityLogs,
    
    // Config
    config: {
      sessionTimeout: ADMIN_CONFIG.sessionTimeout,
      maxLoginAttempts: ADMIN_CONFIG.maxLoginAttempts,
      lockoutTime: ADMIN_CONFIG.lockoutTime,
      defaultPassword: ADMIN_CONFIG.defaultPassword
    },
    
    // Session status
    sessionInfo: getSessionInfo(),
    lockoutInfo: getLockoutInfo()
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;