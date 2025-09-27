// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { 
  BookOpen, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Home,
  GraduationCap,
  LogIn,
  LogOut,
  UserPlus
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentStudent, logout } = useStudentAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/class9', label: 'Class 9', icon: GraduationCap },
    { path: '/class10', label: 'Class 10', icon: GraduationCap }
  ];

  return (
    <header className={`sticky top-0 z-50 ${
      darkMode 
        ? 'bg-black/95 backdrop-blur border-zinc-900' 
        : 'bg-white/95 backdrop-blur border-gray-200'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
              <img
                src="/logo_arya.jpg"
                alt="Arya Pathshala Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h1 className={`text-lg sm:text-xl font-bold truncate ${
                darkMode ? 'text-yellow-400' : 'text-gray-900'
              }`}>
                <span className="hidden xs:inline">Arya Pathshala</span>
                <span className="xs:hidden">Arya Pathshala</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors font-medium whitespace-nowrap ${
                    isActive(link.path)
                      ? 'bg-yellow-500/20 text-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400'
                      : darkMode
                      ? 'text-gray-300 hover:text-yellow-400 hover:bg-zinc-900'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Authentication Controls - Desktop */}
            {currentStudent ? (
              <div className="hidden sm:flex items-center space-x-2">
                <span className={`px-2 sm:px-3 py-2 text-sm sm:text-base truncate max-w-32 sm:max-w-40 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {currentStudent.name || 'Student'}
                </span>
                <button
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    darkMode
                      ? 'text-gray-300 hover:text-yellow-400 hover:bg-zinc-900'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">
                <Link
                  to="/student/login"
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    darkMode
                      ? 'text-gray-300 hover:text-yellow-400 hover:bg-zinc-900'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden md:inline">Login</span>
                </Link>
                <Link
                  to="/student/signup"
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    darkMode
                      ? 'text-gray-300 hover:text-yellow-400 hover:bg-zinc-900'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden md:inline">Sign Up</span>
                </Link>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-yellow-400 hover:bg-zinc-900' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:bg-zinc-900' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden py-4 border-t ${
            darkMode ? 'border-zinc-900' : 'border-gray-200'
          }`}>
            <nav className="space-y-1 sm:space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors font-medium ${
                      isActive(link.path)
                        ? 'bg-yellow-500/20 text-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400'
                        : darkMode
                        ? 'text-gray-300 hover:text-yellow-400 hover:bg-zinc-900'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Authentication Controls */}
              <div className="border-t pt-2 mt-2 space-y-1 sm:space-y-2">
                {currentStudent ? (
                  <>
                    <div className={`px-3 py-2 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Welcome, {currentStudent.name || 'Student'}
                    </div>
                    <button
                      onClick={async () => {
                        await logout();
                        navigate('/');
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors font-medium w-full text-left ${
                        darkMode
                          ? 'text-gray-300 hover:text-yellow-400 hover:bg-zinc-900'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/student/login"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors font-medium ${
                        darkMode
                          ? 'text-gray-300 hover:text-yellow-400 hover:bg-zinc-900'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/student/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors font-medium ${
                        darkMode
                          ? 'text-gray-300 hover:text-yellow-400 hover:bg-zinc-900'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;