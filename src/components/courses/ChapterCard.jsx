// src/components/courses/ChapterCard.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { 
  BookOpen, 
  FileText, 
  Video, 
  ExternalLink,
  CheckCircle,
  Circle
} from 'lucide-react';

const ChapterCard = ({ 
  chapter, 
  isSelected, 
  onClick, 
  showProgress = false, 
  completionRate = 0 
}) => {
  const { darkMode } = useTheme();

  const hasNotes = chapter.notesLink && chapter.notesLink.trim() !== '';
  const hasDpp = chapter.dppLink && chapter.dppLink.trim() !== '';
  const hasLecture = chapter.lectureLink && chapter.lectureLink.trim() !== '';

  const resourceCount = [hasNotes, hasDpp, hasLecture].filter(Boolean).length;

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
          : darkMode
          ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg mb-1 ${
            isSelected ? 'text-blue-700 dark:text-blue-300' : ''
          }`}>
            {chapter.title}
          </h3>
          
          {chapter.subject && (
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              darkMode 
                ? 'bg-gray-700 text-gray-300' 
                : 'bg-gray-200 text-gray-700'
            }`}>
              {chapter.subject}
            </span>
          )}
        </div>

        {/* Progress indicator for Class 10 */}
        {showProgress && (
          <div className="flex items-center space-x-2 ml-4">
            <div className={`text-sm font-medium ${
              completionRate === 100 ? 'text-green-500' : 
              completionRate > 50 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {completionRate}%
            </div>
            {completionRate === 100 ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <p className={`text-sm mb-4 line-clamp-2 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {chapter.description}
      </p>

      {/* Resources */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Notes indicator */}
          <div className={`flex items-center space-x-1 ${
            hasNotes ? 'text-green-500' : 'text-gray-400'
          }`}>
            <FileText className="h-4 w-4" />
            <span className="text-xs">Notes</span>
          </div>

          {/* DPP indicator */}
          <div className={`flex items-center space-x-1 ${
            hasDpp ? 'text-blue-500' : 'text-gray-400'
          }`}>
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">DPP</span>
          </div>

          {/* Lecture indicator */}
          <div className={`flex items-center space-x-1 ${
            hasLecture ? 'text-red-500' : 'text-gray-400'
          }`}>
            <Video className="h-4 w-4" />
            <span className="text-xs">Video</span>
          </div>
        </div>

        {/* Resource count and expand indicator */}
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {resourceCount}/3 resources
          </span>
          {resourceCount > 0 && (
            <ExternalLink className="h-3 w-3 text-gray-400" />
          )}
        </div>
      </div>

      {/* Progress bar for Class 10 */}
      {showProgress && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Completion</span>
          </div>
          <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2`}>
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                completionRate === 100 ? 'bg-green-500' :
                completionRate > 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
            Click on resources below to access materials →
          </p>
        </div>
      )}
    </div>
  );
};

export default ChapterCard;