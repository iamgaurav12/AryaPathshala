import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, Star, Play, FileText, PenTool } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Comprehensive Notes",
      description: "Detailed study materials for every chapter",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Play className="h-6 w-6" />,
      title: "Video Lectures",
      description: "Interactive YouTube lectures with expert explanations",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Daily Practice Papers",
      description: "DPPs to enhance your problem-solving skills",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Quality Education",
      description: "Prepared by experienced educators",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const stats = [
    { number: "2", label: "Classes", suffix: "" },
    { number: "50+", label: "Study Materials", suffix: "" },
    { number: "500+", label: "Practice Questions", suffix: "" },
    { number: "24/7", label: "Access", suffix: "" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with team photo effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_black_20.5%,_transparent_21%)_0_0/16px_16px] opacity-5"></div>
        </div>

        {/* Premium Logo Section */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[32rem] h-[32rem] flex items-center justify-center">
            {/* Multi-layered background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute inset-8 bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            
            {/* Rotating border effect */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-spin-slow"></div>
            
            {/* Premium glass container */}
            <div className="group relative w-80 h-80">
              {/* Outer glow and glass effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              
              {/* Main logo container with enhanced glass effect */}
              <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/10 dark:to-gray-800/5 backdrop-blur-xl rounded-full p-5 shadow-[0_0_25px_rgba(49,120,198,0.3)] group-hover:shadow-[0_0_40px_rgba(49,120,198,0.5)] border border-white/20 dark:border-white/10 transition-all duration-700">
                {/* Inner container with gradient overlay */}
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-800/50 p-2 group-hover:p-1 transition-all duration-500">
                  {/* Logo image with enhanced effects */}
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 group-hover:opacity-0 transition-opacity duration-700"></div>
                    <img 
                      src="/logo_arya.jpg" 
                      alt="Arya Pathshala Logo" 
                      className="w-full h-full object-contain rounded-full transform group-hover:scale-110 transition-all duration-700 filter brightness-105 contrast-105"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -top-8 -left-8 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-float opacity-80 backdrop-blur-sm shadow-lg"></div>
            <div className="absolute -bottom-10 -right-10 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-float-delayed opacity-80 backdrop-blur-sm shadow-lg" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -left-12 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-slow opacity-80 backdrop-blur-sm shadow-lg" style={{ animationDelay: '1s' }}></div>
            
            {/* Subtle sparkle effects */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-ping-slow"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white rounded-full animate-ping-slow" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Add required animation classes to global styles */}
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes ping-slow {
            0% { transform: scale(1); opacity: 1; }
            75%, 100% { transform: scale(2); opacity: 0; }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 6s ease-in-out 2s infinite;
          }
          .animate-float-slow {
            animation: float 8s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-ping-slow {
            animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>

        {/* Content */}
        <div className={`relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
              <span className="gradient-text">Arya</span>
              <br />
              <span className="text-gray-800 dark:text-white">Pathshala</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Your gateway to academic excellence. Comprehensive study materials, 
              engaging lectures, and daily practice for Class 9 & 10 students.
            </p>
          </div>

          {/* Course Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            <Link 
              to="/class9" 
              className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  Class 9
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Foundation building with comprehensive study materials
                </p>
                <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400 font-medium">
                  <span>Start Learning</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            <Link 
              to="/class10" 
              className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  Class 10
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Board exam preparation with advanced concepts
                </p>
                <div className="flex items-center justify-center space-x-2 text-purple-600 dark:text-purple-400 font-medium">
                  <span>Start Learning</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="gradient-text">Arya Pathshala?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
             💙 Because Arya Pathshala Gives You Wings 💙
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]  dark:bg-[radial-gradient(circle_500px_at_50%_200px,#1d4ed8,transparent)] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our <span className="gradient-text">Expert Teachers</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn from our experienced educators dedicated to your academic success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Navneet Bhaiya", image: "navneet.jpg", role: "Mathematics Expert", experience: "4+ Years Experience" },
              { name: "Pavan Bhaiya", image: "pavan.jpg", role: "English Expert", experience: "12+ Years Experience" },
              { name: "Prem Bhaiya", image: "prem.jpg", role: "Biology(Science) Specialist", experience: "10+ Years Experience" },
              { name: "Vaibhav Bhaiya", image: "vaibhav.jpg", role: "Physics(Science) Specialist", experience: "5+ Years Experience" },
              { name: "Gaurav Bhaiya", image: "gaurav.jpg", role: "Chemistry(Science) Specialist", experience: "5+ Years Experience" },
              { name: "Soni Di", image: "sonya.jpg", role: "Biology Expert", experience: "9+ Years Experience" },
            ].map((teacher, index) => (
              <div 
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>
                
                {/* Teacher Image Container */}
                <div className="relative mb-6">
                  <div className="relative h-[280px] w-full">
                    <img
                      src={`/${teacher.image}`}
                      alt={teacher.name}
                      className="w-full h-full object-cover object-center rounded-full transform hover:scale-105 transition-transform duration-300"
                      style={{
                        maxWidth: '280px',
                        margin: '0 auto'
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="relative text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {teacher.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {teacher.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {teacher.experience}
                  </p>

                  {/* Hover effect decorative elements */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  );
};

export default Home;