import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  BookOpen, 
  FileText, 
  Video, 
  ExternalLink, 
  ChevronDown, 
  ChevronRight,
  Play,
  Download,
  Users,
  Clock
} from 'lucide-react';

const Class9 = () => {
  const { getAllChapters, lastUpdated } = useData();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapters, setChapters] = useState([]);

  // Update chapters when data changes
  useEffect(() => {
    const updatedChapters = getAllChapters('class9') || [];
    setChapters(updatedChapters);
  }, [getAllChapters, lastUpdated]);

  const handleChapterClick = (chapterId) => {
    setSelectedChapter(selectedChapter === chapterId ? null : chapterId);
  };

  const openYouTube = (url) => {
    if (!url) return;
    
    const confirmed = window.confirm(
      'This will open YouTube in a new tab. Do you want to continue?'
    );
    
    if (confirmed) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const openResource = (url, type) => {
    if (!url) return;
    
    if (type === 'lecture') {
      openYouTube(url);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Class 9 Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Comprehensive study materials and lectures for Class 9 students
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{chapters.length} Chapters</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Updated {new Date(lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chapters List */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Available Chapters
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Click on any chapter to view available resources
                </p>
              </div>
              
              <div className="p-6">
                {chapters.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No chapters available yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Chapters will appear here once they are added by the admin.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chapters.map((chapter, index) => (
                      <div
                        key={chapter.id}
                        className={`border border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-300 ${
                          selectedChapter === chapter.id 
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600' 
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <button
                          onClick={() => handleChapterClick(chapter.id)}
                          className="w-full p-4 text-left flex items-center justify-between"
                        >
                          <div className="flex items-center flex-1">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                {chapter.title}
                              </h3>
                              {chapter.description && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                  {chapter.description}
                                </p>
                              )}
                            </div>
                          </div>
                          {selectedChapter === chapter.id ? (
                            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resources Panel */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 sticky top-8">
              {selectedChapter ? (
                (() => {
                  const chapter = chapters.find(ch => ch.id === selectedChapter);
                  if (!chapter) return null;
                  
                  return (
                    <div>
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {chapter.title}
                        </h3>
                        {chapter.description && (
                          <p className="text-gray-600 dark:text-gray-400">
                            {chapter.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="space-y-6">
                          {/* Notes */}
                          <div className="group">
                            <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                              chapter.resources?.notes 
                                ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 hover:shadow-md' 
                                : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                            }`}>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                  <FileText className={`h-6 w-6 mr-3 ${
                                    chapter.resources?.notes 
                                      ? 'text-blue-600 dark:text-blue-400' 
                                      : 'text-gray-400'
                                  }`} />
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Study Notes
                                  </h4>
                                </div>
                                {chapter.resources?.notes && (
                                  <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                )}
                              </div>
                              
                              {chapter.resources?.notes ? (
                                <div>
                                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Download comprehensive notes for this chapter
                                  </p>
                                  <button
                                    onClick={() => openResource(chapter.resources.notes, 'notes')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                                  >
                                    <span>Download Notes</span>
                                    <ExternalLink className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                  Notes not available for this chapter yet
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Lecture */}
                          <div className="group">
                            <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                              chapter.resources?.lecture 
                                ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 hover:shadow-md' 
                                : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                            }`}>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                  <Video className={`h-6 w-6 mr-3 ${
                                    chapter.resources?.lecture 
                                      ? 'text-red-600 dark:text-red-400' 
                                      : 'text-gray-400'
                                  }`} />
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Video Lecture
                                  </h4>
                                </div>
                                {chapter.resources?.lecture && (
                                  <Play className="h-5 w-5 text-red-600 dark:text-red-400" />
                                )}
                              </div>
                              
                              {chapter.resources?.lecture ? (
                                <div>
                                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Watch detailed video explanation of this chapter
                                  </p>
                                  <button
                                    onClick={() => openResource(chapter.resources.lecture, 'lecture')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                                  >
                                    <span>Watch Lecture</span>
                                    <ExternalLink className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                  Lecture not available for this chapter yet
                                </p>
                              )}
                            </div>
                          </div>

                          {/* DPP */}
                          <div className="group">
                            <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                              chapter.resources?.dpp 
                                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 hover:shadow-md' 
                                : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                            }`}>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                  <BookOpen className={`h-6 w-6 mr-3 ${
                                    chapter.resources?.dpp 
                                      ? 'text-green-600 dark:text-green-400' 
                                      : 'text-gray-400'
                                  }`} />
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Daily Practice Problems (DPP)
                                  </h4>
                                </div>
                                {chapter.resources?.dpp && (
                                  <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
                                )}
                              </div>
                              
                              {chapter.resources?.dpp ? (
                                <div>
                                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Practice problems to reinforce your understanding
                                  </p>
                                  <button
                                    onClick={() => openResource(chapter.resources.dpp, 'dpp')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                                  >
                                    <span>Download DPP</span>
                                    <ExternalLink className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                  DPP not available for this chapter yet
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a Chapter
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a chapter from the list to view its resources including notes, lectures, and practice problems.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class9;