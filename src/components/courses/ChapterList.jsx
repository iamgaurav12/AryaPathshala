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
        <div key={index} className="animate-pulse bg-dark-secondary rounded-2xl p-6 shadow-dark border border-primary">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-20 bg-dark-tertiary rounded-full"></div>
            <div className="h-6 w-16 bg-dark-tertiary rounded-full"></div>
          </div>
          <div className="h-6 w-3/4 bg-dark-tertiary rounded mb-3"></div>
          <div className="h-4 w-full bg-dark-tertiary rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-dark-tertiary rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 bg-dark-tertiary rounded"></div>
            <div className="h-12 bg-dark-tertiary rounded"></div>
            <div className="h-12 bg-dark-tertiary rounded"></div>
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
      <div className="bg-dark-secondary rounded-2xl shadow-dark border border-primary p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-yellow-muted text-xl">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Search chapters, topics, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark-quaternary border border-secondary rounded-xl focus:ring-2 focus:ring-yellow-primary focus:border-yellow-primary transition-all duration-300 text-primary placeholder:text-quaternary"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-quaternary hover:text-yellow-primary transition-colors duration-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              📚 Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 bg-dark-quaternary border border-secondary rounded-lg focus:ring-2 focus:ring-yellow-primary focus:border-yellow-primary text-primary text-sm"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject} className="bg-dark-quaternary text-primary">
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              📈 Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 bg-dark-quaternary border border-secondary rounded-lg focus:ring-2 focus:ring-yellow-primary focus:border-yellow-primary text-primary text-sm"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty} className="bg-dark-quaternary text-primary">
                  {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              🔄 Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-dark-quaternary border border-secondary rounded-lg focus:ring-2 focus:ring-yellow-primary focus:border-yellow-primary text-primary text-sm"
            >
              <option value="order" className="bg-dark-quaternary text-primary">Chapter Order</option>
              <option value="difficulty" className="bg-dark-quaternary text-primary">Difficulty</option>
              <option value="progress" className="bg-dark-quaternary text-primary">Progress</option>
              <option value="alphabetical" className="bg-dark-quaternary text-primary">Alphabetical</option>
            </select>
          </div>

          {/* View Mode */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              👁️ View
            </label>
            <div className="flex rounded-lg bg-dark-quaternary p-1 border border-secondary">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-yellow-primary text-dark-primary shadow-md'
                    : 'text-tertiary hover:text-primary hover:bg-dark-tertiary'
                }`}
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-yellow-primary text-dark-primary shadow-md'
                    : 'text-tertiary hover:text-primary hover:bg-dark-tertiary'
                }`}
              >
                ☰ List
              </button>
            </div>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-tertiary">
            Showing {filteredAndSortedChapters.length} of {chapters.length} chapters
          </span>
          
          {/* Active Filters */}
          {searchTerm && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-primary/20 text-yellow-primary rounded-full text-xs font-medium border border-yellow-muted">
              <span>🔍 "{searchTerm}"</span>
              <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-yellow-secondary">
                ✕
              </button>
            </span>
          )}
          
          {selectedSubject !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-xs font-medium border border-green-400/30">
              <span>📚 {selectedSubject}</span>
              <button onClick={() => setSelectedSubject('all')} className="ml-1 hover:text-green-300">
                ✕
              </button>
            </span>
          )}
          
          {selectedDifficulty !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-xs font-medium border border-purple-400/30">
              <span>📈 {selectedDifficulty}</span>
              <button onClick={() => setSelectedDifficulty('all')} className="ml-1 hover:text-purple-300">
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
              className="text-xs text-quaternary hover:text-yellow-primary underline transition-colors duration-200"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Chapter Grid/List */}
      {filteredAndSortedChapters.length === 0 ? (
        <div className="text-center py-16 bg-dark-secondary rounded-2xl shadow-dark border border-primary">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            No chapters found
          </h3>
          <p className="text-tertiary mb-6">
            Try adjusting your search criteria or filters to find more chapters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSubject('all');
              setSelectedDifficulty('all');
            }}
            className="px-6 py-3 bg-gradient-to-r from-yellow-primary to-yellow-secondary text-dark-primary rounded-xl font-semibold hover:shadow-yellow transform hover:-translate-y-1 transition-all duration-300"
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
        <div className="bg-gradient-to-r from-dark-tertiary to-dark-quaternary rounded-2xl p-6 border border-yellow-muted shadow-dark">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
            <span className="mr-2">📊</span>
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-dark-secondary rounded-lg p-4 border border-primary hover:border-green-400 transition-colors duration-200">
              <div className="text-2xl font-bold text-green-400">
                {filteredAndSortedChapters.filter(ch => ch.progress >= 100).length}
              </div>
              <div className="text-sm text-tertiary">Completed</div>
            </div>
            <div className="text-center bg-dark-secondary rounded-lg p-4 border border-primary hover:border-yellow-primary transition-colors duration-200">
              <div className="text-2xl font-bold text-yellow-primary">
                {filteredAndSortedChapters.filter(ch => ch.progress > 0 && ch.progress < 100).length}
              </div>
              <div className="text-sm text-tertiary">In Progress</div>
            </div>
            <div className="text-center bg-dark-secondary rounded-lg p-4 border border-primary hover:border-quaternary transition-colors duration-200">
              <div className="text-2xl font-bold text-quaternary">
                {filteredAndSortedChapters.filter(ch => !ch.progress || ch.progress === 0).length}
              </div>
              <div className="text-sm text-tertiary">Not Started</div>
            </div>
            <div className="text-center bg-dark-secondary rounded-lg p-4 border border-primary hover:border-purple-400 transition-colors duration-200">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(
                  filteredAndSortedChapters.reduce((acc, ch) => acc + (ch.progress || 0), 0) / filteredAndSortedChapters.length
                )}%
              </div>
              <div className="text-sm text-tertiary">Avg Progress</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterList;