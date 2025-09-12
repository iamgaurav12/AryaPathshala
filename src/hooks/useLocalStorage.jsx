import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing localStorage with React state synchronization
 * Provides automatic serialization/deserialization and error handling
 * 
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @param {Object} options - Configuration options
 * @returns {Array} [storedValue, setValue, removeValue, error]
 */
const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    syncAcrossTabs = true,
    errorOnFailedSync = false,
    allowPlainStrings = false
  } = options;

  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      // Handle plain strings if allowed (for backward compatibility)
      if (allowPlainStrings) {
        try {
          return deserialize(item);
        } catch (parseError) {
          // If JSON parsing fails, return as plain string
          return item;
        }
      }

      return deserialize(item);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // State for error handling
  const [error, setError] = useState(null);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      setError(null);
      
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        if (valueToStore === undefined) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, serialize(valueToStore));
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      setError(error);
      
      if (errorOnFailedSync) {
        throw error;
      }
    }
  }, [key, serialize, storedValue, errorOnFailedSync]);

  // Function to remove the value from localStorage
  const removeValue = useCallback(() => {
    try {
      setError(null);
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      setError(error);
      
      if (errorOnFailedSync) {
        throw error;
      }
    }
  }, [key, initialValue, errorOnFailedSync]);

  // Function to clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Function to refresh value from localStorage
  const refreshValue = useCallback(() => {
    try {
      setError(null);
      
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        if (!item) {
          setStoredValue(initialValue);
          return;
        }

        // Handle plain strings if allowed
        if (allowPlainStrings) {
          try {
            const newValue = deserialize(item);
            setStoredValue(newValue);
          } catch (parseError) {
            // If JSON parsing fails, treat as plain string
            setStoredValue(item);
          }
        } else {
          const newValue = deserialize(item);
          setStoredValue(newValue);
        }
      }
    } catch (error) {
      console.error(`Error refreshing localStorage key "${key}":`, error);
      setError(error);
    }
  }, [key, deserialize, initialValue, allowPlainStrings]);

  // Function to check if key exists in localStorage
  const hasValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key) !== null;
      }
      return false;
    } catch (error) {
      console.error(`Error checking localStorage key "${key}":`, error);
      return false;
    }
  }, [key]);

  // Function to get raw value (as string) from localStorage
  const getRawValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error(`Error getting raw localStorage value for key "${key}":`, error);
      return null;
    }
  }, [key]);

  // Sync across tabs/windows
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== serialize(storedValue)) {
        try {
          if (!e.newValue) {
            setStoredValue(initialValue);
            return;
          }

          // Handle plain strings if allowed
          if (allowPlainStrings) {
            try {
              const newValue = deserialize(e.newValue);
              setStoredValue(newValue);
            } catch (parseError) {
              // If JSON parsing fails, treat as plain string
              setStoredValue(e.newValue);
            }
          } else {
            const newValue = deserialize(e.newValue);
            setStoredValue(newValue);
          }
        } catch (error) {
          console.error(`Error syncing localStorage key "${key}" across tabs:`, error);
          setError(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, storedValue, serialize, deserialize, initialValue, syncAcrossTabs, allowPlainStrings]);

  // Custom methods for common operations
  const methods = {
    // Toggle boolean values
    toggle: useCallback(() => {
      if (typeof storedValue === 'boolean') {
        setValue(!storedValue);
      } else {
        console.warn(`Cannot toggle non-boolean value for key "${key}"`);
      }
    }, [storedValue, setValue, key]),

    // Append to array values
    append: useCallback((item) => {
      if (Array.isArray(storedValue)) {
        setValue([...storedValue, item]);
      } else {
        console.warn(`Cannot append to non-array value for key "${key}"`);
      }
    }, [storedValue, setValue, key]),

    // Remove from array values
    removeItem: useCallback((item) => {
      if (Array.isArray(storedValue)) {
        setValue(storedValue.filter(i => i !== item));
      } else {
        console.warn(`Cannot remove item from non-array value for key "${key}"`);
      }
    }, [storedValue, setValue, key]),

    // Update object properties
    updateProperty: useCallback((property, value) => {
      if (storedValue && typeof storedValue === 'object' && !Array.isArray(storedValue)) {
        setValue({
          ...storedValue,
          [property]: value
        });
      } else {
        console.warn(`Cannot update property on non-object value for key "${key}"`);
      }
    }, [storedValue, setValue, key]),

    // Merge object values
    merge: useCallback((newData) => {
      if (storedValue && typeof storedValue === 'object' && !Array.isArray(storedValue)) {
        setValue({
          ...storedValue,
          ...newData
        });
      } else {
        console.warn(`Cannot merge with non-object value for key "${key}"`);
      }
    }, [storedValue, setValue, key]),

    // Increment numeric values
    increment: useCallback((amount = 1) => {
      if (typeof storedValue === 'number') {
        setValue(storedValue + amount);
      } else {
        console.warn(`Cannot increment non-numeric value for key "${key}"`);
      }
    }, [storedValue, setValue, key]),

    // Decrement numeric values
    decrement: useCallback((amount = 1) => {
      if (typeof storedValue === 'number') {
        setValue(storedValue - amount);
      } else {
        console.warn(`Cannot decrement non-numeric value for key "${key}"`);
      }
    }, [storedValue, setValue, key])
  };

  return [
    storedValue,
    setValue,
    {
      removeValue,
      clearError,
      refreshValue,
      hasValue,
      getRawValue,
      error,
      ...methods
    }
  ];
};

// Specialized hooks for common use cases

/**
 * Hook for managing boolean values in localStorage
 */
export const useLocalStorageBoolean = (key, initialValue = false) => {
  const [value, setValue, methods] = useLocalStorage(key, initialValue);
  
  return [
    value,
    setValue,
    {
      ...methods,
      setTrue: () => setValue(true),
      setFalse: () => setValue(false),
      toggle: methods.toggle
    }
  ];
};

/**
 * Hook for managing array values in localStorage
 */
export const useLocalStorageArray = (key, initialValue = []) => {
  const [value, setValue, methods] = useLocalStorage(key, initialValue);
  
  return [
    value,
    setValue,
    {
      ...methods,
      append: methods.append,
      removeItem: methods.removeItem,
      clear: () => setValue([]),
      length: Array.isArray(value) ? value.length : 0
    }
  ];
};

/**
 * Hook for managing object values in localStorage
 */
export const useLocalStorageObject = (key, initialValue = {}) => {
  const [value, setValue, methods] = useLocalStorage(key, initialValue);
  
  return [
    value,
    setValue,
    {
      ...methods,
      updateProperty: methods.updateProperty,
      merge: methods.merge,
      clear: () => setValue({}),
      keys: value && typeof value === 'object' ? Object.keys(value) : []
    }
  ];
};

/**
 * Hook for managing numeric values in localStorage
 */
export const useLocalStorageNumber = (key, initialValue = 0) => {
  const [value, setValue, methods] = useLocalStorage(key, initialValue);
  
  return [
    value,
    setValue,
    {
      ...methods,
      increment: methods.increment,
      decrement: methods.decrement,
      reset: () => setValue(initialValue)
    }
  ];
};

/**
 * Hook for managing string values in localStorage
 * This hook automatically handles plain string values without JSON parsing
 */
export const useLocalStorageString = (key, initialValue = '') => {
  const [value, setValue, methods] = useLocalStorage(key, initialValue, {
    serialize: (val) => val,
    deserialize: (val) => val,
    allowPlainStrings: true
  });
  
  return [
    value,
    setValue,
    {
      ...methods,
      clear: () => setValue(''),
      isEmpty: !value || value.trim() === '',
      length: value ? value.length : 0
    }
  ];
};

/**
 * Hook for managing theme values specifically
 * Handles backward compatibility with both plain strings and JSON values
 */
export const useLocalStorageTheme = (key, initialValue = 'light') => {
  const [value, setValue, methods] = useLocalStorage(key, initialValue, {
    allowPlainStrings: true
  });
  
  return [
    value,
    setValue,
    {
      ...methods,
      setLight: () => setValue('light'),
      setDark: () => setValue('dark'),
      toggleTheme: () => setValue(value === 'light' ? 'dark' : 'light'),
      isDark: value === 'dark',
      isLight: value === 'light'
    }
  ];
};

/**
 * Hook for managing timestamped values in localStorage
 */
export const useLocalStorageWithTimestamp = (key, initialValue, maxAge = null) => {
  const [data, setData, methods] = useLocalStorage(key, {
    value: initialValue,
    timestamp: Date.now()
  });

  const setValue = useCallback((newValue) => {
    setData({
      value: newValue,
      timestamp: Date.now()
    });
  }, [setData]);

  const isExpired = useCallback(() => {
    if (!maxAge || !data?.timestamp) return false;
    return (Date.now() - data.timestamp) > maxAge;
  }, [data?.timestamp, maxAge]);

  const getAge = useCallback(() => {
    if (!data?.timestamp) return 0;
    return Date.now() - data.timestamp;
  }, [data?.timestamp]);

  const refreshTimestamp = useCallback(() => {
    if (data) {
      setData({
        ...data,
        timestamp: Date.now()
      });
    }
  }, [data, setData]);

  return [
    data?.value,
    setValue,
    {
      ...methods,
      isExpired,
      getAge,
      refreshTimestamp,
      timestamp: data?.timestamp
    }
  ];
};

export default useLocalStorage;