import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Video, 
  BookOpen, 
  Save,
  X,
  ExternalLink
} from 'lucide-react';

const ChapterManager = ({ selectedClass, onBack }) => {
  const { coursesData, updateChapter, addChapter, deleteChapter } = useData();
  const [editingChapter, setEditingChapter] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    notes: '',
    dpp: '',
    lecture: ''
  });

  const className = `class${selectedClass}`;
  const chapters = coursesData[className] || [];

  const handleEdit = (chapter, index) => {
    setEditingChapter(index);
    setFormData({
      title: chapter.title || '',
      notes: chapter.notes || '',
      dpp: chapter.dpp || '',
      lecture: chapter.lecture || ''
    });
  };

  const handleSave = () => {
    if (editingChapter !== null) {
      updateChapter(className, editingChapter, formData);
      setEditingChapter(null);
    } else {
      addChapter(className, formData);
      setShowAddForm(false);
    }
    resetForm();
  };

  const handleCancel = () => {
    setEditingChapter(null);
    setShowAddForm(false);
    resetForm();
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this chapter?')) {
      deleteChapter(className, index);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      notes: '',
      dpp: '',
      lecture: ''
    });
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Classes</span>
          </button>
          <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Class {selectedClass} - Chapter Management
          </h2>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Chapter</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingChapter !== null) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {editingChapter !== null ? 'Edit Chapter' : 'Add New Chapter'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chapter Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter chapter title"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FileText className="inline h-4 w-4 mr-1" />
                  Notes Link (Google Drive)
                </label>
                <input
                  type="url"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <BookOpen className="inline h-4 w-4 mr-1" />
                  DPP Link (Google Drive)
                </label>
                <input
                  type="url"
                  value={formData.dpp}
                  onChange={(e) => setFormData({ ...formData, dpp: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Video className="inline h-4 w-4 mr-1" />
                  Lecture Link (YouTube)
                </label>
                <input
                  type="url"
                  value={formData.lecture}
                  onChange={(e) => setFormData({ ...formData, lecture: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleSave}
                disabled={!formData.title.trim()}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Chapter</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapters List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Chapters ({chapters.length})
          </h3>
        </div>

        {chapters.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No chapters yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Start by adding your first chapter for Class {selectedClass}.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add First Chapter
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {chapters.map((chapter, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {chapter.title}
                    </h4>
                    
                    <div className="flex flex-wrap gap-3">
                      {chapter.notes && (
                        <a
                          href={chapter.notes}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Notes</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      
                      {chapter.dpp && (
                        <a
                          href={chapter.dpp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          <BookOpen className="h-4 w-4" />
                          <span>DPP</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      
                      {chapter.lecture && (
                        <a
                          href={chapter.lecture}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          <Video className="h-4 w-4" />
                          <span>Lecture</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(chapter, index)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit chapter"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete chapter"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterManager;