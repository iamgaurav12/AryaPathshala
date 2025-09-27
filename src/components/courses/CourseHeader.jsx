// src/components/courses/CourseHeader.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp,
  Target,
  Star
} from 'lucide-react';

const CourseHeader = ({ 
  title, 
  description, 
  totalChapters = 0, 
  isBoard = false 
}) => {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: BookOpen,
      label: 'Comprehensive Notes',
      description: 'Detailed study material'
    },
    {
      icon: Target,
      label: 'Practice Problems',
      description: 'Daily practice sets'
    },
    {
      icon: TrendingUp,
      label: 'Video Lectures',
      description: 'Expert explanations'
    }
  ];

  return (
    <div className={`${darkMode ? 'bg-gradient-dark' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute transform rotate-12 -top-8 -right-8">
          <div className="grid grid-cols-8 gap-4">
            {[...Array(64)].map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded ${darkMode ? 'bg-accent-muted' : 'bg-blue-300'}`}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-full ${
                darkMode ? 'bg-dark-tertiary border border-accent-primary' : 'bg-blue-100'
              }`}>
                <BookOpen className={`h-8 w-8 ${darkMode ? 'text-accent-primary' : 'text-blue-500'}`} />
              </div>
              
              {isBoard && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-accent-primary text-inverse' : 'bg-orange-100 text-orange-700'
                }`}>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>Board Exam</span>
                  </div>
                </div>
              )}
            </div>

            <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${
              darkMode ? 'text-primary' : 'text-gray-900'
            }`}>
              {title}
              <span className={`${darkMode ? 'text-accent-primary' : 'text-blue-500'}`}>.</span>
            </h1>
            
            <p className={`text-xl mb-6 ${
              darkMode ? 'text-secondary' : 'text-gray-700'
            }`}>
              {description}
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <BookOpen className={`h-5 w-5 ${darkMode ? 'text-accent-primary' : 'text-blue-500'}`} />
                <span className={`font-semibold ${darkMode ? 'text-primary' : 'text-gray-900'}`}>
                  {totalChapters}
                </span>
                <span className={`${darkMode ? 'text-muted' : 'text-gray-600'}`}>
                  Chapters
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className={`h-5 w-5 ${darkMode ? 'text-accent-secondary' : 'text-green-500'}`} />
                <span className={`font-semibold ${darkMode ? 'text-primary' : 'text-gray-900'}`}>
                  400+
                </span>
                <span className={`${darkMode ? 'text-muted' : 'text-gray-600'}`}>
                  Students
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Star className={`h-5 w-5 ${darkMode ? 'text-accent-primary' : 'text-yellow-500'}`} />
                <span className={`font-semibold ${darkMode ? 'text-primary' : 'text-gray-900'}`}>
                  4.8
                </span>
                <span className={`${darkMode ? 'text-muted' : 'text-gray-600'}`}>
                  Rating
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 ${
                darkMode 
                  ? 'bg-accent-primary hover:bg-accent-hover text-inverse shadow-accent' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}>
                <BookOpen className="h-5 w-5" />
                <span>Start Learning</span>
              </button>
              
              <button className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-200 ${
                darkMode 
                  ? 'border-primary text-primary hover:bg-dark-quaternary hover:border-accent-primary' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                View Curriculum
              </button>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold mb-6 ${
              darkMode ? 'text-primary' : 'text-gray-900'
            }`}>
              What You'll Get:
            </h3>
            
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 ${
                  darkMode ? 'bg-dark-tertiary/80 backdrop-blur border border-primary hover:border-accent-primary' : 'bg-white/80 backdrop-blur'
                }`}
              >
                <div className={`p-3 rounded-full ${
                  darkMode ? 'bg-dark-secondary border border-accent-primary' : 'bg-blue-100'
                }`}>
                  <feature.icon className={`h-6 w-6 ${darkMode ? 'text-accent-primary' : 'text-blue-500'}`} />
                </div>
                
                <div>
                  <h4 className={`font-semibold ${
                    darkMode ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {feature.label}
                  </h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-muted' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Special message for board classes */}
            {isBoard && (
              <div className={`mt-6 p-4 rounded-lg border-l-4 transition-all duration-200 ${
                darkMode 
                  ? 'border-accent-primary bg-dark-tertiary/50' 
                  : 'border-orange-500 bg-orange-50'
              }`}>
                <div className="flex items-start space-x-3">
                  <Award className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                    darkMode ? 'text-accent-primary' : 'text-orange-500'
                  }`} />
                  <div>
                    <h4 className={`font-medium ${
                      darkMode ? 'text-accent-primary' : 'text-orange-800'
                    }`}>
                      Board Exam Ready
                    </h4>
                    <p className={`text-sm mt-1 ${
                      darkMode ? 'text-secondary' : 'text-orange-700'
                    }`}>
                      Complete preparation material aligned with the latest CBSE curriculum and exam pattern.
                    </p>
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