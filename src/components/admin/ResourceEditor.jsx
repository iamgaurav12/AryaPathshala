// src/components/admin/ResourceEditor.jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { 
  Edit3, 
  ExternalLink, 
  FileText, 
  Video, 
  BookOpen,
  Calendar,
  Tag,
  Eye,
  EyeOff
} from 'lucide-react';

const ResourceEditor = ({ chapter, onEdit }) => {
  const { darkMode } = useTheme();

  const openLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Not available';
    
    try {
      // Handle Firestore timestamp
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const ResourceCard = ({ title, link, icon: Icon, description, onClick }) => (
    <div 
      className={`p-4 rounded-lg border transition-all duration-200 ${
        link 
          ? 'cursor-pointer hover:shadow-md border-green-500 bg-green-50 dark:bg-green-900/20' 
          : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`h-5 w-5 ${link ? 'text-green-600' : 'text-gray-400'}`} />
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {link ? description : 'Not uploaded yet'}
            </p>
          </div>
        </div>
        {link && (
          <ExternalLink className="h-4 w-4 text-gray-400" />
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{chapter.title}</h2>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4" />
              <span>{chapter.subject || 'General'}</span>
            </div>
            <div className="flex items-center space-x-1">
              {chapter.isActive ? (
                <>
                  <Eye className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">Active</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">Inactive</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Edit3 className="h-4 w-4" />
          <span>Edit</span>
        </button>
      </div>

      {/* Chapter Description */}
      <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h3 className="font-medium mb-2 flex items-center space-x-2">
          <BookOpen className="h-4 w-4" />
          <span>Description</span>
        </h3>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {chapter.description || 'No description available'}
        </p>
      </div>

      {/* Resources */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold">Resources</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <ResourceCard
            title="Study Notes"
            link={chapter.notesLink}
            icon={FileText}
            description="PDF notes and study material"
            onClick={() => openLink(chapter.notesLink)}
          />
          
          <ResourceCard
            title="Daily Practice Problems (DPP)"
            link={chapter.dppLink}
            icon={FileText}
            description="Practice questions and solutions"
            onClick={() => openLink(chapter.dppLink)}
          />
          
          <ResourceCard
            title="Video Lecture"
            link={chapter.lectureLink}
            icon={Video}
            description="YouTube video explanation"
            onClick={() => openLink(chapter.lectureLink)}
          />
        </div>
      </div>

      {/* Metadata */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <h4 className="font-medium mb-3 flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Chapter Information</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Created:
            </span>
            <p>{formatDate(chapter.createdAt)}</p>
          </div>
          
          <div>
            <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Last Updated:
            </span>
            <p>{formatDate(chapter.updatedAt)}</p>
          </div>
          
          <div>
            <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Chapter Order:
            </span>
            <p>{chapter.order || 'Not set'}</p>
          </div>
          
          <div>
            <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Status:
            </span>
            <p className={chapter.isActive ? 'text-green-500' : 'text-red-500'}>
              {chapter.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-200">Quick Actions</h4>
        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <p>• Click on resource cards to open links</p>
          <p>• Use the Edit button to modify chapter details</p>
          <p>• Toggle chapter status to show/hide from students</p>
          <p>• Resources with green borders have valid links</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceEditor;