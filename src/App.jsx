import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Class9 from './pages/Class9';
import Class10 from './pages/Class10';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
          <Router>
            <div className="App min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/class9" element={<Class9 />} />
                  <Route path="/class10" element={<Class10 />} />
                  <Route path="/gaurav" element={<AdminLogin />} />
                  <Route path="/:password" element={<AdminPanel />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;