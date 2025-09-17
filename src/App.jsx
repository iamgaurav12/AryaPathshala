// src/App.jsx
//Pages
import Home from './pages/Home';
import Class9 from './pages/Class9';
import Class10 from './pages/Class10';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { StudentAuthProvider } from './context/StudentAuthContext';

// Error Handling
import ErrorBoundary from './components/common/ErrorBoundary';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StudentLogin from './components/students/StudentLogin';
import StudentSignup from './components/students/StudentSignup';
import StudentProtectedRoute from './components/students/StudentProtectedRoute';

// Pages

// Admin Route Protection

// Import Firebase configuration to initialize
import './firebase/config';

// Global styles
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DataProvider>
          <AuthProvider>
            <StudentAuthProvider>
              <Router>
                <div className="App min-h-screen flex flex-col">
                  <Header />
                  
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/class9" element={
                        <StudentProtectedRoute>
                          <Class9 />
                        </StudentProtectedRoute>
                      } />
                      <Route path="/class10" element={
                        <StudentProtectedRoute>
                          <Class10 />
                        </StudentProtectedRoute>
                      } />
                      <Route path="/gaurav" element={<AdminLogin />} />
                      <Route 
                        path="/admin/authenticated" 
                        element={
                          <ProtectedRoute>
                            <AdminPanel />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/student/login" element={<StudentLogin />} />
                      <Route path="/student/signup" element={<StudentSignup />} />
                      
                      {/* Fallback route */}
                      <Route path="*" element={<Home />} />
                    </Routes>
                  </main>
                  
                  <Footer />
                </div>
              </Router>
            </StudentAuthProvider>
          </AuthProvider>
        </DataProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;