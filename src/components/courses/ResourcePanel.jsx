import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { 
  X, 
  FileText, 
  Video, 
  BookOpen,
  ExternalLink,
  Download,
  Play,
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

const ResourcePanel = ({ chapter, onClose, showExamTips = false }) => {
  const { darkMode } = useTheme();
  const [loadingResource, setLoadingResource] = useState(null);

  // ✅ Clean leading `a` or spaces in URL
  const cleanUrl = (val) => val?.trim().replace(/^ahttps/, 'https');

  const handleResourceClick = async (rawUrl, type) => {
    const url = cleanUrl(rawUrl);
    if (!url) return;

    setLoadingResource(type);

    // ✅ Correct YouTube detection
    if (
      type === 'lecture' &&
      (url.includes('youtube.com') || url.includes('youtu.be'))
    ) {
      const ok = window.confirm(
        'This will open YouTube in a new tab. Do you want to continue?'
      );
      if (!ok) {
        setLoadingResource(null);
        return;
      }
    }

    try {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
        setLoadingResource(null);
      }, 500);
    } catch (error) {
      console.error('Error opening resource:', error);
      setLoadingResource(null);
    }
  };

  const ResourceCard = ({ 
    title, 
    description, 
    url, 
    icon: Icon, 
    color, 
    type,
    isAvailable 
  }) => (
    <div 
      className={`p-4 rounded-lg border transition-all duration-200 transform hover:scale-[1.02] ${
        isAvailable 
          ? darkMode 
            ? 'cursor-pointer hover:shadow-dark border-primary bg-dark-tertiary hover:border-accent-primary hover:shadow-accent' 
            : `cursor-pointer hover:shadow-md border-${color}-200 bg-${color}-50 hover:border-${color}-300`
          : darkMode 
            ? 'border-primary bg-dark-secondary'
            : 'border-gray-200 bg-gray-50'
      }`}
      onClick={() => isAvailable && handleResourceClick(url, type)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            isAvailable 
              ? darkMode 
                ? 'bg-accent-primary/20 border border-accent-primary' 
                : `bg-${color}-100`
              : darkMode 
                ? 'bg-dark-quaternary' 
                : 'bg-gray-200'
          }`}>
            <Icon className={`h-5 w-5 ${
              isAvailable 
                ? darkMode 
                  ? 'text-accent-primary' 
                  : `text-${color}-600`
                : 'text-muted'
            }`} />
          </div>
          
          <div className="flex-1">
            <h4 className={`font-medium ${
              isAvailable 
                ? darkMode ? 'text-primary' : '' 
                : 'text-muted'
            }`}>
              {title}
            </h4>
            <p className={`text-sm ${
              darkMode ? 'text-muted' : 'text-gray-600'
            }`}>
              {isAvailable ? description : 'Not available yet'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {loadingResource === type ? (
            <div className={`animate-spin rounded-full h-4 w-4 border-2 border-t-transparent ${
              darkMode ? 'border-accent-primary' : 'border-blue-500'
            }`}></div>
          ) : isAvailable ? (
            <>
              <span className={`text-xs font-medium ${
                darkMode ? 'text-accent-primary' : `text-${color}-600`
              }`}>
                Available
              </span>
              <ExternalLink className={`h-4 w-4 ${
                darkMode ? 'text-accent-primary' : `text-${color}-500`
              }`} />
            </>
          ) : (
            <span className="text-xs text-muted">Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  );

  const examTips = [
    "Focus on understanding concepts rather than memorizing",
    "Practice previous year questions regularly",
    "Make short notes for quick revision",
    "Solve DPP questions daily for better understanding"
  ];

  return (
    <div className={`${darkMode ? 'bg-dark-tertiary shadow-dark-lg border border-primary' : 'bg-white shadow-lg'} rounded-lg p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-primary' : 'text-gray-900'}`}>
            {chapter.title}
          </h2>
          <div className="flex items-center space-x-4 mt-2">
            {chapter.subject && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                darkMode 
                  ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {chapter.subject}
              </span>
            )}
            <span className={`flex items-center space-x-1 text-sm ${
              darkMode ? 'text-muted' : 'text-gray-500'
            }`}>
              <Clock className="h-4 w-4" />
              <span>Study Material</span>
            </span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className={`p-2 rounded-lg transition-all duration-200 ${
            darkMode 
              ? 'hover:bg-dark-quaternary text-muted hover:text-accent-primary' 
              : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
          }`}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Description */}
      <div className={`p-4 rounded-lg mb-6 ${
        darkMode ? 'bg-dark-secondary border border-primary' : 'bg-gray-100'
      }`}>
        <p className={`${darkMode ? 'text-secondary' : 'text-gray-700'}`}>
          {chapter.description}
        </p>
      </div>

      {/* Resources */}
      <div className="space-y-4 mb-6">
        <h3 className={`text-lg font-semibold flex items-center space-x-2 ${
          darkMode ? 'text-primary' : 'text-gray-900'
        }`}>
          <BookOpen className={`h-5 w-5 ${darkMode ? 'text-accent-primary' : 'text-gray-700'}`} />
          <span>Study Resources</span>
        </h3>
        
        <div className="grid gap-4">
          <ResourceCard
            title="Study Notes"
            description="Comprehensive notes and theory explanations"
            url={chapter.notesLink}
            icon={FileText}
            color="green"
            type="notes"
            isAvailable={chapter.notesLink && chapter.notesLink.trim() !== ''}
          />
          
          <ResourceCard
            title="Daily Practice Problems (DPP)"
            description="Practice questions with detailed solutions"
            url={chapter.dppLink}
            icon={BookOpen}
            color="blue"
            type="dpp"
            isAvailable={chapter.dppLink && chapter.dppLink.trim() !== ''}
          />
          
          <ResourceCard
            title="Video Lecture"
            description="Detailed video explanation of concepts"
            url={chapter.lectureLink}
            icon={Video}
            color="red"
            type="lecture"
            isAvailable={chapter.lectureLink && chapter.lectureLink.trim() !== ''}
          />
        </div>
      </div>

      {/* Exam Tips (for Class 10) */}
      {showExamTips && (
        <div className={`p-4 rounded-lg border-l-4 mb-6 ${
          darkMode 
            ? 'border-accent-primary bg-accent-primary/10' 
            : 'border-orange-500 bg-orange-50'
        }`}>
          <h4 className={`font-semibold mb-3 flex items-center space-x-2 ${
            darkMode ? 'text-accent-primary' : 'text-orange-800'
          }`}>
            <Target className="h-5 w-5" />
            <span>Board Exam Tips</span>
          </h4>
          <ul className={`space-y-2 text-sm ${
            darkMode ? 'text-secondary' : 'text-orange-700'
          }`}>
            {examTips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                  darkMode ? 'text-accent-primary' : 'text-orange-600'
                }`} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Study Progress */}
      <div className={`p-4 rounded-lg ${
        darkMode ? 'bg-dark-secondary border border-primary' : 'bg-gray-100'
      }`}>
        <h4 className={`font-medium mb-3 flex items-center space-x-2 ${
          darkMode ? 'text-primary' : 'text-gray-900'
        }`}>
          <CheckCircle className={`h-5 w-5 ${
            darkMode ? 'text-accent-secondary' : 'text-green-500'
          }`} />
          <span>Study Progress</span>
        </h4>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className={`text-lg font-bold ${
              chapter.notesLink 
                ? darkMode ? 'text-accent-primary' : 'text-green-500'
                : 'text-muted'
            }`}>
              {chapter.notesLink ? '✓' : '○'}
            </div>
            <div className={`text-xs ${darkMode ? 'text-muted' : 'text-gray-500'}`}>
              Notes
            </div>
          </div>
          
          <div>
            <div className={`text-lg font-bold ${
              chapter.dppLink 
                ? darkMode ? 'text-accent-primary' : 'text-blue-500'
                : 'text-muted'
            }`}>
              {chapter.dppLink ? '✓' : '○'}
            </div>
            <div className={`text-xs ${darkMode ? 'text-muted' : 'text-gray-500'}`}>
              Practice
            </div>
          </div>
          
          <div>
            <div className={`text-lg font-bold ${
              chapter.lectureLink 
                ? darkMode ? 'text-accent-primary' : 'text-red-500'
                : 'text-muted'
            }`}>
              {chapter.lectureLink ? '✓' : '○'}
            </div>
            <div className={`text-xs ${darkMode ? 'text-muted' : 'text-gray-500'}`}>
              Video
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-6 pt-4 border-t ${
        darkMode ? 'border-primary' : 'border-gray-200'
      }`}>
        <div className={`flex items-center justify-between text-sm ${
          darkMode ? 'text-muted' : 'text-gray-500'
        }`}>
          <div className="flex items-center space-x-1">
            <AlertCircle className="h-4 w-4" />
            <span>Click on available resources to open them</span>
          </div>
          <span>Updated recently</span>
        </div>
      </div>
    </div>
  );
};

export default ResourcePanel;