import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate, useParams } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import CourseSelector from '../components/admin/CourseSelector';
import ChapterManager from '../components/admin/ChapterManager';
import { 
  LogOut, 
  Home, 
  Settings, 
  BookOpen, 
  Menu, 
  X,
  User,
  Clock,
  Shield,
  Activity
} from 'lucide-react';

const AdminPanel = () => {
  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedClass, setSelectedClass] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { logout, isAuthenticated, currentPassword } = useAuth();
  const { courses, lastUpdated } = useData();
  const navigate = useNavigate();
  const { password } = useParams();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Verify authentication
  useEffect(() => {
    if (!isAuthenticated || password !== currentPassword) {
      navigate('/82104077619352395638gaurav', { replace: true });
    }
  }, [isAuthenticated, password, currentPassword, navigate]);

  const handleViewChange = (view, classType = null) => {
    setSelectedView(view);
    setSelectedClass(classType);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/', { replace: true });
    }
  };

  const navigation = [
    {
      name: 'Dashboard',
      icon: Home,
      current: selectedView === 'dashboard',
      onClick: () => handleViewChange('dashboard')
    },
    {
      name: 'Manage Courses',
      icon: BookOpen,
      current: selectedView === 'courses' || selectedView === 'chapters',
      onClick: () => handleViewChange('courses')
    }
  ];

  const stats = {
    totalChapters: (courses.class9?.length || 0) + (courses.class10?.length || 0),
    class9Chapters: courses.class9?.length || 0,
    class10Chapters: courses.class10?.length || 0,
    totalResources: ((courses.class9?.length || 0) + (courses.class10?.length || 0)) * 3
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleViewChange} />;
      case 'courses':
        return <CourseSelector onSelectClass={handleViewChange} />;
      case 'chapters':
        return (
          <ChapterManager 
            classType={selectedClass}
            onBack={() => handleViewChange('courses')}
          />
        );
      default:
        return <AdminDashboard onNavigate={handleViewChange} />;
    }
  };

  const getPageTitle = () => {
    switch (selectedView) {
      case 'dashboard':
        return 'Admin Dashboard';
      case 'courses':
        return 'Course Management';
      case 'chapters':
        return `${selectedClass === 'class9' ? 'Class 9' : 'Class 10'} Chapters`;
      default:
        return 'Admin Panel';
    }
  };

  const getPageDescription = () => {
    switch (selectedView) {
      case 'dashboard':
        return 'Overview of your educational content management system';
      case 'courses':
        return 'Select a class to manage chapters and resources';
      case 'chapters':
        return `Manage chapters, notes, lectures, and practice problems for ${selectedClass === 'class9' ? 'Class 9' : 'Class 10'}`;
      default:
        return 'Manage your course content and resources';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Settings className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
              Admin Panel
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Admin info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Session: {password?.substring(0, 8)}...
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Login time: {currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`w-full group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    item.current
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${
                    item.current 
                      ? 'text-blue-500' 
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 px-6">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Chapters</span>
              <span className="font-medium text-gray-900 dark:text-white">{stats.totalChapters}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Class 9</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">{stats.class9Chapters}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Class 10</span>
              <span className="font-medium text-green-600 dark:text-green-400">{stats.class10Chapters}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Resources</span>
              <span className="font-medium text-purple-600 dark:text-purple-400">{stats.totalResources}</span>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <Menu className="h-5 w-5" />
                </button>
                
                <div className="ml-4 lg:ml-0">
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {getPageTitle()}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                    {getPageDescription()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <button
                    onClick={() => handleViewChange('dashboard')}
                    className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                </li>
                {selectedView === 'courses' && (
                  <>
                    <li className="flex items-center">
                      <span className="mx-2">/</span>
                      <span className="text-gray-700 dark:text-gray-300">Courses</span>
                    </li>
                  </>
                )}
                {selectedView === 'chapters' && (
                  <>
                    <li className="flex items-center">
                      <span className="mx-2">/</span>
                      <button
                        onClick={() => handleViewChange('courses')}
                        className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                      >
                        Courses
                      </button>
                    </li>
                    <li className="flex items-center">
                      <span className="mx-2">/</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {selectedClass === 'class9' ? 'Class 9' : 'Class 10'}
                      </span>
                    </li>
                  </>
                )}
              </ol>
            </nav>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <span>Class 9 Chapters: {stats.class9Chapters}</span>
                <span>Class 10 Chapters: {stats.class10Chapters}</span>
                <span>Total Resources: {stats.totalResources}</span>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                Aryapathshala Admin Panel © 2024
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminPanel;