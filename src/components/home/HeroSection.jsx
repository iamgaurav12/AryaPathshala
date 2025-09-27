import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const heroTexts = ["Master Class 9th & 10th", "Ace Your Board Exams", "Learn with Excellence", "Achieve Your Dreams"];

  useEffect(() => {
    const interval = setInterval(() => setCurrentText(prev => (prev + 1) % heroTexts.length), 3000);
    return () => clearInterval(interval);
  }, [heroTexts.length]);

  const scrollToSection = (sectionId) => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-500 rounded-full opacity-10 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-600 rotate-45 opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-yellow-500 rounded-lg opacity-10 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-20 right-32 w-12 h-12 bg-yellow-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '2s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-yellow-600/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">Welcome to</span>
              <br />
              <span className="text-white">AryaPathshala</span>
            </h1>
            <div className="h-16 flex items-center justify-center lg:justify-start">
              <div className="text-2xl md:text-3xl font-semibold text-gray-300 w-full relative">
                {heroTexts.map((text, index) => (
                  <span key={index} className={`absolute w-full left-0 transition-all duration-500 ${index === currentText ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>{text}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Transform your academic journey with our platform for <span className="font-semibold text-yellow-400">Class 9th & 10th students</span>. Access premium video lectures, notes, and practice papers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={() => scrollToSection('courses')} className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl font-semibold text-lg shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:shadow-yellow-400/50 transform hover:-translate-y-1 transition-all duration-300">
              Start Learning 🚀
            </button>
            <button onClick={() => scrollToSection('about')} className="px-8 py-4 border-2 border-gray-700 text-gray-300 rounded-xl font-semibold text-lg hover:bg-black hover:border-yellow-400/50 hover:text-yellow-400 transform hover:-translate-y-1 transition-all duration-300">
              Learn More 📚
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Scroll</p>
      </div>
    </section>
  );
};

export default HeroSection;
