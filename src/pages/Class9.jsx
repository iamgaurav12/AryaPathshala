// src/pages/Class9.jsx
import React, { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useTheme } from '../hooks/useTheme';
import ChapterCard from '../components/courses/ChapterCard';
import ResourcePanel from '../components/courses/ResourcePanel';
import CourseHeader from '../components/courses/CourseHeader';
import Loading from '../components/common/Loading';
import { 
  BookOpen, 
  AlertCircle, 
  RefreshCw,
  Filter,
  Search,
  BarChart3,
  FileText,
  Video,
  BookMarked,
  X
} from 'lucide-react';

const Class9 = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  
  const { darkMode } = useTheme();
  const { 
    chapters, 
    loading, 
    error 
  } = useFirestore('class9');

  // Get unique subjects for filter
  const subjects = ['All', ...new Set(chapters.map(chapter => chapter.subject).filter(Boolean))];

  // Filter chapters based on search and subject
  const filteredChapters = chapters.filter(chapter => {
    const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chapter.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || chapter.subject === selectedSubject;
    const isActive = chapter.isActive !== false; // Show active chapters only
    
    return matchesSearch && matchesSubject && isActive;
  });

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(selectedChapter?.id === chapter.id ? null : chapter);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-dark-primary' : 'bg-gray-50'
      }`}>
        {/* Background Pattern */}
        {darkMode && (
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
            </div>
          </div>
        )}
        
        <div className="relative z-10 text-center max-w-md mx-auto p-6">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            darkMode 
              ? 'bg-red-500/20 shadow-lg' 
              : 'bg-red-100'
          }`}>
            <AlertCircle className={`h-10 w-10 ${
              darkMode ? 'text-red-400' : 'text-red-500'
            }`} />
          </div>
          
          <h2 className={`text-2xl font-bold mb-3 ${
            darkMode ? 'text-dark-primary' : 'text-gray-900'
          }`}>
            Oops! Something went wrong
          </h2>
          
          <p className={`mb-6 text-base ${
            darkMode ? 'text-dark-muted' : 'text-gray-600'
          }`}>
            We couldn't load the Class 9 chapters. Please try again.
          </p>
          
          <p className={`mb-6 text-sm ${
            darkMode ? 'text-dark-muted' : 'text-gray-500'
          }`}>
            Error: {error}
          </p>
          
          <button
            onClick={handleRefresh}
            className={`flex items-center space-x-3 mx-auto px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              darkMode
                ? 'bg-yellow-primary text-black hover:bg-yellow-hover shadow-yellow-glow hover:shadow-yellow-glow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <RefreshCw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      darkMode ? 'bg-dark-primary' : 'bg-gray-50'
    }`}>
      <CourseHeader 
        title="Class 9" 
        description="Complete study material for Class 9 students"
        totalChapters={filteredChapters.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter Section */}
        <div className={`mb-6 p-6 rounded-xl border transition-all duration-300 ${
          darkMode 
            ? 'bg-dark-card border-dark-primary shadow-dark-elevation' 
            : 'bg-white border-gray-200 shadow'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                darkMode ? 'text-dark-muted' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search chapters and topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent ${
                  darkMode 
                    ? 'border-dark-primary bg-dark-tertiary text-dark-primary placeholder-dark-muted focus:ring-yellow-primary hover:border-yellow-primary/50' 
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                }`}
              />
            </div>

            {/* Subject Filter */}
            <div className="relative min-w-[180px]">
              <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                darkMode ? 'text-dark-muted' : 'text-gray-400'
              }`} />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`w-full pl-10 pr-8 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent ${
                  darkMode 
                    ? 'border-dark-primary bg-dark-tertiary text-dark-primary focus:ring-yellow-primary hover:border-yellow-primary/50' 
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                }`}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedSubject !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSubject('All');
                }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-dark-tertiary hover:bg-dark-hover text-dark-primary border border-dark-primary hover:border-yellow-primary/50'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>

          {/* Results Info */}
          <div className={`mt-4 flex items-center justify-between text-sm ${
            darkMode ? 'text-dark-muted' : 'text-gray-600'
          }`}>
            <span>
              {filteredChapters.length === chapters.length 
                ? `Showing all ${chapters.length} chapters`
                : `Showing ${filteredChapters.length} of ${chapters.length} chapters`
              }
            </span>
            
            {selectedSubject !== 'All' && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                darkMode 
                  ? 'bg-yellow-primary/20 text-yellow-primary border border-yellow-primary/30' 
                  : 'bg-blue-100 text-blue-600 border border-blue-200'
              }`}>
                {selectedSubject}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapters List */}
          <div className={`lg:col-span-${selectedChapter ? '1' : '3'} transition-all duration-300`}>
            <div className={`rounded-xl border p-6 transition-all duration-300 ${
              darkMode 
                ? 'bg-dark-card border-dark-primary shadow-dark-elevation' 
                : 'bg-white border-gray-200 shadow'
            }`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-2 rounded-lg ${
                  darkMode 
                    ? 'bg-yellow-primary/20' 
                    : 'bg-blue-100'
                }`}>
                  <BookOpen className={`h-6 w-6 ${
                    darkMode ? 'text-yellow-primary' : 'text-blue-500'
                  }`} />
                </div>
                <h2 className={`text-xl font-semibold ${
                  darkMode ? 'text-dark-primary' : 'text-gray-900'
                }`}>
                  Chapters
                </h2>
              </div>

              {filteredChapters.length === 0 ? (
                <div className="text-center py-12">
                  <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                    darkMode 
                      ? 'bg-dark-tertiary' 
                      : 'bg-gray-100'
                  }`}>
                    <BookOpen className={`h-10 w-10 ${
                      darkMode ? 'text-dark-muted' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <h3 className={`text-lg font-medium mb-3 ${
                    darkMode ? 'text-dark-secondary' : 'text-gray-600'
                  }`}>
                    {chapters.length === 0 ? 'No chapters available yet' : 'No chapters match your search'}
                  </h3>
                  
                  <p className={`mb-6 ${
                    darkMode ? 'text-dark-muted' : 'text-gray-500'
                  }`}>
                    {chapters.length === 0 
                      ? 'New chapters will appear here once they are added by your instructors.'
                      : 'Try adjusting your search terms or filter criteria.'
                    }
                  </p>
                  
                  {searchTerm || selectedSubject !== 'All' ? (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedSubject('All');
                      }}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                        darkMode
                          ? 'bg-yellow-primary text-black hover:bg-yellow-hover shadow-yellow-glow'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Clear all filters
                    </button>
                  ) : null}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredChapters.map((chapter) => (
                    <ChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      isSelected={selectedChapter?.id === chapter.id}
                      onClick={() => handleChapterSelect(chapter)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resource Panel */}
          {selectedChapter && (
            <div className="lg:col-span-2">
              <ResourcePanel 
                chapter={selectedChapter}
                onClose={() => setSelectedChapter(null)}
              />
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {chapters.length > 0 && (
          <div className={`mt-8 p-6 rounded-xl border transition-all duration-300 ${
            darkMode 
              ? 'bg-dark-card border-dark-primary shadow-dark-elevation' 
              : 'bg-white border-gray-200 shadow'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-2 rounded-lg ${
                darkMode 
                  ? 'bg-yellow-primary/20' 
                  : 'bg-blue-100'
              }`}>
                <BarChart3 className={`h-6 w-6 ${
                  darkMode ? 'text-yellow-primary' : 'text-blue-500'
                }`} />
              </div>
              <h3 className={`text-lg font-semibold ${
                darkMode ? 'text-dark-primary' : 'text-gray-900'
              }`}>
                Course Statistics
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  darkMode ? 'text-yellow-primary' : 'text-blue-500'
                }`}>
                  {chapters.length}
                </div>
                <div className={`text-sm font-medium ${
                  darkMode ? 'text-dark-muted' : 'text-gray-600'
                }`}>
                  Total Chapters
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  darkMode ? 'text-yellow-secondary' : 'text-green-500'
                }`}>
                  {chapters.filter(c => c.notesLink).length}
                </div>
                <div className={`text-sm font-medium flex items-center justify-center space-x-1 ${
                  darkMode ? 'text-dark-muted' : 'text-gray-600'
                }`}>
                  <FileText className="h-3 w-3" />
                  <span>Notes Available</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  darkMode ? 'text-yellow-tertiary' : 'text-purple-500'
                }`}>
                  {chapters.filter(c => c.lectureLink).length}
                </div>
                <div className={`text-sm font-medium flex items-center justify-center space-x-1 ${
                  darkMode ? 'text-dark-muted' : 'text-gray-600'
                }`}>
                  <Video className="h-3 w-3" />
                  <span>Video Lectures</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  darkMode ? 'text-yellow-primary' : 'text-orange-500'
                }`}>
                  {chapters.filter(c => c.dppLink).length}
                </div>
                <div className={`text-sm font-medium flex items-center justify-center space-x-1 ${
                  darkMode ? 'text-dark-muted' : 'text-gray-600'
                }`}>
                  <BookMarked className="h-3 w-3" />
                  <span>DPP Available</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Class9;