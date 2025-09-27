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
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-dark ${
        isSelected
          ? 'border-yellow-primary bg-dark-tertiary shadow-yellow'
          : 'border-primary hover:border-secondary hover:bg-dark-tertiary'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg mb-1 transition-colors duration-200 ${
            isSelected ? 'text-yellow-primary' : 'text-primary'
          }`}>
            {chapter.title}
          </h3>
          
          {chapter.subject && (
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-dark-quaternary text-tertiary border border-secondary">
              {chapter.subject}
            </span>
          )}
        </div>

        {/* Progress indicator for Class 10 */}
        {showProgress && (
          <div className="flex items-center space-x-2 ml-4">
            <div className={`text-sm font-medium ${
              completionRate === 100 ? 'text-green-400' : 
              completionRate > 50 ? 'text-yellow-primary' : 'text-red-400'
            }`}>
              {completionRate}%
            </div>
            {completionRate === 100 ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <Circle className="h-5 w-5 text-quaternary" />
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm mb-4 line-clamp-2 text-tertiary">
        {chapter.description}
      </p>

      {/* Resources */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Notes indicator */}
          <div className={`flex items-center space-x-1 transition-colors duration-200 ${
            hasNotes ? 'text-green-400' : 'text-quaternary'
          }`}>
            <FileText className="h-4 w-4" />
            <span className="text-xs font-medium">Notes</span>
          </div>

          {/* DPP indicator */}
          <div className={`flex items-center space-x-1 transition-colors duration-200 ${
            hasDpp ? 'text-yellow-primary' : 'text-quaternary'
          }`}>
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium">DPP</span>
          </div>

          {/* Lecture indicator */}
          <div className={`flex items-center space-x-1 transition-colors duration-200 ${
            hasLecture ? 'text-red-400' : 'text-quaternary'
          }`}>
            <Video className="h-4 w-4" />
            <span className="text-xs font-medium">Video</span>
          </div>
        </div>

        {/* Resource count and expand indicator */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-tertiary">
            {resourceCount}/3 resources
          </span>
          {resourceCount > 0 && (
            <ExternalLink className="h-3 w-3 text-yellow-muted hover:text-yellow-primary transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Progress bar for Class 10 */}
      {showProgress && (
        <div className="mt-3 pt-3 border-t border-primary">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-quaternary">Completion</span>
          </div>
          <div className="w-full bg-dark-quaternary rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                completionRate === 100 ? 'bg-green-400' :
                completionRate > 50 ? 'bg-yellow-primary' : 'bg-red-400'
              }`}
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-yellow-muted">
          <p className="text-xs text-yellow-primary font-medium animate-pulse">
            Click on resources below to access materials →
          </p>
        </div>
      )}
    </div>
  );
};

export default ChapterCard;