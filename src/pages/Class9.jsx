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
  Search
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
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Something went wrong
          </h2>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Error loading chapters: {error}
          </p>
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <CourseHeader 
        title="Class 9" 
        description="Complete study material for Class 9 students"
        totalChapters={filteredChapters.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter Section */}
        <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search chapters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode 
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>

            {/* Subject Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode 
                    ? 'border-gray-600 bg-gray-700 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className={`mt-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredChapters.length === chapters.length 
              ? `Showing all ${chapters.length} chapters`
              : `Showing ${filteredChapters.length} of ${chapters.length} chapters`
            }
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapters List */}
          <div className={`lg:col-span-${selectedChapter ? '1' : '3'} transition-all duration-300`}>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              <div className="flex items-center space-x-2 mb-6">
                <BookOpen className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold">Chapters</h2>
              </div>

              {filteredChapters.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {chapters.length === 0 ? 'No chapters available' : 'No chapters match your search'}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {chapters.length === 0 
                      ? 'Chapters will appear here once they are added.'
                      : 'Try adjusting your search or filter criteria.'
                    }
                  </p>
                  {searchTerm || selectedSubject !== 'All' ? (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedSubject('All');
                      }}
                      className="mt-4 px-4 py-2 text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Clear filters
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
          <div className={`mt-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <h3 className="text-lg font-semibold mb-4">Course Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{chapters.length}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {chapters.filter(c => c.notesLink).length}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Notes Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {chapters.filter(c => c.lectureLink).length}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Video Lectures</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">
                  {chapters.filter(c => c.dppLink).length}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>DPP Available</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Class9;