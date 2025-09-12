import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseHeader = ({ 
  courseTitle, 
  courseClass, 
  totalChapters, 
  completedChapters, 
  courseDescription,
  subjects = []
}) => {
  const navigate = useNavigate();
  
  const progressPercentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
  
  const courseStats = [
    { icon: '📚', label: 'Chapters', value: totalChapters, color: 'from-blue-500 to-cyan-500' },
    { icon: '✅', label: 'Completed', value: completedChapters, color: 'from-green-500 to-emerald-500' },
    { icon: '📈', label: 'Progress', value: `${progressPercentage}%`, color: 'from-purple-500 to-pink-500' },
    { icon: '⭐', label: 'Subjects', value: subjects.length, color: 'from-orange-500 to-red-500' }
  ];

  const subjectIcons = {
    'Mathematics': '🔢',
    'Science': '🧪', 
    'Physics': '⚛️',
    'Chemistry': '🧪',
    'Biology': '🧬',
    'English': '📚',
    'Hindi': '📖',
    'Social Science': '🌍',
    'History': '🏛️',
    'Geography': '🗺️',
    'Civics': '🏛️',
    'Economics': '💰'
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-blue-900/20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-700 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-700 rotate-45 opacity-20 animate-spin" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-pink-200 dark:bg-pink-700 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-700 dark:to-purple-700 opacity-10 rounded-lg transform rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Home
          </button>
          <span className="text-gray-400 dark:text-gray-500">→</span>
          <span className="text-gray-600 dark:text-gray-300 font-medium">{courseTitle}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Course Info - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Title */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg">
                  <span>🎓</span>
                  <span>{courseClass}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {'⭐'.repeat(5)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.9/5</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {courseTitle}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {courseDescription}
              </p>
            </div>

            {/* Subjects List */}
            {subjects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📚 Subjects Covered
                </h3>
                <div className="flex flex-wrap gap-3">
                  {subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                        {subjectIcons[subject] || '📖'}
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {subject}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  📈 Your Progress
                </h3>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {progressPercentage}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{completedChapters} of {totalChapters} chapters completed</span>
                <span>{totalChapters - completedChapters} remaining</span>
              </div>
            </div>
          </div>

          {/* Stats Cards - Right Side */}
          <div className="space-y-4">
            {courseStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <span>⚡</span>
                <span>Quick Actions</span>
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200 flex items-center space-x-3">
                  <span>📊</span>
                  <span className="font-medium">View Progress Report</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200 flex items-center space-x-3">
                  <span>⏰</span>
                  <span className="font-medium">Study Schedule</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors duration-200 flex items-center space-x-3">
                  <span>🎯</span>
                  <span className="font-medium">Take Mock Test</span>
                </button>
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center space-x-2">
                <span>💡</span>
                <span>Study Tip of the Day</span>
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
                "Review each chapter immediately after watching the lecture and solve at least 5 practice questions to reinforce your understanding."
              </p>
              <div className="mt-4 flex items-center space-x-2 text-xs text-green-600 dark:text-green-400">
                <span>✨</span>
                <span>Pro tip from our expert faculty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        {progressPercentage > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              🏆 Your Achievements
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {progressPercentage >= 25 && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-semibold shadow-lg">
                  <span>🌟</span>
                  <span>Getting Started</span>
                </div>
              )}
              {progressPercentage >= 50 && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full text-sm font-semibold shadow-lg">
                  <span>🚀</span>
                  <span>Halfway Hero</span>
                </div>
              )}
              {progressPercentage >= 75 && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full text-sm font-semibold shadow-lg">
                  <span>⭐</span>
                  <span>Almost There</span>
                </div>
              )}
              {progressPercentage >= 100 && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full text-sm font-semibold shadow-lg">
                  <span>🏆</span>
                  <span>Course Complete</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseHeader;