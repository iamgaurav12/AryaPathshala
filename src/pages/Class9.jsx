// src/pages/Class9.jsx
import React, { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
// import { useTheme } from '../hooks/useTheme'; // REMOVED
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
  
  // const { darkMode } = useTheme(); // REMOVED
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
    // NOTE: The separate Loading component should also use the black background
    return <Loading />;
  }

  if (error) {
    return (
      // 1. ERROR SCREEN BACKGROUND: Pure Black
      <div className={`min-h-screen flex items-center justify-center bg-black`}>
        {/* Background Pattern */}
        <div className="fixed inset-0 z-0">
          {/* Background Gradient: Black to Very Dark Grey */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0A0A0A] to-[#1A1A1A]" />
          {/* Yellow Glowing Blobs */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-15" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFC700] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000 opacity-10" />
          </div>
        </div>
        
        <div className="relative z-10 text-center max-w-md mx-auto p-6">
          <div 
            // Error Icon Container: Dark Red/Black
            className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-red-900/20 shadow-lg`}
          >
            {/* Error Icon: Red text */}
            <AlertCircle className={`h-10 w-10 text-red-400`} />
          </div>
          
          <h2 
            // Title Text: White
            className={`text-2xl font-bold mb-3 text-white`}
          >
            Oops! Something went wrong
          </h2>
          
          <p 
            // Muted Text: Gray-400
            className={`mb-6 text-base text-gray-400`}
          >
            We couldn't load the Class 9 chapters. Please try again.
          </p>
          
          <p 
            // Muted Text: Gray-500
            className={`mb-6 text-sm text-gray-500`}
          >
            Error: {error}
          </p>
          
          <button
            onClick={handleRefresh}
            // Button: Yellow background, black text, yellow shadow
            className={`flex items-center space-x-3 mx-auto px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 bg-[#FFD700] text-black hover:bg-[#FFE87C] shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]`}
          >
            <RefreshCw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    // 2. MAIN PAGE BACKGROUND: Pure Black
    <div className={`min-h-screen bg-black`}>
      <CourseHeader 
        title="Class 9" 
        description="Complete study material for Class 9 students"
        totalChapters={filteredChapters.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter Section */}
        <div 
          // 3. SEARCH CARD BACKGROUND: Very dark grey/near black, dark border
          className={`mb-6 p-6 rounded-xl border transition-all duration-300 bg-[#0A0A0A] border-[#1A1A1A] shadow-[0_4px_6px_rgba(0,0,0,0.5)]`}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search 
                // Search Icon: Gray-500
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500`} 
              />
              <input
                type="text"
                placeholder="Search chapters and topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // Input Fields: Dark background, light text, yellow focus ring
                className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent border-[#333333] bg-[#1A1A1A] text-white placeholder-gray-500 focus:ring-[#FFD700] hover:border-[#FFD700]/50`}
              />
            </div>

            {/* Subject Filter */}
            <div className="relative min-w-[180px]">
              <Filter 
                // Filter Icon: Gray-500
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500`} 
              />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                // Select Field: Dark background, light text, yellow focus ring
                className={`w-full pl-10 pr-8 py-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:border-transparent border-[#333333] bg-[#1A1A1A] text-white focus:ring-[#FFD700] hover:border-[#FFD700]/50`}
              >
                {subjects.map(subject => (
                  // Select options should use dark background for consistency
                  <option key={subject} value={subject} className="bg-black text-white">{subject}</option>
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
                // Clear Button: Dark background, light text, yellow hover
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 bg-[#1A1A1A] hover:bg-[#333333] text-white border border-[#333333] hover:border-[#FFD700]/50`}
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>

          {/* Results Info */}
          <div 
            // Info Text: Gray-400
            className={`mt-4 flex items-center justify-between text-sm text-gray-400`}
          >
            <span>
              {filteredChapters.length === chapters.length 
                ? `Showing all ${chapters.length} chapters`
                : `Showing ${filteredChapters.length} of ${chapters.length} chapters`
              }
            </span>
            
            {selectedSubject !== 'All' && (
              <span 
                // Subject Tag: Yellow on Dark
                className={`px-3 py-1 rounded-full text-xs font-medium bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30`}
              >
                {selectedSubject}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapters List */}
          <div className={`lg:col-span-${selectedChapter ? '1' : '3'} transition-all duration-300`}>
            <div 
              // Chapters List Card: Very dark grey/near black, dark border
              className={`rounded-xl border p-6 transition-all duration-300 bg-[#0A0A0A] border-[#1A1A1A] shadow-[0_4px_6px_rgba(0,0,0,0.5)]`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div 
                  // Icon container: Yellow on Dark
                  className={`p-2 rounded-lg bg-[#FFD700]/20`}
                >
                  {/* Icon: Yellow */}
                  <BookOpen className={`h-6 w-6 text-[#FFD700]`} />
                </div>
                <h2 
                  // Title: White
                  className={`text-xl font-semibold text-white`}
                >
                  Chapters
                </h2>
              </div>

              {filteredChapters.length === 0 ? (
                <div className="text-center py-12">
                  <div 
                    // No results icon container: Dark grey
                    className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#1A1A1A]`}
                  >
                    {/* No results icon: Gray-500 */}
                    <BookOpen className={`h-10 w-10 text-gray-500`} />
                  </div>
                  
                  <h3 
                    // No results title: Gray-300
                    className={`text-lg font-medium mb-3 text-gray-300`}
                  >
                    {chapters.length === 0 ? 'No chapters available yet' : 'No chapters match your search'}
                  </h3>
                  
                  <p 
                    // No results text: Gray-400
                    className={`mb-6 text-gray-400`}
                  >
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
                      // Clear Filters Button: Yellow background, black text, yellow shadow
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 bg-[#FFD700] text-black hover:bg-[#FFE87C] shadow-[0_0_15px_rgba(255,215,0,0.4)]`}
                    >
                      Clear all filters
                    </button>
                  ) : null}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredChapters.map((chapter) => (
                    // ChapterCard component needs to handle its own dark mode colors
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
                // ResourcePanel component needs to handle its own dark mode colors
              />
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {chapters.length > 0 && (
          <div 
            // Stats Card: Very dark grey/near black, dark border
            className={`mt-8 p-6 rounded-xl border transition-all duration-300 bg-[#0A0A0A] border-[#1A1A1A] shadow-[0_4px_6px_rgba(0,0,0,0.5)]`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div 
                // Icon Container: Yellow on Dark
                className={`p-2 rounded-lg bg-[#FFD700]/20`}
              >
                {/* Icon: Yellow */}
                <BarChart3 className={`h-6 w-6 text-[#FFD700]`} />
              </div>
              <h3 
                // Title: White
                className={`text-lg font-semibold text-white`}
              >
                Course Statistics
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Total Chapters */}
              <div className="text-center">
                <div 
                  // Value: Yellow
                  className={`text-3xl font-bold mb-2 text-[#FFD700]`}
                >
                  {chapters.length}
                </div>
                <div 
                  // Label: Gray-400
                  className={`text-sm font-medium text-gray-400`}
                >
                  Total Chapters
                </div>
              </div>
              
              {/* Notes Available */}
              <div className="text-center">
                <div 
                  // Value: Secondary Yellow (slightly different shade for visual distinction)
                  className={`text-3xl font-bold mb-2 text-[#FFC700]`}
                >
                  {chapters.filter(c => c.notesLink).length}
                </div>
                <div 
                  // Label: Gray-400
                  className={`text-sm font-medium flex items-center justify-center space-x-1 text-gray-400`}
                >
                  <FileText className="h-3 w-3" />
                  <span>Notes Available</span>
                </div>
              </div>
              
              {/* Video Lectures */}
              <div className="text-center">
                <div 
                  // Value: Tertiary Yellow
                  className={`text-3xl font-bold mb-2 text-[#FFE87C]`}
                >
                  {chapters.filter(c => c.lectureLink).length}
                </div>
                <div 
                  // Label: Gray-400
                  className={`text-sm font-medium flex items-center justify-center space-x-1 text-gray-400`}
                >
                  <Video className="h-3 w-3" />
                  <span>Video Lectures</span>
                </div>
              </div>
              
              {/* DPP Available */}
              <div className="text-center">
                <div 
                  // Value: Yellow
                  className={`text-3xl font-bold mb-2 text-[#FFD700]`}
                >
                  {chapters.filter(c => c.dppLink).length}
                </div>
                <div 
                  // Label: Gray-400
                  className={`text-sm font-medium flex items-center justify-center space-x-1 text-gray-400`}
                >
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