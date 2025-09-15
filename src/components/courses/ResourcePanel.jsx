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
      className={`p-4 rounded-lg border transition-all duration-200 ${
        isAvailable 
          ? `cursor-pointer hover:shadow-md border-${color}-200 bg-${color}-50 dark:bg-${color}-900/20 hover:border-${color}-300`
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
      }`}
      onClick={() => isAvailable && handleResourceClick(url, type)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            isAvailable ? `bg-${color}-100 dark:bg-${color}-900/40` : 'bg-gray-200 dark:bg-gray-700'
          }`}>
            <Icon className={`h-5 w-5 ${
              isAvailable ? `text-${color}-600 dark:text-${color}-400` : 'text-gray-400'
            }`} />
          </div>
          
          <div className="flex-1">
            <h4 className={`font-medium ${isAvailable ? '' : 'text-gray-400'}`}>
              {title}
            </h4>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isAvailable ? description : 'Not available yet'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {loadingResource === type ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          ) : isAvailable ? (
            <>
              <span className={`text-xs font-medium text-${color}-600 dark:text-${color}-400`}>
                Available
              </span>
              <ExternalLink className={`h-4 w-4 text-${color}-500`} />
            </>
          ) : (
            <span className="text-xs text-gray-400">Coming Soon</span>
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
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{chapter.title}</h2>
          <div className="flex items-center space-x-4 mt-2">
            {chapter.subject && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}>
                {chapter.subject}
              </span>
            )}
            <span className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Study Material</span>
            </span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className={`p-2 rounded-lg transition-colors ${
            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Description */}
      <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {chapter.description}
        </p>
      </div>

      {/* Resources */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
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
        <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${
          darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
        } mb-6`}>
          <h4 className={`font-semibold mb-3 flex items-center space-x-2 ${
            darkMode ? 'text-orange-200' : 'text-orange-800'
          }`}>
            <Target className="h-5 w-5" />
            <span>Board Exam Tips</span>
          </h4>
          <ul className={`space-y-2 text-sm ${
            darkMode ? 'text-orange-300' : 'text-orange-700'
          }`}>
            {examTips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Study Progress */}
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h4 className="font-medium mb-3 flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>Study Progress</span>
        </h4>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className={`text-lg font-bold ${
              chapter.notesLink ? 'text-green-500' : 'text-gray-400'
            }`}>
              {chapter.notesLink ? '✓' : '○'}
            </div>
            <div className="text-xs text-gray-500">Notes</div>
          </div>
          
          <div>
            <div className={`text-lg font-bold ${
              chapter.dppLink ? 'text-blue-500' : 'text-gray-400'
            }`}>
              {chapter.dppLink ? '✓' : '○'}
            </div>
            <div className="text-xs text-gray-500">Practice</div>
          </div>
          
          <div>
            <div className={`text-lg font-bold ${
              chapter.lectureLink ? 'text-red-500' : 'text-gray-400'
            }`}>
              {chapter.lectureLink ? '✓' : '○'}
            </div>
            <div className="text-xs text-gray-500">Video</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-6 pt-4 border-t ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between text-sm text-gray-500">
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
