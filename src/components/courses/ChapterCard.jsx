import React, { useState } from 'react';

const ChapterCard = ({ 
  chapter,
  isSelected = false,
  isCompleted = false,
  onSelect,
  showProgress = true,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    id,
    title,
    subject,
    description,
    duration,
    difficulty,
    topics = [],
    resources = {},
    progress = 0
  } = chapter;

  const difficultyConfig = {
    easy: { color: 'from-green-400 to-green-600', icon: '😊', label: 'Easy' },
    medium: { color: 'from-yellow-400 to-orange-500', icon: '🤔', label: 'Medium' },
    hard: { color: 'from-red-400 to-red-600', icon: '😤', label: 'Hard' }
  };

  const subjectColors = {
    'Mathematics': 'from-blue-500 to-cyan-500',
    'Science': 'from-green-500 to-emerald-500',
    'Physics': 'from-purple-500 to-indigo-500',
    'Chemistry': 'from-orange-500 to-red-500',
    'Biology': 'from-teal-500 to-green-500',
    'English': 'from-pink-500 to-rose-500',
    'Hindi': 'from-amber-500 to-yellow-500',
    'Social Science': 'from-indigo-500 to-purple-500',
    'History': 'from-brown-400 to-amber-600',
    'Geography': 'from-emerald-500 to-teal-500',
    'Civics': 'from-blue-600 to-indigo-600',
    'Economics': 'from-green-600 to-emerald-600'
  };

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

  const currentDifficulty = difficultyConfig[difficulty] || difficultyConfig.medium;
  const subjectGradient = subjectColors[subject] || 'from-gray-500 to-gray-600';
  const subjectIcon = subjectIcons[subject] || '📖';

  const resourceCount = {
    notes: resources.notes ? 1 : 0,
    lectures: resources.lectures ? resources.lectures.length : 0,
    dpp: resources.dpp ? 1 : 0,
    total: 0
  };
  resourceCount.total = resourceCount.notes + resourceCount.lectures + resourceCount.dpp;

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 cursor-pointer border-2 overflow-hidden ${
        isSelected 
          ? 'border-blue-500 dark:border-blue-400 scale-105 shadow-blue-200 dark:shadow-blue-800' 
          : 'border-gray-200 dark:border-gray-700 hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-600'
      } ${className}`}
      onClick={() => onSelect && onSelect(chapter)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion Status Indicator */}
      {isCompleted && (
        <div className="absolute top-4 right-4 z-20">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-sm">✓</span>
          </div>
        </div>
      )}

      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${subjectGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Header Section */}
      <div className="relative p-6 pb-4">
        {/* Subject Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center space-x-2 px-3 py-1 bg-gradient-to-r ${subjectGradient} text-white rounded-full text-sm font-semibold shadow-md`}>
            <span>{subjectIcon}</span>
            <span>{subject}</span>
          </div>
          
          {/* Difficulty Badge */}
          <div className={`flex items-center space-x-1 px-3 py-1 bg-gradient-to-r ${currentDifficulty.color} text-white rounded-full text-xs font-semibold`}>
            <span>{currentDifficulty.icon}</span>
            <span>{currentDifficulty.label}</span>
          </div>
        </div>

        {/* Chapter Title */}
        <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${subjectGradient} group-hover:bg-clip-text transition-all duration-300`}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Chapter Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>⏱️</span>
              <span>{duration}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span>📊</span>
              <span>{topics.length} topics</span>
            </span>
          </div>
        </div>
      </div>

      {/* Topics Preview */}
      {topics.length > 0 && (
        <div className="px-6 pb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            📋 Key Topics:
          </h4>
          <div className="space-y-2">
            {topics.slice(0, 3).map((topic, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>{topic}</span>
              </div>
            ))}
            {topics.length > 3 && (
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                +{topics.length - 3} more topics
              </div>
            )}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {showProgress && progress > 0 && (
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${subjectGradient} rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Resources Summary */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-3">
          {/* Notes */}
          <div className={`text-center p-3 rounded-xl transition-all duration-300 ${
            resources.notes 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
          }`}>
            <div className="text-lg mb-1">📝</div>
            <div className="text-xs font-semibold">Notes</div>
            {resources.notes && (
              <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>
            )}
          </div>

          {/* Lectures */}
          <div className={`text-center p-3 rounded-xl transition-all duration-300 ${
            resourceCount.lectures > 0 
              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
              : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
          }`}>
            <div className="text-lg mb-1">🎥</div>
            <div className="text-xs font-semibold">
              Lectures ({resourceCount.lectures})
            </div>
            {resourceCount.lectures > 0 && (
              <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>
            )}
          </div>

          {/* DPP */}
          <div className={`text-center p-3 rounded-xl transition-all duration-300 ${
            resources.dpp 
              ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
              : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
          }`}>
            <div className="text-lg mb-1">📋</div>
            <div className="text-xs font-semibold">DPP</div>
            {resources.dpp && (
              <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>
            )}
          </div>
        </div>
      </div>

      {/* Hover Actions */}
      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-r ${subjectGradient} text-white p-4 transform transition-all duration-300 ${
        isHovered || isSelected ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">
            {isCompleted ? 'Review Chapter' : 'Start Learning'}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              {resourceCount.total} resources
            </span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </div>

      {/* Selection Border Effect */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-400 rounded-2xl pointer-events-none">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default ChapterCard;