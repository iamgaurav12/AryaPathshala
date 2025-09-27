// src/components/admin/AdminDashboard.jsx
import React, { useState, memo } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useTheme } from '../../hooks/useTheme';
import ChapterManager from './ChapterManager';
import ResourceEditor from './ResourceEditor';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2,
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Memoized chapter item component to prevent unnecessary re-renders
const ChapterItem = memo(({ 
  chapter, 
  selected, 
  darkMode, 
  onSelect, 
  onEdit, 
  onDelete 
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onSelect(chapter);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(chapter);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(chapter.id);
  };

  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
        selected
          ? 'border-yellow-400 bg-yellow-500/10 shadow-lg shadow-yellow-400/20'
          : 'border-gray-800 hover:border-yellow-400/50 hover:bg-gray-900/80 bg-black/40'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium truncate ${
            selected ? 'text-yellow-300' : 'text-white'
          }`}>
            {chapter.title}
          </h3>
          <p className="text-sm text-gray-400 truncate">
            {chapter.subject || 'General'}
          </p>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={handleEdit}
            className="p-1 rounded hover:bg-gray-800 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-gray-800 text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

const AdminDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('class9');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const { darkMode } = useTheme();
  const { 
    chapters, 
    loading, 
    error, 
    addChapter, 
    updateChapter, 
    deleteChapter 
  } = useFirestore(selectedClass);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleClassChange = (className) => {
    setSelectedClass(className);
    setSelectedChapter(null);
    setIsEditing(false);
    setShowAddForm(false);
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setIsEditing(false);
    setShowAddForm(false);
  };

  const handleAddChapter = async (chapterData) => {
    try {
      await addChapter(chapterData);
      setShowAddForm(false);
      showNotification('Chapter added successfully!');
    } catch (error) {
      showNotification('Error adding chapter: ' + error.message, 'error');
    }
  };

  const handleUpdateChapter = async (chapterData) => {
    try {
      await updateChapter(selectedChapter.id, chapterData);
      setIsEditing(false);
      showNotification('Chapter updated successfully!');
    } catch (error) {
      showNotification('Error updating chapter: ' + error.message, 'error');
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      try {
        await deleteChapter(chapterId);
        if (selectedChapter && selectedChapter.id === chapterId) {
          setSelectedChapter(null);
        }
        showNotification('Chapter deleted successfully!');
      } catch (error) {
        showNotification('Error deleting chapter: ' + error.message, 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-black/95 backdrop-blur border-b border-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
                <BookOpen className="h-5 w-5 text-black" />
              </div>
              <h1 className="text-xl font-bold text-white">
                Content Management
              </h1>
            </div>
            
            {/* Class Selector */}
            <div className="flex space-x-2">
              {['class9', 'class10'].map((className) => (
                <button
                  key={className}
                  onClick={() => handleClassChange(className)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedClass === className
                      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-400/30 hover:bg-yellow-400'
                      : 'bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-yellow-400 border border-gray-700'
                  }`}
                >
                  {className === 'class9' ? 'Class 9' : 'Class 10'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl border ${
          notification.type === 'error' 
            ? 'bg-red-900 border-red-700 text-red-100' 
            : 'bg-green-900 border-green-700 text-green-100'
        }`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'error' ? (
              <AlertCircle className="h-5 w-5" />
            ) : (
              <CheckCircle className="h-5 w-5" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Chapter List */}
          <div className="lg:col-span-1 bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Chapters</h2>
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setSelectedChapter(null);
                  setIsEditing(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 font-medium shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-400 text-center py-8 bg-red-900/20 rounded-lg border border-red-800">
                Error: {error}
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700">
                {chapters.map((chapter) => (
                  <ChapterItem
                    key={chapter.id}
                    chapter={chapter}
                    selected={selectedChapter?.id === chapter.id}
                    darkMode={darkMode}
                    onSelect={handleChapterSelect}
                    onEdit={(chapter) => {
                      setSelectedChapter(chapter);
                      setIsEditing(true);
                      setShowAddForm(false);
                    }}
                    onDelete={handleDeleteChapter}
                  />
                ))}
                
                {chapters.length === 0 && (
                  <div className="text-center py-8 text-gray-400 bg-gray-900/50 rounded-lg border border-gray-800">
                    No chapters found. Click "Add" to create the first chapter.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Chapter Details/Editor */}
          <div className="lg:col-span-2 bg-gray-900/70 backdrop-blur border border-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6">
            {showAddForm ? (
              <ChapterManager
                onSave={handleAddChapter}
                onCancel={() => setShowAddForm(false)}
                title="Add New Chapter"
              />
            ) : isEditing && selectedChapter ? (
              <ChapterManager
                chapter={selectedChapter}
                onSave={handleUpdateChapter}
                onCancel={() => setIsEditing(false)}
                title="Edit Chapter"
              />
            ) : selectedChapter ? (
              <ResourceEditor
                chapter={selectedChapter}
                onEdit={() => setIsEditing(true)}
              />
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-lg font-medium mb-2 text-gray-400">
                  Select a chapter or add a new one
                </h3>
                <p className="text-gray-500">
                  Choose a chapter from the list to view and edit its details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;