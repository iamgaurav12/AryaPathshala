import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  FileText, 
  Video, 
  BookOpen, 
  ArrowLeft,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

const ChapterManager = ({ classType, onBack }) => {
  const { 
    getAllChapters, 
    addChapter, 
    updateChapter, 
    deleteChapter, 
    updateResource 
  } = useData();
  
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);
  const [editingResource, setEditingResource] = useState(null);
  const [newChapter, setNewChapter] = useState({ title: '', description: '' });

  const chapters = getAllChapters(classType) || [];
  const classDisplayName = classType === 'class9' ? 'Class 9' : 'Class 10';

  const handleAddChapter = () => {
    if (newChapter.title.trim()) {
      addChapter(classType, {
        title: newChapter.title.trim(),
        description: newChapter.description.trim(),
        resources: {
          notes: '',
          lecture: '',
          dpp: ''
        }
      });
      setNewChapter({ title: '', description: '' });
      setIsAddingChapter(false);
    }
  };

  const handleUpdateChapter = (chapterId, updates) => {
    updateChapter(classType, chapterId, updates);
    setEditingChapter(null);
  };

  const handleDeleteChapter = (chapterId, chapterTitle) => {
    if (window.confirm(`Are you sure you want to delete "${chapterTitle}"? This action cannot be undone.`)) {
      deleteChapter(classType, chapterId);
    }
  };

  const handleUpdateResource = (chapterId, resourceType, url) => {
    updateResource(classType, chapterId, resourceType, url);
    setEditingResource(null);
  };

  const isValidUrl = (url) => {
    if (!url) return true; // Empty URLs are allowed
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const ResourceEditor = ({ chapter, resourceType, onSave, onCancel }) => {
    const [url, setUrl] = useState(chapter.resources[resourceType] || '');
    const [error, setError] = useState('');

    const resourceIcons = {
      notes: FileText,
      lecture: Video,
      dpp: BookOpen
    };

    const resourceLabels = {
      notes: 'Notes',
      lecture: 'Lecture',
      dpp: 'DPP'
    };

    const Icon = resourceIcons[resourceType];

    const handleSave = () => {
      if (url && !isValidUrl(url)) {
        setError('Please enter a valid URL');
        return;
      }
      onSave(chapter.id, resourceType, url.trim());
      setError('');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex items-center mb-4">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit {resourceLabels[resourceType]} Link
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Chapter: {chapter.title}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {resourceLabels[resourceType]} URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                placeholder={`Enter ${resourceLabels[resourceType].toLowerCase()} URL...`}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={onCancel}
                className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {classDisplayName} Chapters
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage chapters and their resources
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsAddingChapter(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Chapter</span>
        </button>
      </div>

      {/* Add Chapter Form */}
      {isAddingChapter && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Chapter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Chapter Title
              </label>
              <input
                type="text"
                value={newChapter.title}
                onChange={(e) => setNewChapter({ ...newChapter, title: e.target.value })}
                placeholder="Enter chapter title..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={newChapter.description}
                onChange={(e) => setNewChapter({ ...newChapter, description: e.target.value })}
                placeholder="Enter chapter description..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddChapter}
              disabled={!newChapter.title.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Chapter</span>
            </button>
            <button
              onClick={() => {
                setIsAddingChapter(false);
                setNewChapter({ title: '', description: '' });
              }}
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Chapters List */}
      <div className="space-y-6">
        {chapters.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No chapters yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start by adding your first chapter for {classDisplayName}
            </p>
          </div>
        ) : (
          chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6"
            >
              {/* Chapter Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {editingChapter === chapter.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        defaultValue={chapter.title}
                        onBlur={(e) => {
                          if (e.target.value.trim() !== chapter.title) {
                            handleUpdateChapter(chapter.id, { title: e.target.value.trim() });
                          } else {
                            setEditingChapter(null);
                          }
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.target.blur();
                          }
                        }}
                        className="text-xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white w-full"
                        autoFocus
                      />
                      <input
                        type="text"
                        defaultValue={chapter.description}
                        onBlur={(e) => {
                          handleUpdateChapter(chapter.id, { description: e.target.value.trim() });
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.target.blur();
                          }
                        }}
                        className="text-gray-600 dark:text-gray-400 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none w-full"
                        placeholder="Enter description..."
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {chapter.title}
                      </h3>
                      {chapter.description && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {chapter.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setEditingChapter(editingChapter === chapter.id ? null : chapter.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    {editingChapter === chapter.id ? (
                      <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteChapter(chapter.id, chapter.title)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Resources */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: 'notes', label: 'Notes', icon: FileText, color: 'blue' },
                  { key: 'lecture', label: 'Lecture', icon: Video, color: 'red' },
                  { key: 'dpp', label: 'DPP', icon: BookOpen, color: 'green' }
                ].map(({ key, label, icon: Icon, color }) => {
                  const hasResource = chapter.resources && chapter.resources[key];
                  const colorClasses = {
                    blue: hasResource 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400',
                    red: hasResource
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400',
                    green: hasResource
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  };

                  return (
                    <div
                      key={key}
                      className={`border rounded-lg p-4 ${colorClasses[color]} transition-all duration-200 hover:shadow-md`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Icon className="h-5 w-5 mr-2" />
                          <span className="font-medium">{label}</span>
                        </div>
                        {hasResource && (
                          <a
                            href={chapter.resources[key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors duration-200"
                            title="Open in new tab"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm opacity-75">
                          {hasResource ? 'Resource available' : 'No resource added'}
                        </p>
                        
                        {hasResource && (
                          <p className="text-xs opacity-60 truncate">
                            {chapter.resources[key]}
                          </p>
                        )}
                        
                        <button
                          onClick={() => setEditingResource({ chapterId: chapter.id, resourceType: key })}
                          className="w-full text-sm font-medium py-2 px-3 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 rounded border border-gray-200 dark:border-gray-500 transition-colors duration-200"
                        >
                          {hasResource ? 'Edit Link' : 'Add Link'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resource Editor Modal */}
      {editingResource && (
        <ResourceEditor
          chapter={chapters.find(ch => ch.id === editingResource.chapterId)}
          resourceType={editingResource.resourceType}
          onSave={handleUpdateResource}
          onCancel={() => setEditingResource(null)}
        />
      )}

      {/* Summary */}
      {chapters.length > 0 && (
        <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {classDisplayName} Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {chapters.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Chapters</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {chapters.filter(ch => ch.resources?.notes).length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Notes Added</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {chapters.filter(ch => ch.resources?.lecture).length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lectures Added</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {chapters.filter(ch => ch.resources?.dpp).length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">DPPs Added</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterManager;