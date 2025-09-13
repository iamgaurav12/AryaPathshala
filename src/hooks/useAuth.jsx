import { useContext, useCallback, useMemo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useLocalStorage from './useLocalStorage';

/**
 * Custom hook for authentication management
 * Provides auth utilities, session management, and permission checking
 * Can be used independently or with AuthContext
 */
const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Try to get auth from context first
  const contextAuth = useContext(AuthContext);
  
  // Fallback to localStorage-based auth management if no context
  const [localSession, setLocalSession] = useLocalStorage('aryapathshala_admin_session', null);
  const [localAttempts, setLocalAttempts] = useLocalStorage('aryapathshala_login_attempts', 0);
  const [localLockout, setLocalLockout] = useLocalStorage('aryapathshala_lockout', null);
  
  // Local state for fallback auth
  const [localError, setLocalError] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);

  // Auth configuration
  const authConfig = useMemo(() => ({
    defaultPassword: 'aryapathshala2024',
    sessionTimeout: 120, // 2 hours in minutes
    maxLoginAttempts: 5,
    lockoutTime: 15, // 15 minutes
    sessionWarningTime: 10 // Show warning 10 minutes before expiry
  }), []);

  // Determine auth state (context or local)
  const isAuthenticated = contextAuth?.isAuthenticated ?? (localSession !== null);
  const user = contextAuth?.user ?? (localSession?.user || null);
  const isLoading = contextAuth?.isLoading ?? localLoading;
  const error = contextAuth?.error ?? localError;
  const loginAttempts = contextAuth?.loginAttempts ?? localAttempts;
  const isLockedOut = contextAuth?.isLockedOut ?? (localLockout && new Date() < new Date(localLockout.endTime));

  // Session management
  const [sessionWarning, setSessionWarning] = useState(false);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(null);

  // Check session validity on mount and location change
  useEffect(() => {
    if (!contextAuth && localSession) {
      checkLocalSessionValidity();
    }
  }, [location.pathname]);

  // Session timeout checker for local auth
  useEffect(() => {
    if (!contextAuth && isAuthenticated && localSession) {
      const interval = setInterval(checkLocalSessionTimeout, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, localSession, contextAuth]);

  // Lockout checker for local auth
  useEffect(() => {
    if (!contextAuth && localLockout) {
      const interval = setInterval(checkLocalLockout, 1000); // Check every second
      return () => clearInterval(interval);
    }
  }, [localLockout, contextAuth]);

  const checkLocalSessionValidity = useCallback(() => {
    if (!localSession) return;

    try {
      const sessionAge = (Date.now() - new Date(localSession.startTime).getTime()) / (1000 * 60);
      
      if (sessionAge >= authConfig.sessionTimeout) {
        // Session expired
        setLocalSession(null);
        setLocalError('Session expired. Please login again.');
      }
    } catch (error) {
      console.error('Error checking session validity:', error);
      setLocalSession(null);
    }
  }, [localSession, authConfig.sessionTimeout, setLocalSession]);

  const checkLocalSessionTimeout = useCallback(() => {
    if (!localSession) return;

    try {
      const sessionAge = (Date.now() - new Date(localSession.startTime).getTime()) / (1000 * 60);
      const remainingTime = authConfig.sessionTimeout - sessionAge;
      
      setSessionTimeRemaining(Math.max(0, Math.floor(remainingTime)));
      
      if (remainingTime <= 0) {
        // Session expired
        setLocalSession(null);
        setLocalError('Session expired. Please login again.');
        navigate('/82104077619352395638gaurav');
      } else if (remainingTime <= authConfig.sessionWarningTime && !sessionWarning) {
        // Show session warning
        setSessionWarning(true);
      }
    } catch (error) {
      console.error('Error checking session timeout:', error);
    }
  }, [localSession, authConfig, sessionWarning, setLocalSession, navigate]);

  const checkLocalLockout = useCallback(() => {
    if (!localLockout) return;

    try {
      const lockoutEndTime = new Date(localLockout.endTime);
      
      if (new Date() >= lockoutEndTime) {
        // Lockout expired
        setLocalLockout(null);
        setLocalAttempts(0);
      }
    } catch (error) {
      console.error('Error checking lockout:', error);
    }
  }, [localLockout, setLocalLockout, setLocalAttempts]);

  // Login function
  const login = useCallback(async (password, rememberMe = false) => {
    if (contextAuth?.login) {
      return await contextAuth.login(password, rememberMe);
    }

    try {
      setLocalLoading(true);
      setLocalError(null);

      // Check if locked out
      if (localLockout && new Date() < new Date(localLockout.endTime)) {
        const remainingTime = Math.ceil((new Date(localLockout.endTime) - new Date()) / (1000 * 60));
        throw new Error(`Account locked. Try again in ${remainingTime} minutes.`);
      }

      // Validate password
      if (password !== authConfig.defaultPassword) {
        const newAttempts = localAttempts + 1;
        setLocalAttempts(newAttempts);

        // Check if should lockout
        if (newAttempts >= authConfig.maxLoginAttempts) {
          const lockoutEnd = new Date(Date.now() + (authConfig.lockoutTime * 60 * 1000));
          setLocalLockout({
            endTime: lockoutEnd.toISOString(),
            attempts: newAttempts
          });
          
          throw new Error(`Too many failed attempts. Account locked for ${authConfig.lockoutTime} minutes.`);
        }

        const remainingAttempts = authConfig.maxLoginAttempts - newAttempts;
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
        startTime: now.toISOString(),
        rememberMe: rememberMe,
        loginMethod: 'password'
      };

      setLocalSession(sessionData);
      setLocalAttempts(0);
      setLocalLockout(null);

      // Navigate to admin panel
      const currentPath = window.location.pathname;
      if (currentPath.includes('/82104077619352395638gaurav')) {
        navigate(`/${password}`);
      }

      return { success: true, user: userData };

    } catch (error) {
      console.error('Login error:', error);
      setLocalError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLocalLoading(false);
    }
  }, [contextAuth, localAttempts, localLockout, authConfig, setLocalSession, setLocalAttempts, setLocalLockout, navigate]);

  // Logout function
  const logout = useCallback(async (redirectTo = '/82104077619352395638gaurav') => {
    if (contextAuth?.logout) {
      return await contextAuth.logout();
    }

    try {
      setLocalSession(null);
      setLocalError(null);
      setSessionWarning(false);
      setSessionTimeRemaining(null);

      navigate(redirectTo);
      return { success: true };

    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  }, [contextAuth, setLocalSession, navigate]);

  // Extend session function
  const extendSession = useCallback(() => {
    if (contextAuth?.extendSession) {
      return contextAuth.extendSession();
    }

    try {
      if (!localSession) {
        throw new Error('No active session to extend');
      }

      const now = new Date();
      const updatedSession = {
        ...localSession,
        startTime: now.toISOString(),
        loginMethod: 'extension'
      };

      setLocalSession(updatedSession);
      setSessionWarning(false);
      setSessionTimeRemaining(authConfig.sessionTimeout);

      return { success: true };

    } catch (error) {
      console.error('Session extension error:', error);
      return { success: false, error: error.message };
    }
  }, [contextAuth, localSession, setLocalSession, authConfig.sessionTimeout]);

  // Change password function
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    if (contextAuth?.changePassword) {
      return await contextAuth.changePassword(currentPassword, newPassword);
    }

    try {
      if (!isAuthenticated) {
        throw new Error('Must be logged in to change password');
      }

      // For local auth, we'd need to implement password storage
      // This is a simplified version
      if (currentPassword !== authConfig.defaultPassword) {
        throw new Error('Current password is incorrect');
      }

      if (newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }

      if (newPassword === currentPassword) {
        throw new Error('New password must be different from current password');
      }

      // In a real app, you'd save the new password securely
      console.warn('Password change not implemented for local auth');
      return { success: true };

    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: error.message };
    }
  }, [contextAuth, isAuthenticated, authConfig.defaultPassword]);

  // Permission checking
  const hasPermission = useCallback((permission) => {
    if (contextAuth?.checkPermission) {
      return contextAuth.checkPermission(permission);
    }

    if (!isAuthenticated || !user?.permissions) {
      return false;
    }

    return user.permissions.includes(permission);
  }, [contextAuth, isAuthenticated, user]);

  // Route protection
  const requireAuth = useCallback((redirectTo = '/82104077619352395638gaurav') => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return false;
    }
    return true;
  }, [isAuthenticated, navigate]);

  // Protected route wrapper
  const withAuthGuard = useCallback((component, requiredPermission = null, redirectTo = '/82104077619352395638gaurav') => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return null;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      setLocalError('Insufficient permissions');
      return null;
    }

    return component;
  }, [isAuthenticated, hasPermission, navigate]);

  // Session info
  const getSessionInfo = useCallback(() => {
    if (contextAuth?.getSessionInfo) {
      return contextAuth.getSessionInfo();
    }

    if (!isAuthenticated || !localSession) {
      return null;
    }

    try {
      const startTime = new Date(localSession.startTime);
      const sessionAge = (Date.now() - startTime.getTime()) / (1000 * 60); // in minutes
      const remainingTime = authConfig.sessionTimeout - sessionAge;

      return {
        startTime: startTime,
        sessionAge: Math.floor(sessionAge),
        remainingTime: Math.floor(remainingTime),
        isExpiringSoon: remainingTime <= authConfig.sessionWarningTime,
        user: user,
        rememberMe: localSession.rememberMe || false
      };
    } catch (error) {
      console.error('Error getting session info:', error);
      return null;
    }
  }, [contextAuth, isAuthenticated, localSession, user, authConfig]);

  // Lockout info
  const getLockoutInfo = useCallback(() => {
    if (contextAuth?.getLockoutInfo) {
      return contextAuth.getLockoutInfo();
    }

    if (!localLockout) {
      return null;
    }

    try {
      const endTime = new Date(localLockout.endTime);
      const remainingTime = Math.ceil((endTime - new Date()) / (1000 * 60));

      return {
        isLockedOut: remainingTime > 0,
        remainingTime: Math.max(0, remainingTime),
        endTime: endTime,
        attempts: localLockout.attempts || 0
      };
    } catch (error) {
      console.error('Error getting lockout info:', error);
      return null;
    }
  }, [contextAuth, localLockout]);

  // Clear error
  const clearError = useCallback(() => {
    if (contextAuth?.clearError) {
      contextAuth.clearError();
    } else {
      setLocalError(null);
    }
  }, [contextAuth]);

  // Activity logging
  const logActivity = useCallback((activity, details = {}) => {
    if (contextAuth?.logActivity) {
      return contextAuth.logActivity(activity, details);
    }

    try {
      const activityLog = {
        timestamp: new Date().toISOString(),
        activity: activity,
        user: user?.id || 'unknown',
        details: details,
        userAgent: navigator.userAgent,
        url: window.location.href
      };

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
  }, [contextAuth, user]);

  // Get activity logs
  const getActivityLogs = useCallback((limit = 50) => {
    if (contextAuth?.getActivityLogs) {
      return contextAuth.getActivityLogs();
    }

    try {
      const logs = JSON.parse(localStorage.getItem('aryapathshala_activity_log') || '[]');
      return logs.slice(-limit).reverse(); // Get last N logs, most recent first
    } catch (error) {
      console.error('Error retrieving activity logs:', error);
      return [];
    }
  }, [contextAuth]);

  // Auto-login check
  const checkAutoLogin = useCallback(() => {
    if (localSession?.rememberMe) {
      const sessionAge = (Date.now() - new Date(localSession.startTime).getTime()) / (1000 * 60);
      
      if (sessionAge < authConfig.sessionTimeout) {
        return true;
      }
    }
    return false;
  }, [localSession, authConfig.sessionTimeout]);

  // Authentication utilities
  const authUtils = useMemo(() => ({
    isAdmin: user?.role === 'admin',
    canRead: hasPermission('read'),
    canWrite: hasPermission('write'),
    canDelete: hasPermission('delete'),
    canManage: hasPermission('manage'),
    isSessionValid: isAuthenticated && (!localSession || (Date.now() - new Date(localSession.startTime).getTime()) / (1000 * 60) < authConfig.sessionTimeout),
    needsReauth: sessionTimeRemaining !== null && sessionTimeRemaining <= 0,
    isExpiringSoon: sessionTimeRemaining !== null && sessionTimeRemaining <= authConfig.sessionWarningTime
  }), [user, hasPermission, isAuthenticated, localSession, sessionTimeRemaining, authConfig]);

  return {
    // Auth state
    isAuthenticated,
    isLoading,
    user,
    error,
    loginAttempts,
    isLockedOut,
    
    // Session state
    sessionWarning,
    sessionTimeRemaining,
    
    // Auth actions
    login,
    logout,
    extendSession,
    changePassword,
    clearError,
    
    // Permission checking
    hasPermission,
    requireAuth,
    withAuthGuard,
    
    // Session management
    getSessionInfo,
    getLockoutInfo,
    checkAutoLogin,
    
    // Activity logging
    logActivity,
    getActivityLogs,
    
    // Utilities
    authUtils,
    authConfig,
    
    // Context availability
    hasContext: !!contextAuth,
    
    // Session info shorthand
    sessionInfo: getSessionInfo(),
    lockoutInfo: getLockoutInfo()
  };
};

export default useAuth;