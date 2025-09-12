// Application Information
export const APP_INFO = {
  name: 'Aryapathshala',
  version: '1.0.0',
  description: 'Quality Education Platform for 9th and 10th Grade Students',
  author: 'Aryapathshala Team',
  website: 'https://aryapathshala.com',
  supportEmail: 'support@aryapathshala.com',
  motto: 'Empowering Students for a Brighter Future'
};

// Route Constants
export const ROUTES = {
  HOME: '/',
  CLASS_9: '/class-9',
  CLASS_10: '/class-10',
  ADMIN_LOGIN: '/gaurav',
  ADMIN_PANEL: '/:password',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms'
};

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  COURSES: {
    GET_ALL: '/courses',
    GET_BY_CLASS: '/courses/:class',
    CREATE: '/courses',
    UPDATE: '/courses/:id',
    DELETE: '/courses/:id'
  },
  CHAPTERS: {
    GET_ALL: '/chapters',
    GET_BY_ID: '/chapters/:id',
    CREATE: '/chapters',
    UPDATE: '/chapters/:id',
    DELETE: '/chapters/:id',
    REORDER: '/chapters/reorder'
  },
  RESOURCES: {
    UPLOAD: '/resources/upload',
    DELETE: '/resources/:id'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'aryapathshala_theme',
  COURSES: 'aryapathshala_courses',
  TEAM: 'aryapathshala_team',
  ADMIN_SESSION: 'aryapathshala_admin_session',
  LOGIN_ATTEMPTS: 'aryapathshala_login_attempts',
  LOCKOUT: 'aryapathshala_lockout',
  ADMIN_SETTINGS: 'aryapathshala_admin_settings',
  ACTIVITY_LOG: 'aryapathshala_activity_log',
  USER_PREFERENCES: 'aryapathshala_user_preferences',
  CACHE: 'aryapathshala_cache',
  TEMP_DATA: 'aryapathshala_temp'
};

// Class Information
export const CLASSES = {
  9: {
    id: '9',
    name: 'Class 9th',
    displayName: 'Ninth Grade',
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
    totalChapters: 0, // Will be calculated dynamically
    icon: '📚',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500'
  },
  10: {
    id: '10',
    name: 'Class 10th',
    displayName: 'Tenth Grade',
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
    totalChapters: 0, // Will be calculated dynamically
    icon: '🎓',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500'
  }
};

// Subject Information
export const SUBJECTS = {
  MATHEMATICS: {
    name: 'Mathematics',
    icon: '🔢',
    color: 'blue',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    textColor: 'text-blue-800 dark:text-blue-200',
    borderColor: 'border-blue-300 dark:border-blue-700'
  },
  SCIENCE: {
    name: 'Science',
    icon: '🔬',
    color: 'green',
    bgColor: 'bg-green-100 dark:bg-green-900',
    textColor: 'text-green-800 dark:text-green-200',
    borderColor: 'border-green-300 dark:border-green-700'
  },
  SOCIAL_SCIENCE: {
    name: 'Social Science',
    icon: '🌍',
    color: 'orange',
    bgColor: 'bg-orange-100 dark:bg-orange-900',
    textColor: 'text-orange-800 dark:text-orange-200',
    borderColor: 'border-orange-300 dark:border-orange-700'
  },
  ENGLISH: {
    name: 'English',
    icon: '📖',
    color: 'purple',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    textColor: 'text-purple-800 dark:text-purple-200',
    borderColor: 'border-purple-300 dark:border-purple-700'
  },
  HINDI: {
    name: 'Hindi',
    icon: '📝',
    color: 'red',
    bgColor: 'bg-red-100 dark:bg-red-900',
    textColor: 'text-red-800 dark:text-red-200',
    borderColor: 'border-red-300 dark:border-red-700'
  }
};

// Resource Types
export const RESOURCE_TYPES = {
  NOTES: {
    name: 'Notes',
    icon: '📝',
    color: 'green',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-700 dark:text-green-300',
    borderColor: 'border-green-200 dark:border-green-700'
  },
  DPP: {
    name: 'Daily Practice Problems',
    shortName: 'DPP',
    icon: '📚',
    color: 'orange',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-700 dark:text-orange-300',
    borderColor: 'border-orange-200 dark:border-orange-700'
  },
  LECTURE: {
    name: 'Video Lecture',
    shortName: 'Lecture',
    icon: '🎥',
    color: 'red',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-700 dark:text-red-300',
    borderColor: 'border-red-200 dark:border-red-700'
  }
};

// Authentication Configuration
export const AUTH_CONFIG = {
  DEFAULT_PASSWORD: 'aryapathshala2024',
  SESSION_TIMEOUT: 120, // 2 hours in minutes
  SESSION_WARNING_TIME: 10, // Show warning 10 minutes before expiry
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_TIME: 15, // 15 minutes
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIREMENTS: {
    minLength: 8,
    requireUppercase: false,
    requireLowercase: false,
    requireNumbers: false,
    requireSpecialChars: false
  }
};

// Theme Configuration
export const THEME_CONFIG = {
  DEFAULT_THEME: 'light',
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
  },
  COLORS: {
    PRIMARY: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    SECONDARY: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87'
    }
  }
};

// Animation Configuration
export const ANIMATIONS = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  TRANSITIONS: {
    ALL: 'transition-all duration-300 ease-in-out',
    COLORS: 'transition-colors duration-300 ease-in-out',
    TRANSFORM: 'transition-transform duration-300 ease-in-out',
    OPACITY: 'transition-opacity duration-300 ease-in-out'
  }
};

// Validation Rules
export const VALIDATION = {
  CHAPTER: {
    TITLE: {
      minLength: 3,
      maxLength: 100,
      required: true
    },
    DESCRIPTION: {
      minLength: 10,
      maxLength: 500,
      required: false
    }
  },
  LINKS: {
    GOOGLE_DRIVE: {
      pattern: /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+/,
      message: 'Please enter a valid Google Drive link'
    },
    YOUTUBE: {
      pattern: /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+/,
      message: 'Please enter a valid YouTube link'
    },
    GENERAL_URL: {
      pattern: /^https?:\/\/.+/,
      message: 'Please enter a valid URL starting with http:// or https://'
    }
  }
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: {
    NO_INTERNET: 'No internet connection. Please check your network.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    TIMEOUT: 'Request timed out. Please try again.',
    UNKNOWN: 'An unknown error occurred. Please try again.'
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid username or password.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
    ACCESS_DENIED: 'You do not have permission to access this resource.',
    ACCOUNT_LOCKED: 'Account temporarily locked due to too many failed attempts.'
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_URL: 'Please enter a valid URL.',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
    PASSWORDS_DONT_MATCH: 'Passwords do not match.'
  },
  STORAGE: {
    QUOTA_EXCEEDED: 'Storage quota exceeded. Please clear some data.',
    ACCESS_DENIED: 'Unable to access local storage.',
    CORRUPTED_DATA: 'Stored data appears to be corrupted.'
  }
};

// Success Messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Successfully logged in!',
    LOGOUT_SUCCESS: 'Successfully logged out!',
    PASSWORD_CHANGED: 'Password changed successfully!'
  },
  DATA: {
    CHAPTER_ADDED: 'Chapter added successfully!',
    CHAPTER_UPDATED: 'Chapter updated successfully!',
    CHAPTER_DELETED: 'Chapter deleted successfully!',
    DATA_SAVED: 'Data saved successfully!',
    DATA_IMPORTED: 'Data imported successfully!',
    DATA_EXPORTED: 'Data exported successfully!'
  }
};

// File Configuration
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEET: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    VIDEO: ['video/mp4', 'video/webm', 'video/ogg']
  }
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  XS: '320px',
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px'
};

// Default Data
export const DEFAULT_DATA = {
  TEAM_MEMBERS: [
    {
      id: 1,
      name: 'Gaurav Sir',
      role: 'Mathematics Teacher & Founder',
      bio: 'Expert in Mathematics with 5+ years of teaching experience. Passionate about making complex concepts simple.',
      subjects: ['Mathematics', 'Physics'],
      experience: '5+ years',
      education: 'M.Sc. Mathematics',
      image: '/assets/images/team/gaurav.jpg'
    },
    {
      id: 2,
      name: 'Priya Ma\'am',
      role: 'Science Teacher',
      bio: 'Passionate Science teacher with innovative teaching methods. Specializes in making science fun and engaging.',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      experience: '4+ years',
      education: 'M.Sc. Physics',
      image: '/assets/images/team/priya.jpg'
    },
    {
      id: 3,
      name: 'Rajesh Sir',
      role: 'English & Hindi Teacher',
      bio: 'Language enthusiast with excellent communication skills. Helps students excel in literature and communication.',
      subjects: ['English', 'Hindi'],
      experience: '6+ years',
      education: 'M.A. English Literature',
      image: '/assets/images/team/rajesh.jpg'
    }
  ],
  TESTIMONIALS: [
    {
      id: 1,
      name: 'Aarav Sharma',
      class: 'Class 10th',
      message: 'Aryapathshala helped me improve my Math scores significantly. The explanations are very clear!',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Patel',
      class: 'Class 9th',
      message: 'The DPPs are really helpful for practice. I feel more confident in Science now.',
      rating: 5
    },
    {
      id: 3,
      name: 'Rohit Kumar',
      class: 'Class 10th',
      message: 'Amazing teaching quality and very supportive teachers. Highly recommended!',
      rating: 5
    }
  ]
};

// Performance Configuration
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  LAZY_LOADING_OFFSET: '100px',
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  MAX_CACHE_SIZE: 100 // Maximum number of cached items
};

// Feature Flags
export const FEATURES = {
  DARK_MODE: true,
  OFFLINE_SUPPORT: false,
  ANALYTICS: false,
  NOTIFICATIONS: false,
  SEARCH: true,
  EXPORT_DATA: true,
  IMPORT_DATA: true,
  BULK_OPERATIONS: true,
  ADMIN_LOGS: true
};

// Social Media Links
export const SOCIAL_LINKS = {
  YOUTUBE: 'https://youtube.com/@aryapathshala',
  TELEGRAM: 'https://t.me/aryapathshala',
  INSTAGRAM: 'https://instagram.com/aryapathshala',
  FACEBOOK: 'https://facebook.com/aryapathshala',
  WHATSAPP: 'https://wa.me/919876543210'
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: 'contact@aryapathshala.com',
  PHONE: '+91 98765 43210',
  ADDRESS: 'Chandigarh, Punjab, India',
  SUPPORT_HOURS: 'Mon-Sat: 9:00 AM - 8:00 PM'
};

// Meta Tags
export const META_TAGS = {
  TITLE: 'Aryapathshala - Quality Education for 9th & 10th Grade',
  DESCRIPTION: 'Access comprehensive study materials, practice problems, and video lectures for Class 9th and 10th students.',
  KEYWORDS: 'education, 9th class, 10th class, study materials, practice problems, video lectures, mathematics, science',
  AUTHOR: 'Aryapathshala Team',
  ROBOTS: 'index, follow',
  VIEWPORT: 'width=device-width, initial-scale=1.0'
};