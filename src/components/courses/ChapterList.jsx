import React, { useState, useMemo } from 'react';
import { BookOpen, FileText, Video, ExternalLink, CheckCircle, Circle } from 'lucide-react';


// --- Placeholder ChapterCard Component ---
// This component is included here to resolve the missing import error.
const ChapterCard = ({ chapter, isSelected, onClick, showProgress, completionRate }) => {
  const hasNotes = !!chapter.notesLink;
  const hasDpp = !!chapter.dppLink;
  const hasLecture = !!chapter.lectureLink;
  const resourceCount = [hasNotes, hasDpp, hasLecture].filter(Boolean).length;

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-xl ${
        isSelected
          ? 'border-yellow-500 bg-black shadow-lg shadow-yellow-500/20'
          : 'border-gray-800 hover:border-gray-700 hover:bg-black/50'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg mb-1 transition-colors duration-200 ${isSelected ? 'text-yellow-400' : 'text-white'}`}>
            {chapter.title}
          </h3>
          {chapter.subject && (
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-black text-gray-400 border border-gray-700">
              {chapter.subject}
            </span>
          )}
        </div>
        {showProgress && (
          <div className="flex items-center space-x-2 ml-4">
            <div className={`text-sm font-medium ${completionRate === 100 ? 'text-green-400' : completionRate > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {completionRate}%
            </div>
            {completionRate === 100 ? <CheckCircle className="h-5 w-5 text-green-400" /> : <Circle className="h-5 w-5 text-gray-600" />}
          </div>
        )}
      </div>
      <p className="text-sm mb-4 line-clamp-2 text-gray-400">{chapter.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-1 transition-colors duration-200 ${hasNotes ? 'text-green-400' : 'text-gray-600'}`}>
            <FileText className="h-4 w-4" />
            <span className="text-xs font-medium">Notes</span>
          </div>
          <div className={`flex items-center space-x-1 transition-colors duration-200 ${hasDpp ? 'text-yellow-400' : 'text-gray-600'}`}>
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium">DPP</span>
          </div>
          <div className={`flex items-center space-x-1 transition-colors duration-200 ${hasLecture ? 'text-red-400' : 'text-gray-600'}`}>
            <Video className="h-4 w-4" />
            <span className="text-xs font-medium">Video</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">{resourceCount}/3 resources</span>
          {resourceCount > 0 && <ExternalLink className="h-3 w-3 text-yellow-600 hover:text-yellow-400 transition-colors duration-200" />}
        </div>
      </div>
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-yellow-500/30">
          <p className="text-xs text-yellow-400 font-medium animate-pulse">
            Click on resources below to access materials →
          </p>
        </div>
      )}
    </div>
  );
};


const ChapterList = ({ chapters = [], selectedChapter, onChapterSelect, loading = false, className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState('order');
  const [viewMode, setViewMode] = useState('grid');

  const subjects = useMemo(() => ['all', ...new Set(chapters.map(c => c.subject))], [chapters]);

  const filteredAndSortedChapters = useMemo(() => {
    let filtered = chapters.filter(chapter => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (chapter.title.toLowerCase().includes(searchLower) ||
         chapter.description?.toLowerCase().includes(searchLower)) &&
        (selectedSubject === 'all' || chapter.subject === selectedSubject)
      );
    });

    filtered.sort((a, b) => {
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      return (a.order || a.id) - (b.order || b.id);
    });

    return filtered;
  }, [chapters, searchTerm, selectedSubject, sortBy]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse bg-black rounded-2xl p-6 shadow-xl border border-gray-800">
          <div className="h-6 w-3/4 bg-gray-800 rounded mb-3"></div>
          <div className="h-4 w-full bg-gray-800 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-800 rounded mb-4"></div>
        </div>
      ))}
    </div>
  );

  if (loading) return <div className={`py-8 ${className}`}><LoadingSkeleton /></div>;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="bg-black rounded-2xl shadow-xl border border-gray-800 p-6">
        <div className="relative mb-6">
          <input type="text" placeholder="Search chapters..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-black border border-gray-700 rounded-xl focus:ring-2 focus:ring-yellow-500 transition-all text-white placeholder:text-gray-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 text-white"
            >
              {subjects.map(s => <option key={s} value={s} className="bg-black text-white">{s === 'all' ? 'All Subjects' : s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 text-white"
            >
              <option value="order">Chapter Order</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">View</label>
            <div className="flex rounded-lg bg-black p-1 border border-gray-700">
              <button onClick={() => setViewMode('grid')} className={`flex-1 px-3 py-1 rounded-md text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-yellow-500 text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>Grid</button>
              <button onClick={() => setViewMode('list')} className={`flex-1 px-3 py-1 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-yellow-500 text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>List</button>
            </div>
          </div>
        </div>
      </div>

      {filteredAndSortedChapters.length === 0 ? (
        <div className="text-center py-16 bg-black rounded-2xl shadow-xl border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-2">No chapters found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {filteredAndSortedChapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              isSelected={selectedChapter?.id === chapter.id}
              onClick={() => onChapterSelect(chapter)}
              showProgress={true}
              completionRate={chapter.progress || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChapterList;

