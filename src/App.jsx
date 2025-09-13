import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Class9 from './pages/Class9';
import Class10 from './pages/Class10';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/admin/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <AuthProvider>
            <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/class9" element={<Class9 />} />
                  <Route path="/class10" element={<Class10 />} />
                  <Route path="/gaurav" element={<AdminLogin />} />
                  <Route 
                    path="/admin/:password" 
                    element={
                      <ProtectedRoute>
                        <AdminPanel />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;