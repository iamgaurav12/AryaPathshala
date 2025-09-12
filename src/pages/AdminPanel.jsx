import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorageTheme, useLocalStorageObject } from '../hooks/useLocalStorage';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  BookOpen, 
  FileText, 
  Video,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Check,
  AlertCircle
} from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { password } = useParams();
  
  // Use specialized theme hook
  const [theme, setTheme, themeActions] = useLocalStorageTheme('aryapathshala_theme', 'light');
  const isDarkMode = themeActions.isDark;
  
  // Use localStorage hook for chapters data
  const [chapters, setChapters, chaptersActions] = useLocalStorageObject(
    `aryapathshala_${password}`, 
    { '9': [], '10': [] }
  );
  
  const [selectedClass, setSelectedClass] = useState('9');
  const [isEditing, setIsEditing] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // New chapter form state
  const [newChapter, setNewChapter] = useState({
    id: '',
    title: '',
    description: '',
    notesLink: '',
    dppLink: '',
    lectureLink: '',
    order: 1
  });

  // Initialize sample data if no data exists
  useEffect(() => {
    if (!chapters['9'] || !chapters['10'] || (chapters['9'].length === 0 && chapters['10'].length === 0)) {
      initializeSampleData();
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const initializeSampleData = () => {
    const sampleData = {
      '9': [
        {
          id: '9-ch-1',
          title: 'Number Systems',
          description: 'Real numbers, rational and irrational numbers',
          notesLink: 'https://drive.google.com/file/d/sample1',
          dppLink: 'https://drive.google.com/file/d/sample1-dpp',
          lectureLink: 'https://youtube.com/watch?v=sample1',
          order: 1
        },
        {
          id: '9-ch-2',
          title: 'Polynomials',
          description: 'Introduction to polynomials and their operations',
          notesLink: 'https://drive.google.com/file/d/sample2',
          dppLink: 'https://drive.google.com/file/d/sample2-dpp',
          lectureLink: 'https://youtube.com/watch?v=sample2',
          order: 2
        }
      ],
      '10': [
        {
          id: '10-ch-1',
          title: 'Real Numbers',
          description: 'Euclid\'s division lemma, HCF and LCM',
          notesLink: 'https://drive.google.com/file/d/sample3',
          dppLink: 'https://drive.google.com/file/d/sample3-dpp',
          lectureLink: 'https://youtube.com/watch?v=sample3',
          order: 1
        }
      ]
    };
    setChapters(sampleData);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const toggleChapterExpansion = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const resetNewChapterForm = () => {
    setNewChapter({
      id: '',
      title: '',
      description: '',
      notesLink: '',
      dppLink: '',
      lectureLink: '',
      order: 1
    });
  };

  const handleAddChapter = () => {
    if (!newChapter.title.trim()) {
      showNotification('Chapter title is required!', 'error');
      return;
    }

    const chapterId = `${selectedClass}-ch-${Date.now()}`;
    const chapter = {
      ...newChapter,
      id: chapterId,
      order: (chapters[selectedClass] || []).length + 1
    };

    const updatedChapters = {
      ...chapters,
      [selectedClass]: [...(chapters[selectedClass] || []), chapter].sort((a, b) => a.order - b.order)
    };

    setChapters(updatedChapters);
    resetNewChapterForm();
    setShowAddForm(false);
    showNotification('Chapter added successfully!');
  };

  const handleEditChapter = (chapter) => {
    setEditingChapter({ ...chapter });
    setIsEditing(true);
  };

  const handleUpdateChapter = () => {
    if (!editingChapter.title.trim()) {
      showNotification('Chapter title is required!', 'error');
      return;
    }

    const updatedChapters = {
      ...chapters,
      [selectedClass]: (chapters[selectedClass] || []).map(ch => 
        ch.id === editingChapter.id ? editingChapter : ch
      )
    };

    setChapters(updatedChapters);
    setEditingChapter(null);
    setIsEditing(false);
    showNotification('Chapter updated successfully!');
  };

  const handleDeleteChapter = (chapterId) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      const updatedChapters = {
        ...chapters,
        [selectedClass]: (chapters[selectedClass] || []).filter(ch => ch.id !== chapterId)
      };
      
      setChapters(updatedChapters);
      showNotification('Chapter deleted successfully!');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/gaurav');
    }
  };

  const currentChapters = chapters[selectedClass] || [];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                📚 Aryapathshala Admin
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode 
                  ? 'bg-blue-900 text-blue-200' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                Admin Panel
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={themeActions.toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-yellow-400 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-red-400 hover:bg-gray-700' 
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
          notification.type === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          {notification.type === 'error' ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <Check className="w-5 h-5" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Class Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Course Management
            </h1>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Chapter</span>
            </button>
          </div>
          
          <div className="flex space-x-4">
            {['9', '10'].map((classNum) => (
              <button
                key={classNum}
                onClick={() => setSelectedClass(classNum)}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:-translate-y-0.5 ${
                  selectedClass === classNum
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                Class {classNum}th ({currentChapters.length} chapters)
              </button>
            ))}
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-6">
          {currentChapters.length === 0 ? (
            <div className={`text-center py-16 rounded-2xl border-2 border-dashed ${
              isDarkMode 
                ? 'border-gray-600 text-gray-400' 
                : 'border-gray-300 text-gray-500'
            }`}>
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No chapters added yet</h3>
              <p className="text-lg mb-6">Start by adding your first chapter for Class {selectedClass}th</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Add First Chapter
              </button>
            </div>
          ) : (
            currentChapters.map((chapter) => (
              <div
                key={chapter.id}
                className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => toggleChapterExpansion(chapter.id)}
                      className="flex items-center space-x-3 text-left flex-1"
                    >
                      {expandedChapters[chapter.id] ? (
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-blue-600" />
                      )}
                      <div>
                        <h3 className={`text-xl font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {chapter.title}
                        </h3>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {chapter.description}
                        </p>
                      </div>
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditChapter(chapter)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          isDarkMode 
                            ? 'text-blue-400 hover:bg-gray-700' 
                            : 'text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteChapter(chapter.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          isDarkMode 
                            ? 'text-red-400 hover:bg-gray-700' 
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {expandedChapters[chapter.id] && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Notes Link */}
                        <div className={`p-4 rounded-xl border ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700' 
                            : 'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className={`font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              Notes
                            </span>
                          </div>
                          {chapter.notesLink ? (
                            <a
                              href={chapter.notesLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <span>View Notes</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              No notes added
                            </span>
                          )}
                        </div>

                        {/* DPP Link */}
                        <div className={`p-4 rounded-xl border ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700' 
                            : 'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <BookOpen className="w-4 h-4 text-orange-600" />
                            <span className={`font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              DPP
                            </span>
                          </div>
                          {chapter.dppLink ? (
                            <a
                              href={chapter.dppLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <span>View DPP</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              No DPP added
                            </span>
                          )}
                        </div>

                        {/* Lecture Link */}
                        <div className={`p-4 rounded-xl border ${
                          isDarkMode 
                            ? 'border-gray-600 bg-gray-700' 
                            : 'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <Video className="w-4 h-4 text-red-600" />
                            <span className={`font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              Lecture
                            </span>
                          </div>
                          {chapter.lectureLink ? (
                            <a
                              href={chapter.lectureLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <span>Watch Lecture</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              No lecture added
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Chapter Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Add New Chapter - Class {selectedClass}th
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    resetNewChapterForm();
                  }}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-700' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Chapter Title *
                </label>
                <input
                  type="text"
                  value={newChapter.title}
                  onChange={(e) => setNewChapter(prev => ({...prev, title: e.target.value}))}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter chapter title..."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Description
                </label>
                <textarea
                  value={newChapter.description}
                  onChange={(e) => setNewChapter(prev => ({...prev, description: e.target.value}))}
                  rows="3"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter chapter description..."
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FileText className="w-4 h-4 inline mr-1" />
                    Notes Link (Google Drive)
                  </label>
                  <input
                    type="url"
                    value={newChapter.notesLink}
                    onChange={(e) => setNewChapter(prev => ({...prev, notesLink: e.target.value}))}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    DPP Link (Google Drive)
                  </label>
                  <input
                    type="url"
                    value={newChapter.dppLink}
                    onChange={(e) => setNewChapter(prev => ({...prev, dppLink: e.target.value}))}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Video className="w-4 h-4 inline mr-1" />
                    Lecture Link (YouTube)
                  </label>
                  <input
                    type="url"
                    value={newChapter.lectureLink}
                    onChange={(e) => setNewChapter(prev => ({...prev, lectureLink: e.target.value}))}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  resetNewChapterForm();
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddChapter}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Add Chapter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Chapter Modal */}
      {isEditing && editingChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Edit Chapter - Class {selectedClass}th
                </h2>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingChapter(null);
                  }}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:bg-gray-700' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Chapter Title *
                </label>
                <input
                  type="text"
                  value={editingChapter.title}
                  onChange={(e) => setEditingChapter(prev => ({...prev, title: e.target.value}))}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter chapter title..."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Description
                </label>
                <textarea
                  value={editingChapter.description}
                  onChange={(e) => setEditingChapter(prev => ({...prev, description: e.target.value}))}
                  rows="3"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter chapter description..."
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FileText className="w-4 h-4 inline mr-1" />
                    Notes Link (Google Drive)
                  </label>
                  <input
                    type="url"
                    value={editingChapter.notesLink}
                    onChange={(e) => setEditingChapter(prev => ({...prev, notesLink: e.target.value}))}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    DPP Link (Google Drive)
                  </label>
                  <input
                    type="url"
                    value={editingChapter.dppLink}
                    onChange={(e) => setEditingChapter(prev => ({...prev, dppLink: e.target.value}))}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <Video className="w-4 h-4 inline mr-1" />
                    Lecture Link (YouTube)
                  </label>
                  <input
                    type="url"
                    value={editingChapter.lectureLink}
                    onChange={(e) => setEditingChapter(prev => ({...prev, lectureLink: e.target.value}))}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingChapter(null);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateChapter}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Update Chapter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;