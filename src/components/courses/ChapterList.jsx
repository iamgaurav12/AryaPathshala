import React, { useState, useMemo } from 'react';
import ChapterCard from './ChapterCard';

const ChapterList = ({ 
  chapters = [], 
  selectedChapter, 
  onChapterSelect,
  loading = false,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('order'); // order, difficulty, progress
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  // Extract unique subjects and difficulties
  const subjects = useMemo(() => {
    const subjectSet = new Set(chapters.map(chapter => chapter.subject));
    return ['all', ...Array.from(subjectSet)];
  }, [chapters]);

  const difficulties = ['all', 'easy', 'medium', 'hard'];

  // Filter and sort chapters
  const filteredAndSortedChapters = useMemo(() => {
    let filtered = chapters.filter(chapter => {
      const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chapter.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chapter.topics?.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSubject = selectedSubject === 'all' || chapter.subject === selectedSubject;
      const matchesDifficulty = selectedDifficulty === 'all' || chapter.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesSubject && matchesDifficulty;
    });

    // Sort chapters
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default: // order
          return (a.order || a.id) - (b.order || b.id);
      }
    });

    return filtered;
  }, [chapters, searchTerm, selectedSubject, selectedDifficulty, sortBy]);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className={`py-8 ${className}`}>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400 text-xl">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Search chapters, topics, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📚 Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📈 Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🔄 Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
            >
              <option value="order">Chapter Order</option>
              <option value="difficulty">Difficulty</option>
              <option value="progress">Progress</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          {/* View Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              👁️ View
            </label>
            <div className="flex rounded-lg bg-gray-50 dark:bg-gray-700 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                ☰ List
              </button>
            </div>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedChapters.length} of {chapters.length} chapters
          </span>
          
          {/* Active Filters */}
          {searchTerm && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              <span>🔍 "{searchTerm}"</span>
              <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-blue-900 dark:hover:text-blue-100">
                ✕
              </button>
            </span>
          )}
          
          {selectedSubject !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
              <span>📚 {selectedSubject}</span>
              <button onClick={() => setSelectedSubject('all')} className="ml-1 hover:text-green-900 dark:hover:text-green-100">
                ✕
              </button>
            </span>
          )}
          
          {selectedDifficulty !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
              <span>📈 {selectedDifficulty}</span>
              <button onClick={() => setSelectedDifficulty('all')} className="ml-1 hover:text-purple-900 dark:hover:text-purple-100">
                ✕
              </button>
            </span>
          )}

          {/* Clear All Filters */}
          {(searchTerm || selectedSubject !== 'all' || selectedDifficulty !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
                setSelectedDifficulty('all');
              }}
              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Chapter Grid/List */}
      {filteredAndSortedChapters.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No chapters found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search criteria or filters to find more chapters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSubject('all');
              setSelectedDifficulty('all');
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Show All Chapters
          </button>
        </div>
      ) : (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredAndSortedChapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              isSelected={selectedChapter?.id === chapter.id}
              isCompleted={chapter.progress >= 100}
              onSelect={onChapterSelect}
              showProgress={true}
              className={`${
                viewMode === 'list' 
                  ? 'md:flex md:items-center md:space-x-6 md:p-6' 
                  : ''
              } animate-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {filteredAndSortedChapters.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Quick Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {filteredAndSortedChapters.filter(ch => ch.progress >= 100).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {filteredAndSortedChapters.filter(ch => ch.progress > 0 && ch.progress < 100).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {filteredAndSortedChapters.filter(ch => !ch.progress || ch.progress === 0).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Not Started</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(
                  filteredAndSortedChapters.reduce((acc, ch) => acc + (ch.progress || 0), 0) / filteredAndSortedChapters.length
                )}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterList;