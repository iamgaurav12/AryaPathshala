import React, { useState, useContext } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  BookOpen, 
  ArrowLeft,
  Search,
  Filter,
  MoreVertical,
  Copy,
  Eye,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { DataContext } from '../../context/DataContext';

const ChapterManager = ({ onBack }) => {
  const { theme } = useContext(ThemeContext);
  const { coursesData, updateCourseData } = useContext(DataContext);
  const [selectedClass, setSelectedClass] = useState('9');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingChapter, setEditingChapter] = useState(null);
  const [newChapter, setNewChapter] = useState({
    name: '',
    description: '',
    notesLink: '',
    dppLink: '',
    lectureLink: '',
    duration: '',
    rating: '4.5'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const currentCourse = coursesData[selectedClass] || { chapters: [] };
  const chapters = currentCourse.chapters || [];

  const filteredChapters = chapters.filter(chapter =>
    chapter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddChapter = () => {
    if (!newChapter.name.trim()) {
      alert('Chapter name is required!');
      return;
    }

    const updatedChapters = [...chapters, {
      ...newChapter,
      id: Date.now().toString(),
      students: '500+'
    }];

    updateCourseData(selectedClass, {
      ...currentCourse,
      chapters: updatedChapters
    });

    setNewChapter({
      name: '',
      description: '',
      notesLink: '',
      dppLink: '',
      lectureLink: '',
      duration: '',
      rating: '4.5'
    });
    setShowAddForm(false);
  };

  const handleEditChapter = (chapter) => {
    setEditingChapter({ ...chapter });
  };

  const handleUpdateChapter = () => {
    const updatedChapters = chapters.map(chapter =>
      chapter.id === editingChapter.id ? editingChapter : chapter
    );

    updateCourseData(selectedClass, {
      ...currentCourse,
      chapters: updatedChapters
    });

    setEditingChapter(null);
  };

  const handleDeleteChapter = (chapterId) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      const updatedChapters = chapters.filter(chapter => chapter.id !== chapterId);
      
      updateCourseData(selectedClass, {
        ...currentCourse,
        chapters: updatedChapters
      });
    }
  };

  const handleDuplicateChapter = (chapter) => {
    const duplicatedChapter = {
      ...chapter,
      id: Date.now().toString(),
      name: chapter.name + ' (Copy)'
    };

    const updatedChapters = [...chapters, duplicatedChapter];
    
    updateCourseData(selectedClass, {
      ...currentCourse,
      chapters: updatedChapters
    });
  };

  const ChapterForm = ({ chapter, onChange, onSave, onCancel, title }) => (
    <div className={`
      p-6 rounded-xl border
      ${theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white border-gray-200 shadow-lg'
      }
    `}>
      <h3 className={`text-lg font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Chapter Name *
          </label>
          <input
            type="text"
            value={chapter.name}
            onChange={(e) => onChange({ ...chapter, name: e.target.value })}
            className={`
              w-full px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
            placeholder="Enter chapter name"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Description
          </label>
          <textarea
            value={chapter.description}
            onChange={(e) => onChange({ ...chapter, description: e.target.value })}
            rows={3}
            className={`
              w-full px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
            placeholder="Brief description of the chapter"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Notes Link (Google Drive)
          </label>
          <input
            type="url"
            value={chapter.notesLink}
            onChange={(e) => onChange({ ...chapter, notesLink: e.target.value })}
            className={`
              w-full px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
            placeholder="https://drive.google.com/..."
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            DPP Link (Google Drive)
          </label>
          <input
            type="url"
            value={chapter.dppLink}
            onChange={(e) => onChange({ ...chapter, dppLink: e.target.value })}
            className={`
              w-full px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
            placeholder="https://drive.google.com/..."
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Lecture Link (YouTube)
          </label>
          <input
            type="url"
            value={chapter.lectureLink}
            onChange={(e) => onChange({ ...chapter, lectureLink: e.target.value })}
            className={`
              w-full px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
            placeholder="https://youtube.com/..."
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Duration
          </label>
          <input
            type="text"
            value={chapter.duration}
            onChange={(e) => onChange({ ...chapter, duration: e.target.value })}
            className={`
              w-full px-4 py-2 rounded-lg border transition-colors
              ${theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
            placeholder="e.g., 2-3 hours"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onCancel}
          className={`
            px-4 py-2 rounded-lg border transition-colors
            ${theme === 'dark' 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <X className="w-4 h-4 inline mr-2" />
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Save className="w-4 h-4 inline mr-2" />
          Save Chapter
        </button>
      </div>
    </div>
  );

  const ChapterCard = ({ chapter, onEdit, onDelete, onDuplicate }) => (
    <div className={`
      p-4 rounded-lg border transition-all hover:shadow-md
      ${theme === 'dark' 
        ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
        : 'bg-white border-gray-200 hover:shadow-lg'
      }
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className={`font-semibold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {chapter.name}
          </h4>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {chapter.description || 'No description provided'}
          </p>
        </div>

        <div className="relative group">
          <button className={`
            p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700
            ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
          `}>
            <MoreVertical className="w-4 h-4" />
          </button>

          <div className={`
            absolute right-0 top-8 w-48 py-2 rounded-lg border shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all
            ${theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
            }
          `}>
            <button
              onClick={() => onEdit(chapter)}
              className={`
                w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
              `}
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDuplicate(chapter)}
              className={`
                w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
              `}
            >
              <Copy className="w-4 h-4" />
              <span>Duplicate</span>
            </button>
            <button
              onClick={() => onDelete(chapter.id)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Resource Status */}
      <div className="flex items-center space-x-4 text-xs mb-3">
        <div className={`flex items-center space-x-1 ${
          chapter.notesLink ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {chapter.notesLink ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
          <span>Notes</span>
        </div>
        <div className={`flex items-center space-x-1 ${
          chapter.dppLink ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {chapter.dppLink ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
          <span>DPP</span>
        </div>
        <div className={`flex items-center space-x-1 ${
          chapter.lectureLink ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {chapter.lectureLink ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
          <span>Video</span>
        </div>
      </div>

      {/* Metadata */}
      <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
        Duration: {chapter.duration || 'Not set'} • Rating: {chapter.rating || '4.5'} • Students: {chapter.students || '500+'}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`
        border-b sticky top-0 z-10 backdrop-blur-sm
        ${theme === 'dark' 
          ? 'bg-gray-900/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
        }
      `}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className={`
                  p-2 rounded-lg transition-colors
                  ${theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Chapter Manager
                </h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Add, edit, and manage chapters for your courses
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Class Selector */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className={`
                  px-4 py-2 rounded-lg border transition-colors
                  ${theme === 'dark' 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                `}
              >
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
              </select>

              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Chapter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add Chapter Form */}
        {showAddForm && (
          <div className="mb-8">
            <ChapterForm
              chapter={newChapter}
              onChange={setNewChapter}
              onSave={handleAddChapter}
              onCancel={() => setShowAddForm(false)}
              title="Add New Chapter"
            />
          </div>
        )}

        {/* Edit Chapter Form */}
        {editingChapter && (
          <div className="mb-8">
            <ChapterForm
              chapter={editingChapter}
              onChange={setEditingChapter}
              onSave={handleUpdateChapter}
              onCancel={() => setEditingChapter(null)}
              title="Edit Chapter"
            />
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chapters..."
              className={`
                w-full pl-10 pr-4 py-2 rounded-lg border transition-colors
                ${theme === 'dark' 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }
              `}
            />
          </div>

          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {filteredChapters.length} chapter{filteredChapters.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Chapters Grid */}
        {filteredChapters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                onEdit={handleEditChapter}
                onDelete={handleDeleteChapter}
                onDuplicate={handleDuplicateChapter}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 mx-auto mb-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {searchTerm ? 'No chapters found' : 'No chapters yet'}
            </h3>
            <p className={`text-sm mb-6 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Start by adding your first chapter for this class'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Your First Chapter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterManager;