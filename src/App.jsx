import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loading from './components/common/Loading';

// Pages
import Home from './pages/Home';
import Class9 from './pages/Class9';
import Class10 from './pages/Class10';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

// Hooks
import { useTheme } from './hooks/useTheme';

// Styles
import './App.css';

// Protected Route Component for Admin
const ProtectedAdminRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Check if user is authenticated (check localStorage or sessionStorage)
    const authToken = localStorage.getItem('admin-auth-token');
    const authTimestamp = localStorage.getItem('admin-auth-timestamp');
    
    if (authToken && authTimestamp) {
      // Check if token is still valid (24 hours)
      const now = new Date().getTime();
      const tokenTime = parseInt(authTimestamp);
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (now - tokenTime < twentyFourHours) {
        setIsAuthenticated(true);
      } else {
        // Token expired, remove it
        localStorage.removeItem('admin-auth-token');
        localStorage.removeItem('admin-auth-timestamp');
      }
    }
    
    setIsLoading(false);
  }, []);
  
  if (isLoading) {
    return <Loading />;
  }
  
  return isAuthenticated ? children : <Navigate to="/gaurav" replace />;
};

// App Layout Component
const AppLayout = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
      
      {/* Background Pattern Overlay */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${
        isDarkMode 
          ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]'
          : 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]'
      }`} />
      
      {/* Floating Elements for Visual Appeal */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDarkMode ? 'bg-purple-500' : 'bg-blue-400'
        }`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000 ${
          isDarkMode ? 'bg-indigo-500' : 'bg-purple-400'
        }`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 animate-pulse animation-delay-1000 ${
          isDarkMode ? 'bg-pink-500' : 'bg-indigo-400'
        }`} />
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [isAppLoading, setIsAppLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isAppLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">आर्यपाठशाला</h2>
          <p className="text-gray-200 animate-pulse">Loading your learning journey...</p>
        </div>
      </div>
    );
  }
  
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <AuthProvider>
            <AppLayout>
              <Routes>
                {/* Home Route */}
                <Route path="/" element={<Home />} />
                
                {/* Course Routes */}
                <Route path="/class-9" element={<Class9 />} />
                <Route path="/class-10" element={<Class10 />} />
                
                {/* Admin Routes - FIXED */}
                <Route path="/gaurav" element={<AdminLogin />} />
                
                {/* Dynamic admin route based on password */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminPanel />
                    </ProtectedAdminRoute>
                  } 
                />
                
                {/* Legacy admin panel route for backward compatibility */}
                <Route 
                  path="/admin-panel" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminPanel />
                    </ProtectedAdminRoute>
                  } 
                />
                
                {/* Catch all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppLayout>
          </AuthProvider>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;