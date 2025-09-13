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
  Clock,
  Star
} from 'lucide-react';

const Class10 = () => {
  const { getAllChapters, lastUpdated } = useData();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapters, setChapters] = useState([]);

  // Update chapters when data changes
  useEffect(() => {
    const updatedChapters = getAllChapters('class10') || [];
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6">
            <Star className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Class 10 Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Advanced study materials and comprehensive lectures for Class 10 students
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
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600' 
                            : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <button
                          onClick={() => handleChapterClick(chapter.id)}
                          className="w-full p-4 text-left flex items-center justify-between"
                        >
                          <div className="flex items-center flex-1">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
                              <div className="flex items-center mt-2 space-x-4">
                                <div className="flex items-center space-x-1">
                                  {chapter.resources?.notes && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" title="Notes available"></div>
                                  )}
                                  {chapter.resources?.lecture && (
                                    <div className="w-2 h-2 bg-red-500 rounded-full" title="Lecture available"></div>
                                  )}
                                  {chapter.resources?.dpp && (
                                    <div className="w-2 h-2 bg-green-500 rounded-full" title="DPP available"></div>
                                  )}
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {[chapter.resources?.notes, chapter.resources?.lecture, chapter.resources?.dpp].filter(Boolean).length} resources
                                </span>
                              </div>
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
                        <div className="flex items-center mt-3 space-x-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Available resources:</span>
                          <div className="flex space-x-2">
                            {chapter.resources?.notes && (
                              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                                Notes
                              </span>
                            )}
                            {chapter.resources?.lecture && (
                              <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs">
                                Lecture
                              </span>
                            )}
                            {chapter.resources?.dpp && (
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                                DPP
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="space-y-6">
                          {/* Notes */}
                          <div className="group">
                            <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                              chapter.resources?.notes 
                                ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 hover:shadow-md cursor-pointer' 
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
                                    Comprehensive notes covering all important topics and concepts for board exam preparation
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
                                  Study notes not available for this chapter yet
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Lecture */}
                          <div className="group">
                            <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                              chapter.resources?.lecture 
                                ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 hover:shadow-md cursor-pointer' 
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
                                    In-depth video explanation with solved examples and board exam strategies
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
                                  Video lecture not available for this chapter yet
                                </p>
                              )}
                            </div>
                          </div>

                          {/* DPP */}
                          <div className="group">
                            <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                              chapter.resources?.dpp 
                                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 hover:shadow-md cursor-pointer' 
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
                                    Board exam pattern questions with detailed solutions for thorough practice
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
                                  Practice problems not available for this chapter yet
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Study Tips */}
                        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                            💡 Study Tip for Class 10
                          </h5>
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            Focus on understanding concepts deeply as Class 10 forms the foundation for higher studies. 
                            Practice regularly and solve previous year questions for board exam success.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a Chapter
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a chapter from the list to access comprehensive study materials including notes, video lectures, and practice problems designed for Class 10 board exam preparation.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Study Notes</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <Video className="h-5 w-5 text-red-600 dark:text-red-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Video Lectures</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Practice Problems</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class10;