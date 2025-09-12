import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const navigate = useNavigate();

  const heroTexts = [
    "Master Class 9th & 10th",
    "Ace Your Board Exams",
    "Learn with Excellence",
    "Achieve Your Dreams"
  ];

  const subjects = [
    { name: "Mathematics", icon: "🔢", color: "from-blue-500 to-cyan-500" },
    { name: "Science", icon: "🧪", color: "from-green-500 to-emerald-500" },
    { name: "English", icon: "📚", color: "from-purple-500 to-pink-500" },
    { name: "Hindi", icon: "📖", color: "from-orange-500 to-red-500" },
    { name: "Social Science", icon: "🌍", color: "from-indigo-500 to-purple-500" }
  ];

  const features = [
    { icon: "🎥", title: "HD Video Lectures", desc: "Crystal clear explanations" },
    { icon: "📄", title: "Comprehensive Notes", desc: "Easy to understand materials" },
    { icon: "📝", title: "Practice Papers", desc: "DPPs for better preparation" },
    { icon: "💯", title: "High Success Rate", desc: "95% students score 90+" }
  ];

  // Text rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rotate-45 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg opacity-20 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 right-32 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s', animationDuration: '2s' }}></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-purple-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-gray-900/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Main Heading with Animation */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">AryaPathshala</span>
              </h1>
              
              {/* Rotating text */}
              <div className="h-16 flex items-center justify-center lg:justify-start">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 transition-all duration-500 transform">
                  {heroTexts.map((text, index) => (
                    <span
                      key={index}
                      className={`absolute transition-all duration-500 ${
                        index === currentText
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4'
                      }`}
                    >
                      {text}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform your academic journey with our comprehensive learning platform designed specifically for 
              <span className="font-semibold text-blue-600 dark:text-blue-400"> Class 9th & 10th students</span>. 
              Get access to premium video lectures, detailed notes, and practice papers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('courses')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
              >
                Start Learning 🚀
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300"
              >
                Learn More 📚
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transform hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Subjects */}
          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Choose Your Subject
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive learning across all major subjects
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${subject.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {subject.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {subject.name}
                    </h4>
                    
                    {/* Interactive elements */}
                    <div className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="flex justify-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs">
                          Videos
                        </span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded text-xs">
                          Notes
                        </span>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs">
                          Tests
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover effect border */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${subject.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
                       style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor', padding: '2px' }}></div>
                </div>
              ))}
            </div>

            {/* Floating elements around subjects */}
            <div className="absolute -top-4 -left-4 text-2xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
              ⭐
            </div>
            <div className="absolute -top-2 -right-6 text-xl animate-pulse" style={{ animationDelay: '1s' }}>
              🎯
            </div>
            <div className="absolute -bottom-4 -left-2 text-lg animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
              💡
            </div>
            <div className="absolute -bottom-2 -right-4 text-2xl animate-spin" style={{ animationDuration: '4s' }}>
              🏆
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Scroll</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;