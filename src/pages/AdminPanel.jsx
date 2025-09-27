import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import { Lock, LogOut, Shield, User } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, loading } = useAuth(); // include loading

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !isAuthenticated) {
      navigate('/admin/login' , {replace : true});
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading only while verifying authentication
  if (loading) {
    return (
      // 1. LOADING SCREEN BACKGROUND: Pure Black
      <div className={`min-h-screen flex items-center justify-center bg-black`}>
        
        {/* Background Pattern for Loading */}
        <div className="fixed inset-0 z-0">
          {/* Background Gradient: Black to Very Dark Grey */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A1A]" />
          {/* Yellow Glowing Blobs */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFC700] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          </div>
        </div>
        
        <div className="relative z-10 text-center">
          <div 
            // Icon container: Yellow/Dark background
            className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#FFD700]/20 shadow-[0_0_20px_rgba(255,215,0,0.5)]`}
          >
            {/* Icon color: Yellow */}
            <Shield className={`h-8 w-8 animate-pulse text-[#FFD700]`} />
          </div>
          
          {/* Spinner: Yellow border on dark base */}
          <div className={`animate-spin rounded-full h-10 w-10 border-3 mx-auto mb-4 border-[#FFD700] border-t-transparent`}></div>
          
          <p 
            // Text color: White
            className={`text-lg font-medium text-white`}
          >
            Verifying admin access...
          </p>
          <p 
            // Muted Text color: Gray-400
            className={`text-sm mt-2 text-gray-400`}
          >
            Please wait while we authenticate your credentials
          </p>
        </div>
      </div>
    );
  }

  // Only render the panel if authenticated
  if (!isAuthenticated) return null;

  return (
    // 2. MAIN BACKGROUND: Pure Black
    <div className={`min-h-screen bg-black`}>
      
      {/* Admin Header */}
      <div 
        // 3. HEADER BACKGROUND: Very dark grey/near black, yellow shadow/border
        className={`sticky top-0 z-50 border-b transition-all duration-300 bg-[#0A0A0A]/95 backdrop-blur-lg border-[#1A1A1A] shadow-[0_4px_6px_rgba(0,0,0,0.5)] shadow-[#FFD700]/20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand Section */}
            <div className="flex items-center space-x-4">
              <div 
                // Icon container: Yellow gradient
                className={`p-2.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-[#FFD700] to-[#FFC700] shadow-[0_0_15px_rgba(255,215,0,0.4)]`}
              >
                {/* Icon color: Black */}
                <Lock className={`h-5 w-5 text-black`} />
              </div>
              
              <div>
                <h1 
                  // Title: White text
                  className={`text-xl font-bold text-white`}
                >
                  AryaPathshala
                </h1>
                <p 
                  // Subtitle: Yellow text
                  className={`text-xs font-medium text-[#FFD700]`}
                >
                  Admin Control Panel
                </p>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-6">
              {/* Welcome Message */}
              <div className="flex items-center space-x-3">
                <div 
                  // User Icon container: Yellow/Dark
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#FFD700]/20 border border-[#FFD700]/30`}
                >
                  {/* User Icon: Yellow */}
                  <User className={`h-4 w-4 text-[#FFD700]`} />
                </div>
                
                <div className="hidden sm:block">
                  <p 
                    // Welcome Text: White
                    className={`text-sm font-medium text-white`}
                  >
                    Welcome back!
                  </p>
                  <p 
                    // Role Text: Gray-400
                    className={`text-xs text-gray-500`}
                  >
                    Administrator
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                // Logout Button: Dark background, light text, yellow hover
                className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 transform hover:scale-105 bg-[#1A1A1A] hover:bg-[#333333] text-white hover:text-[#FFD700] border border-[#333333] hover:border-[#FFD700]/50`}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div 
          // Status Bar background: Slightly lighter dark grey
          className={`px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]/50`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between py-2 text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div 
                    // System Online indicator: Yellow
                    className={`w-2 h-2 rounded-full animate-pulse bg-[#FFD700]`}
                  ></div>
                  <span 
                    // System Online Text: Gray-400
                    className={'text-gray-500'}
                  >
                    System Online
                  </span>
                </div>
                
                <div 
                  // Divider: Very Dark Grey
                  className={`h-3 w-px bg-[#333333]`}
                ></div>
                
                <span 
                  // Last login Text: Gray-500
                  className={'text-gray-500'}
                >
                  Last login: {new Date().toLocaleDateString()}
                </span>
              </div>
              
              <div 
                // ADMIN MODE tag: Yellow/Dark
                className={`px-2 py-1 rounded text-xs font-medium bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30`}
              >
                ADMIN MODE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      {/* AdminDashboard component will inherit the black background from the parent div */}
      <AdminDashboard />
    </div>
  );
};

export default AdminPanel;