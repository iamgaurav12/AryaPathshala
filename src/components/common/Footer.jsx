import React from 'react';
import { Heart, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/20 bg-white/5">
                <img
                  src="/logo_arya.jpg"
                  alt="Arya Pathshala Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display">Arya Pathshala</h3>
                <p className="text-gray-400 text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students with comprehensive study materials, interactive lectures, 
              and daily practice papers for Class 9 and 10. Your success is our mission.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Made with love for students</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/class9" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Class 9 Materials
                </a>
              </li>
              <li>
                <a href="/class10" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Class 10 Materials
                </a>
              </li>
              <li>
                <a href="/gaurav" className="text-gray-400 hover:text-white transition-colors duration-200 text-xs opacity-50">
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>aryapathshala233@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>+91 93523 95638 (Navneet Bhaiya)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <MapPin className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Arya Pathshala. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Built for students, by educators</span>
              <div className="flex items-center space-x-1">
                <span>v1.0</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
    </footer>
  );
};

export default Footer;