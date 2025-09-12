// String Utilities
export const stringUtils = {
  /**
   * Capitalize first letter of a string
   */
  capitalize: (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * Convert string to title case
   */
  toTitleCase: (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  /**
   * Convert string to camelCase
   */
  toCamelCase: (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  },

  /**
   * Convert string to kebab-case
   */
  toKebabCase: (str) => {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  },

  /**
   * Truncate string with ellipsis
   */
  truncate: (str, length = 50, suffix = '...') => {
    if (!str || typeof str !== 'string') return '';
    if (str.length <= length) return str;
    return str.substring(0, length).trim() + suffix;
  },

  /**
   * Remove extra whitespace
   */
  cleanWhitespace: (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/\s+/g, ' ').trim();
  },

  /**
   * Extract initials from name
   */
  getInitials: (name, maxLength = 2) => {
    if (!name || typeof name !== 'string') return '';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, maxLength)
      .join('');
  },

  /**
   * Generate slug from string
   */
  generateSlug: (str) => {
    if (!str || typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  },

  /**
   * Check if string contains only numbers
   */
  isNumeric: (str) => {
    if (!str) return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  },

  /**
   * Mask sensitive information (like passwords, phone numbers)
   */
  mask: (str, visibleChars = 3, maskChar = '*') => {
    if (!str || typeof str !== 'string') return '';
    if (str.length <= visibleChars) return maskChar.repeat(str.length);
    return str.slice(0, visibleChars) + maskChar.repeat(str.length - visibleChars);
  }
};

// Array Utilities
export const arrayUtils = {
  /**
   * Remove duplicates from array
   */
  removeDuplicates: (arr, key = null) => {
    if (!Array.isArray(arr)) return [];
    
    if (key) {
      const seen = new Set();
      return arr.filter(item => {
        const value = item[key];
        if (seen.has(value)) {
          return false;
        }
        seen.add(value);
        return true;
      });
    }
    
    return [...new Set(arr)];
  },

  /**
   * Shuffle array randomly
   */
  shuffle: (arr) => {
    if (!Array.isArray(arr)) return [];
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * Group array by key
   */
  groupBy: (arr, key) => {
    if (!Array.isArray(arr)) return {};
    return arr.reduce((groups, item) => {
      const group = item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});
  },

  /**
   * Sort array by multiple keys
   */
  sortBy: (arr, keys) => {
    if (!Array.isArray(arr)) return [];
    return arr.sort((a, b) => {
      for (let key of keys) {
        let aVal = a[key];
        let bVal = b[key];
        
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
      }
      return 0;
    });
  },

  /**
   * Get unique values for a specific key
   */
  getUniqueValues: (arr, key) => {
    if (!Array.isArray(arr)) return [];
    return [...new Set(arr.map(item => item[key]))].filter(Boolean);
  },

  /**
   * Chunk array into smaller arrays
   */
  chunk: (arr, size) => {
    if (!Array.isArray(arr) || size <= 0) return [];
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },

  /**
   * Find items by multiple criteria
   */
  findByCriteria: (arr, criteria) => {
    if (!Array.isArray(arr) || !criteria) return [];
    return arr.filter(item => {
      return Object.keys(criteria).every(key => {
        if (typeof criteria[key] === 'string') {
          return item[key]?.toLowerCase().includes(criteria[key].toLowerCase());
        }
        return item[key] === criteria[key];
      });
    });
  },

  /**
   * Move item in array
   */
  moveItem: (arr, fromIndex, toIndex) => {
    if (!Array.isArray(arr)) return [];
    const result = [...arr];
    const item = result.splice(fromIndex, 1)[0];
    result.splice(toIndex, 0, item);
    return result;
  }
};

// Object Utilities
export const objectUtils = {
  /**
   * Deep clone object
   */
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => objectUtils.deepClone(item));
    if (typeof obj === 'object') {
      const cloned = {};
      Object.keys(obj).forEach(key => {
        cloned[key] = objectUtils.deepClone(obj[key]);
      });
      return cloned;
    }
  },

  /**
   * Deep merge objects
   */
  deepMerge: (target, source) => {
    const result = { ...target };
    
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = objectUtils.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    });
    
    return result;
  },

  /**
   * Get nested property safely
   */
  getNestedProperty: (obj, path, defaultValue = null) => {
    if (!obj || !path) return defaultValue;
    
    const keys = path.split('.');
    let result = obj;
    
    for (let key of keys) {
      if (result === null || result === undefined || !(key in result)) {
        return defaultValue;
      }
      result = result[key];
    }
    
    return result;
  },

  /**
   * Set nested property
   */
  setNestedProperty: (obj, path, value) => {
    if (!obj || !path) return obj;
    
    const keys = path.split('.');
    const lastKey = keys.pop();
    let current = obj;
    
    for (let key of keys) {
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[lastKey] = value;
    return obj;
  },

  /**
   * Remove empty properties
   */
  removeEmpty: (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    const cleaned = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (value !== null && value !== undefined && value !== '') {
        if (typeof value === 'object' && !Array.isArray(value)) {
          const cleanedValue = objectUtils.removeEmpty(value);
          if (Object.keys(cleanedValue).length > 0) {
            cleaned[key] = cleanedValue;
          }
        } else {
          cleaned[key] = value;
        }
      }
    });
    
    return cleaned;
  },

  /**
   * Pick specific properties from object
   */
  pick: (obj, keys) => {
    if (!obj || !Array.isArray(keys)) return {};
    const result = {};
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  /**
   * Omit specific properties from object
   */
  omit: (obj, keys) => {
    if (!obj || !Array.isArray(keys)) return obj;
    const result = { ...obj };
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  }
};

// Date Utilities
export const dateUtils = {
  /**
   * Format date to readable string
   */
  formatDate: (date, format = 'YYYY-MM-DD') => {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  },

  /**
   * Get relative time (e.g., "2 hours ago")
   */
  getRelativeTime: (date) => {
    if (!date) return '';
    
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
    if (diffDay < 30) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
    
    return dateUtils.formatDate(date, 'DD/MM/YYYY');
  },

  /**
   * Add time to date
   */
  addTime: (date, amount, unit) => {
    const d = new Date(date);
    
    switch (unit) {
      case 'seconds':
        d.setSeconds(d.getSeconds() + amount);
        break;
      case 'minutes':
        d.setMinutes(d.getMinutes() + amount);
        break;
      case 'hours':
        d.setHours(d.getHours() + amount);
        break;
      case 'days':
        d.setDate(d.getDate() + amount);
        break;
      case 'months':
        d.setMonth(d.getMonth() + amount);
        break;
      case 'years':
        d.setFullYear(d.getFullYear() + amount);
        break;
      default:
        return d;
    }
    
    return d;
  },

  /**
   * Check if date is today
   */
  isToday: (date) => {
    const today = new Date();
    const check = new Date(date);
    return check.toDateString() === today.toDateString();
  },

  /**
   * Get age from birth date
   */
  getAge: (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }
};

// URL Utilities
export const urlUtils = {
  /**
   * Validate URL
   */
  isValidUrl: (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  },

  /**
   * Extract domain from URL
   */
  getDomain: (url) => {
    try {
      return new URL(url).hostname;
    } catch (_) {
      return '';
    }
  },

  /**
   * Add query parameters to URL
   */
  addQueryParams: (url, params) => {
    if (!params || typeof params !== 'object') return url;
    
    const urlObj = new URL(url);
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        urlObj.searchParams.set(key, params[key]);
      }
    });
    
    return urlObj.toString();
  },

  /**
   * Parse query string
   */
  parseQuery: (queryString) => {
    const params = new URLSearchParams(queryString);
    const result = {};
    
    for (let [key, value] of params) {
      result[key] = value;
    }
    
    return result;
  },

  /**
   * Check if URL is Google Drive link
   */
  isGoogleDriveUrl: (url) => {
    return /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+/.test(url);
  },

  /**
   * Check if URL is YouTube link
   */
  isYouTubeUrl: (url) => {
    return /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+/.test(url);
  },

  /**
   * Extract YouTube video ID
   */
  getYouTubeVideoId: (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  },

  /**
   * Extract Google Drive file ID
   */
  getGoogleDriveFileId: (url) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }
};

// Validation Utilities
export const validationUtils = {
  /**
   * Validate email
   */
  isValidEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  /**
   * Validate phone number (Indian)
   */
  isValidIndianPhone: (phone) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone.replace(/\D/g, ''));
  },

  /**
   * Validate password strength
   */
  validatePassword: (password, requirements = {}) => {
    const {
      minLength = 8,
      requireUppercase = false,
      requireLowercase = false,
      requireNumbers = false,
      requireSpecialChars = false
    } = requirements;

    const errors = [];

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
      strength: getPasswordStrength(password)
    };
  },

  /**
   * Validate required fields
   */
  validateRequired: (data, requiredFields) => {
    const errors = {};
    
    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        errors[field] = `${stringUtils.toTitleCase(field)} is required`;
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
  }
};

// Get password strength helper
const getPasswordStrength = (password) => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  
  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
};

// Number Utilities
export const numberUtils = {
  /**
   * Format number with commas
   */
  formatNumber: (num) => {
    if (typeof num !== 'number') return num;
    return num.toLocaleString('en-IN');
  },

  /**
   * Convert number to Indian currency format
   */
  formatCurrency: (amount, currency = '₹') => {
    if (typeof amount !== 'number') return amount;
    return `${currency}${amount.toLocaleString('en-IN')}`;
  },

  /**
   * Generate random number between min and max
   */
  randomBetween: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Round to specific decimal places
   */
  roundTo: (num, decimals = 2) => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  /**
   * Convert bytes to human readable format
   */
  formatBytes: (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  /**
   * Check if number is in range
   */
  isInRange: (num, min, max) => {
    return num >= min && num <= max;
  }
};

// Performance Utilities
export const performanceUtils = {
  /**
   * Debounce function
   */
  debounce: (func, wait, immediate = false) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  /**
   * Throttle function
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Measure execution time
   */
  measureTime: async (func, label = 'Function') => {
    const start = performance.now();
    const result = await func();
    const end = performance.now();
    console.log(`${label} took ${end - start} milliseconds`);
    return result;
  },

  /**
   * Simple memoization
   */
  memoize: (func) => {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func(...args);
      cache.set(key, result);
      return result;
    };
  }
};

// Color Utilities
export const colorUtils = {
  /**
   * Generate random hex color
   */
  randomHex: () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  },

  /**
   * Convert hex to RGB
   */
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  /**
   * Convert RGB to hex
   */
  rgbToHex: (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  },

  /**
   * Get contrast color (black or white)
   */
  getContrastColor: (hex) => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return '#000000';
    
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }
};

// Device Utilities
export const deviceUtils = {
  /**
   * Check if device is mobile
   */
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * Check if device is tablet
   */
  isTablet: () => {
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(navigator.userAgent);
  },

  /**
   * Check if device is desktop
   */
  isDesktop: () => {
    return !deviceUtils.isMobile() && !deviceUtils.isTablet();
  },

  /**
   * Get device type
   */
  getDeviceType: () => {
    if (deviceUtils.isMobile()) return 'mobile';
    if (deviceUtils.isTablet()) return 'tablet';
    return 'desktop';
  },

  /**
   * Check if browser supports feature
   */
  supportsFeature: (feature) => {
    switch (feature) {
      case 'localStorage':
        return typeof Storage !== 'undefined';
      case 'webGL':
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
          return false;
        }
      case 'geolocation':
        return 'geolocation' in navigator;
      default:
        return false;
    }
  }
};

// Search and Filter Utilities
export const searchUtils = {
  /**
   * Simple text search
   */
  searchInText: (text, query) => {
    if (!text || !query) return false;
    return text.toLowerCase().includes(query.toLowerCase());
  },

  /**
   * Search in object properties
   */
  searchInObject: (obj, query, searchFields = []) => {
    if (!obj || !query) return false;
    
    const searchText = searchFields.length > 0 
      ? searchFields.map(field => obj[field]).filter(Boolean).join(' ')
      : Object.values(obj).filter(val => typeof val === 'string').join(' ');
    
    return searchUtils.searchInText(searchText, query);
  },

  /**
   * Fuzzy search (basic implementation)
   */
  fuzzySearch: (text, query) => {
    if (!text || !query) return false;
    
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();
    
    let textIndex = 0;
    let queryIndex = 0;
    
    while (textIndex < textLower.length && queryIndex < queryLower.length) {
      if (textLower[textIndex] === queryLower[queryIndex]) {
        queryIndex++;
      }
      textIndex++;
    }
    
    return queryIndex === queryLower.length;
  },

  /**
   * Highlight search terms in text
   */
  highlightText: (text, query, className = 'highlight') => {
    if (!text || !query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, `<span class="${className}">$1</span>`);
  }
};

// Export utilities
export const exportUtils = {
  /**
   * Download data as JSON file
   */
  downloadAsJSON: (data, filename = 'data.json') => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Download data as CSV file
   */
  downloadAsCSV: (data, filename = 'data.csv') => {
    if (!Array.isArray(data) || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

// Animation Utilities
export const animationUtils = {
  /**
   * Smooth scroll to element
   */
  scrollToElement: (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  },

  /**
   * Animate number counting
   */
  animateNumber: (start, end, duration, callback) => {
    const startTime = performance.now();
    const change = end - start;
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(start + change * easeOut);
      
      callback(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  },

  /**
   * Add entrance animation to element
   */
  addEntranceAnimation: (element, animation = 'fadeInUp', delay = 0) => {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }
};

// Error Handling Utilities
export const errorUtils = {
  /**
   * Safe async function wrapper
   */
  safeAsync: (asyncFn) => {
    return async (...args) => {
      try {
        const result = await asyncFn(...args);
        return { success: true, data: result, error: null };
      } catch (error) {
        console.error('Async function error:', error);
        return { success: false, data: null, error: error.message };
      }
    };
  },

  /**
   * Retry function with exponential backoff
   */
  retryWithBackoff: async (fn, maxRetries = 3, baseDelay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        
        const delay = baseDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  },

  /**
   * Get user-friendly error message
   */
  getUserFriendlyError: (error) => {
    const errorMap = {
      'NetworkError': 'Please check your internet connection and try again.',
      'TypeError': 'Something went wrong. Please refresh the page.',
      'ValidationError': 'Please check your input and try again.',
      'AuthenticationError': 'Please log in again.',
      'AuthorizationError': 'You don\'t have permission to perform this action.',
      'default': 'An unexpected error occurred. Please try again.'
    };
    
    const errorType = error?.constructor?.name || 'default';
    return errorMap[errorType] || errorMap.default;
  }
};