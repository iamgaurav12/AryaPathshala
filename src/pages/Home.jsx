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
    { number: "500+", label: "Study Materials", suffix: "" },
    { number: "1000+", label: "Practice Questions", suffix: "" },
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

        {/* Team Photo Mockup */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
          <div className="relative">
            <div className="w-96 h-64 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl shadow-2xl transform rotate-3">
              <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                <Users className="h-24 w-24 text-gray-400" />
              </div>
            </div>
            {/* Floating elements around team photo */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce-gentle"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-400 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-purple-400 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

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
              We provide everything you need for academic success in one comprehensive platform
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Excel in Your Studies?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have improved their grades with our comprehensive study materials
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/class9" 
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start with Class 9
            </Link>
            <Link 
              to="/class10" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Jump to Class 10
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;