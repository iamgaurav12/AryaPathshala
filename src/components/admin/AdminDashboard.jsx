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
      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
        selected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : darkMode
          ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{chapter.title}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
            {chapter.subject || 'General'}
          </p>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={handleEdit}
            className={`p-1 rounded ${
              darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
            }`}
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className={`p-1 rounded ${
              darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
            } text-red-500`}
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            
            {/* Class Selector */}
            <div className="flex space-x-2">
              {['class9', 'class10'].map((className) => (
                <button
                  key={className}
                  onClick={() => handleClassChange(className)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedClass === className
                      ? 'bg-blue-500 text-white'
                      : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
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
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Chapter List */}
          <div className={`lg:col-span-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Chapters</h2>
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setSelectedChapter(null);
                  setIsEditing(false);
                }}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">
                Error: {error}
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
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
                  <div className="text-center py-8 text-gray-500">
                    No chapters found. Click "Add" to create the first chapter.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Chapter Details/Editor */}
          <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
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
                <BookOpen className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Select a chapter or add a new one
                </h3>
                <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
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