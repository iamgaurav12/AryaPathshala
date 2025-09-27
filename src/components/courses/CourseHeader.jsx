import React from 'react';
import { BookOpen, Users, Award, TrendingUp, Target, Star } from 'lucide-react';

const CourseHeader = ({ title, description, totalChapters = 0, isBoard = false }) => {
  const features = [
    { icon: BookOpen, label: 'Comprehensive Notes', description: 'Detailed study material' },
    { icon: Target, label: 'Practice Problems', description: 'Daily practice sets' },
    { icon: TrendingUp, label: 'Video Lectures', description: 'Expert explanations' }
  ];

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute transform rotate-12 -top-8 -right-8">
          <div className="grid grid-cols-8 gap-4">
            {[...Array(64)].map((_, i) => <div key={i} className="w-4 h-4 rounded bg-yellow-500/20"></div>)}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-black border border-yellow-500">
                <BookOpen className="h-8 w-8 text-yellow-400" />
              </div>
              {isBoard && (
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-black">
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>Board Exam</span>
                  </div>
                </div>
              )}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">{title}<span className="text-yellow-400">.</span></h1>
            <p className="text-xl mb-6 text-gray-300">{description}</p>
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold text-white">{totalChapters}</span>
                <span className="text-gray-400">Chapters</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-400" />
                <span className="font-semibold text-white">400+</span>
                <span className="text-gray-400">Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold text-white">4.8</span>
                <span className="text-gray-400">Rating</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/20">
                <BookOpen className="h-5 w-5" />
                <span>Start Learning</span>
              </button>
              <button className="px-6 py-3 border-2 rounded-lg font-medium transition-all duration-200 border-gray-700 text-white hover:bg-black/50 hover:border-yellow-500">
                View Curriculum
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6 text-white">What You'll Get:</h3>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 bg-black/80 backdrop-blur border border-gray-800 hover:border-yellow-500">
                <div className="p-3 rounded-full bg-gray-900 border border-yellow-500">
                  <feature.icon className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{feature.label}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
            {isBoard && (
              <div className="mt-6 p-4 rounded-lg border-l-4 transition-all duration-200 border-yellow-500 bg-black/50">
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 flex-shrink-0 mt-0.5 text-yellow-400" />
                  <div>
                    <h4 className="font-medium text-yellow-400">Board Exam Ready</h4>
                    <p className="text-sm mt-1 text-gray-300">Complete preparation material aligned with the latest CBSE curriculum and exam pattern.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
