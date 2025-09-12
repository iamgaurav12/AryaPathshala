import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { BookOpen, Users, Award, ChevronRight, Star, Target, Heart } from 'lucide-react';

const Home = () => {
  const { isDark } = useTheme();

  const teamMembers = [
    { name: "Gaurav Sir", role: "Physics Expert", image: "/api/placeholder/150/150" },
    { name: "Priya Ma'am", role: "Chemistry Expert", image: "/api/placeholder/150/150" },
    { name: "Rajesh Sir", role: "Mathematics Expert", image: "/api/placeholder/150/150" },
    { name: "Anita Ma'am", role: "Biology Expert", image: "/api/placeholder/150/150" },
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Notes",
      description: "Detailed chapter-wise notes for better understanding"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Faculty",
      description: "Learn from experienced and qualified teachers"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Practice Papers",
      description: "Daily Practice Problems (DPP) for exam preparation"
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Hero Section with Team Photo Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Team Photo with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-blue-600/90 via-purple-600/80 to-pink-600/90 flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-30">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 mx-auto mb-4"></div>
                  <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                  <p className="text-white/80 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium">Premium Education Platform</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Arya<span className="text-yellow-400">Pathshala</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your trusted companion for Class 9th & 10th preparation with expert guidance, 
            comprehensive notes, and practice materials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center text-white/90">
              <Target className="w-5 h-5 mr-2 text-green-400" />
              <span>Board Exam Focused</span>
            </div>
            <div className="flex items-center text-white/90">
              <Heart className="w-5 h-5 mr-2 text-red-400" />
              <span>Student-Friendly Approach</span>
            </div>
          </div>

          {/* Course Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              to="/class9"
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl font-bold text-white mb-2">Class 9th</div>
                <p className="text-white/80 mb-4">Foundation building with comprehensive coverage</p>
                <div className="flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
                  <span className="font-semibold">Start Learning</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </Link>

            <Link
              to="/class10"
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl font-bold text-white mb-2">Class 10th</div>
                <p className="text-white/80 mb-4">Board exam preparation with expert guidance</p>
                <div className="flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
                  <span className="font-semibold">Start Learning</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>
              Why Choose AryaPathshala?
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              We provide everything you need to excel in your academic journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600 hover:border-blue-500'
                    : 'bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200 hover:border-blue-400'
                }`}
              >
                <div className={`inline-flex p-4 rounded-xl mb-6 ${
                  isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>
                  {feature.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>
              Meet Our Expert Team
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Dedicated professionals committed to your success
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`group text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                  isDark ? 'bg-gray-800/50 hover:bg-gray-700/50' : 'bg-white/70 hover:bg-white'
                } backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 group-hover:shadow-2xl transition-shadow duration-300"></div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>
                  {member.name}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Excel in Your Studies?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have achieved success with AryaPathshala
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/class9"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              Start with Class 9th
            </Link>
            <Link
              to="/class10"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Jump to Class 10th
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;