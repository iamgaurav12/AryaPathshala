import React, { useState, useContext } from 'react';
import { 
  BookOpen, 
  FileText, 
  Play, 
  Download, 
  ExternalLink, 
  Clock, 
  Star,
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { DataContext } from '../../context/DataContext';
import Modal from '../common/Modal';

const ResourcePanel = ({ selectedChapter, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const { coursesData } = useContext(DataContext);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [loadingResource, setLoadingResource] = useState(null);

  if (!selectedChapter) return null;

  const handleLectureClick = () => {
    setShowLectureModal(true);
  };

  const handleConfirmLecture = () => {
    setLoadingResource('lecture');
    // Simulate loading
    setTimeout(() => {
      if (selectedChapter.lectureLink) {
        window.open(selectedChapter.lectureLink, '_blank');
      }
      setLoadingResource(null);
      setShowLectureModal(false);
    }, 1500);
  };

  const handleResourceClick = (type, link) => {
    if (!link) {
      alert(`${type} link is not available yet. Please check back later!`);
      return;
    }
    
    setLoadingResource(type);
    // Simulate loading
    setTimeout(() => {
      window.open(link, '_blank');
      setLoadingResource(null);
    }, 1000);
  };

  const ResourceButton = ({ icon: Icon, title, description, link, type, color, bgGradient }) => (
    <div className={`
      group relative overflow-hidden rounded-xl p-6 cursor-pointer
      transition-all duration-300 hover:scale-105 hover:shadow-xl
      ${theme === 'dark' 
        ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700' 
        : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-lg'
      }
    `}
    onClick={() => type === 'lecture' ? handleLectureClick() : handleResourceClick(title, link)}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${bgGradient}`} />
      
      {/* Loading Overlay */}
      {loadingResource === type && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
        </div>
      )}

      <div className="relative z-5">
        {/* Icon and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${color} ${theme === 'dark' ? 'bg-opacity-20' : 'bg-opacity-10'}`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          
          {link ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          )}
        </div>

        {/* Content */}
        <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${
            link 
              ? theme === 'dark' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-green-100 text-green-600'
              : theme === 'dark'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-yellow-100 text-yellow-600'
          }`}>
            {link ? 'Available' : 'Coming Soon'}
          </span>
          
          {type === 'lecture' ? (
            <Play className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
          ) : (
            <ExternalLink className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Panel */}
      <div className={`
        fixed right-0 top-0 h-full w-96 z-40 transform transition-transform duration-300
        ${theme === 'dark' 
          ? 'bg-gray-900 border-l border-gray-700' 
          : 'bg-gray-50 border-l border-gray-200'
        }
        shadow-2xl overflow-y-auto
      `}>
        {/* Header */}
        <div className={`
          sticky top-0 p-6 border-b z-10
          ${theme === 'dark' 
            ? 'bg-gray-900/95 backdrop-blur-sm border-gray-700' 
            : 'bg-gray-50/95 backdrop-blur-sm border-gray-200'
          }
        `}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Resources
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedChapter.name}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className={`
                p-2 rounded-full transition-colors
                ${theme === 'dark' 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Chapter Info Card */}
          <div className={`
            rounded-xl p-4 border
            ${theme === 'dark' 
              ? 'bg-gray-800/30 border-gray-700' 
              : 'bg-white border-gray-200'
            }
          `}>
            <div className="flex items-center space-x-3 mb-3">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Chapter Overview
              </h3>
            </div>
            
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedChapter.description || "Complete study material and practice problems for this chapter."}
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-green-500" />
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {selectedChapter.duration || "2-3 hours"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-blue-500" />
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {selectedChapter.students || "1000+"} students
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {selectedChapter.rating || "4.8"}
                </span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Study Materials
            </h3>

            {/* Notes */}
            <ResourceButton
              icon={FileText}
              title="Notes"
              description="Comprehensive chapter notes with key concepts, formulas, and examples"
              link={selectedChapter.notesLink}
              type="notes"
              color="bg-blue-500"
              bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
            />

            {/* DPP */}
            <ResourceButton
              icon={BookOpen}
              title="DPP"
              description="Daily Practice Problems to test your understanding and boost confidence"
              link={selectedChapter.dppLink}
              type="dpp"
              color="bg-green-500"
              bgGradient="bg-gradient-to-br from-green-500 to-green-600"
            />

            {/* Lecture */}
            <ResourceButton
              icon={Play}
              title="Lecture"
              description="Interactive video lecture explaining concepts with solved examples"
              link={selectedChapter.lectureLink}
              type="lecture"
              color="bg-red-500"
              bgGradient="bg-gradient-to-br from-red-500 to-red-600"
            />
          </div>

          {/* Study Tips */}
          <div className={`
            rounded-xl p-4 border
            ${theme === 'dark' 
              ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30' 
              : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
            }
          `}>
            <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              💡 Study Tips
            </h4>
            <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Watch the lecture first for concept clarity</li>
              <li>• Take notes while watching the video</li>
              <li>• Practice DPP problems daily</li>
              <li>• Revise notes before exams</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-30"
        onClick={onClose}
      />

      {/* Lecture Confirmation Modal */}
      <Modal 
        isOpen={showLectureModal} 
        onClose={() => setShowLectureModal(false)}
        title="Open Lecture Video"
      >
        <div className="p-6">
          <div className="text-center mb-6">
            <div className={`
              w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
              ${theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'}
            `}>
              <Play className="w-8 h-8 text-red-500" />
            </div>
            
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Open YouTube Lecture?
            </h3>
            
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              This will open the video lecture for "{selectedChapter.name}" in a new tab on YouTube.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowLectureModal(false)}
              className={`
                flex-1 py-2 px-4 rounded-lg border transition-colors
                ${theme === 'dark' 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              Cancel
            </button>
            
            <button
              onClick={handleConfirmLecture}
              disabled={loadingResource === 'lecture'}
              className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loadingResource === 'lecture' ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Opening...</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Video</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResourcePanel;