import React from 'react';
import { BookOpen, FileText, Video, ExternalLink, CheckCircle, Circle } from 'lucide-react';

const ChapterCard = ({ chapter, isSelected, onClick, showProgress = false, completionRate = 0 }) => {
  const hasNotes = !!chapter.notesLink;
  const hasDpp = !!chapter.dppLink;
  const hasLecture = !!chapter.lectureLink;
  const resourceCount = [hasNotes, hasDpp, hasLecture].filter(Boolean).length;

  const getProgressColor = () => {
    if (completionRate === 100) return 'text-green-400';
    if (completionRate > 50) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getProgressBgColor = () => {
    if (completionRate === 100) return 'bg-green-400';
    if (completionRate > 50) return 'bg-yellow-500';
    return 'bg-red-400';
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-xl ${
        isSelected ? 'border-yellow-500 bg-black shadow-lg shadow-yellow-500/20' : 'border-gray-800 hover:border-gray-700 hover:bg-black/50'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg mb-1 transition-colors ${isSelected ? 'text-yellow-400' : 'text-white'}`}>{chapter.title}</h3>
          {chapter.subject && <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-black text-gray-400 border border-gray-700">{chapter.subject}</span>}
        </div>
        {showProgress && (
          <div className="flex items-center space-x-2 ml-4">
            <div className={`text-sm font-medium ${getProgressColor()}`}>{completionRate}%</div>
            {completionRate === 100 ? <CheckCircle className="h-5 w-5 text-green-400" /> : <Circle className="h-5 w-5 text-gray-600" />}
          </div>
        )}
      </div>

      <p className="text-sm mb-4 line-clamp-2 text-gray-400">{chapter.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-1 transition-colors ${hasNotes ? 'text-green-400' : 'text-gray-600'}`}>
            <FileText className="h-4 w-4" />
            <span className="text-xs font-medium">Notes</span>
          </div>
          <div className={`flex items-center space-x-1 transition-colors ${hasDpp ? 'text-yellow-400' : 'text-gray-600'}`}>
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium">DPP</span>
          </div>
          <div className={`flex items-center space-x-1 transition-colors ${hasLecture ? 'text-red-400' : 'text-gray-600'}`}>
            <Video className="h-4 w-4" />
            <span className="text-xs font-medium">Video</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">{resourceCount}/3 resources</span>
          {resourceCount > 0 && <ExternalLink className="h-3 w-3 text-yellow-600 hover:text-yellow-400 transition-colors" />}
        </div>
      </div>

      {showProgress && (
        <div className="mt-3 pt-3 border-t border-gray-800">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Completion</span>
          </div>
          <div className="w-full bg-black rounded-full h-2"><div className={`h-2 rounded-full transition-all duration-300 ${getProgressBgColor()}`} style={{ width: `${completionRate}%` }}></div></div>
        </div>
      )}

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-yellow-500/30">
          <p className="text-xs text-yellow-400 font-medium animate-pulse">Click on resources below to access materials →</p>
        </div>
      )}
    </div>
  );
};

export default ChapterCard;
