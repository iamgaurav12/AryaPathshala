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
      className={`p-4 rounded-lg border transition-all duration-300 transform hover:scale-105 ${
        link 
          ? 'cursor-pointer hover:shadow-yellow-glow border-yellow-primary bg-yellow-primary/10 hover:bg-yellow-primary/20' 
          : darkMode 
            ? 'border-dark-primary bg-dark-tertiary hover:border-dark-secondary' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`h-5 w-5 transition-colors ${
            link 
              ? 'text-yellow-primary' 
              : darkMode 
                ? 'text-dark-muted' 
                : 'text-gray-400'
          }`} />
          <div>
            <h4 className={`font-medium ${
              darkMode ? 'text-dark-primary' : 'text-gray-900'
            }`}>
              {title}
            </h4>
            <p className={`text-sm ${
              link 
                ? darkMode ? 'text-yellow-secondary' : 'text-green-600'
                : darkMode ? 'text-dark-muted' : 'text-gray-600'
            }`}>
              {link ? description : 'Not uploaded yet'}
            </p>
          </div>
        </div>
        {link && (
          <ExternalLink className={`h-4 w-4 ${
            darkMode ? 'text-yellow-primary' : 'text-gray-400'
          } transition-colors`} />
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-6 ${
      darkMode ? 'bg-dark-primary' : 'bg-white'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${
              darkMode ? 'text-dark-primary' : 'text-gray-900'
            }`}>
              {chapter.title}
            </h2>
            <div className={`flex items-center space-x-4 mt-2 text-sm ${
              darkMode ? 'text-dark-muted' : 'text-gray-500'
            }`}>
              <div className="flex items-center space-x-1">
                <Tag className="h-4 w-4" />
                <span>{chapter.subject || 'General'}</span>
              </div>
              <div className="flex items-center space-x-1">
                {chapter.isActive ? (
                  <>
                    <Eye className="h-4 w-4 text-yellow-primary" />
                    <span className="text-yellow-primary font-medium">Active</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4 text-red-500" />
                    <span className="text-red-500 font-medium">Inactive</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={onEdit}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              darkMode 
                ? 'bg-yellow-primary text-black hover:bg-yellow-hover shadow-yellow-glow hover:shadow-yellow-glow-lg' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Edit3 className="h-4 w-4" />
            <span className="font-medium">Edit</span>
          </button>
        </div>

        {/* Chapter Description */}
        <div className={`p-6 rounded-lg mb-6 border transition-all duration-300 ${
          darkMode 
            ? 'bg-dark-card border-dark-primary shadow-dark-elevation' 
            : 'bg-gray-100 border-gray-200'
        }`}>
          <h3 className={`font-semibold mb-3 flex items-center space-x-2 ${
            darkMode ? 'text-dark-primary' : 'text-gray-900'
          }`}>
            <BookOpen className={`h-5 w-5 ${
              darkMode ? 'text-yellow-primary' : 'text-blue-500'
            }`} />
            <span>Description</span>
          </h3>
          <p className={`leading-relaxed ${
            darkMode ? 'text-dark-secondary' : 'text-gray-700'
          }`}>
            {chapter.description || 'No description available'}
          </p>
        </div>

        {/* Resources */}
        <div className="space-y-4 mb-6">
          <h3 className={`text-lg font-semibold ${
            darkMode ? 'text-dark-primary' : 'text-gray-900'
          }`}>
            Resources
          </h3>
          
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
        <div className={`p-6 rounded-lg border transition-all duration-300 ${
          darkMode 
            ? 'border-dark-primary bg-dark-card shadow-dark-elevation' 
            : 'border-gray-200 bg-gray-50'
        }`}>
          <h4 className={`font-semibold mb-4 flex items-center space-x-2 ${
            darkMode ? 'text-dark-primary' : 'text-gray-900'
          }`}>
            <Calendar className={`h-5 w-5 ${
              darkMode ? 'text-yellow-primary' : 'text-blue-500'
            }`} />
            <span>Chapter Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className={`font-medium ${
                darkMode ? 'text-dark-muted' : 'text-gray-600'
              }`}>
                Created:
              </span>
              <p className={`mt-1 ${
                darkMode ? 'text-dark-secondary' : 'text-gray-900'
              }`}>
                {formatDate(chapter.createdAt)}
              </p>
            </div>
            
            <div>
              <span className={`font-medium ${
                darkMode ? 'text-dark-muted' : 'text-gray-600'
              }`}>
                Last Updated:
              </span>
              <p className={`mt-1 ${
                darkMode ? 'text-dark-secondary' : 'text-gray-900'
              }`}>
                {formatDate(chapter.updatedAt)}
              </p>
            </div>
            
            <div>
              <span className={`font-medium ${
                darkMode ? 'text-dark-muted' : 'text-gray-600'
              }`}>
                Chapter Order:
              </span>
              <p className={`mt-1 ${
                darkMode ? 'text-dark-secondary' : 'text-gray-900'
              }`}>
                {chapter.order || 'Not set'}
              </p>
            </div>
            
            <div>
              <span className={`font-medium ${
                darkMode ? 'text-dark-muted' : 'text-gray-600'
              }`}>
                Status:
              </span>
              <p className={`mt-1 font-medium ${
                chapter.isActive ? 'text-yellow-primary' : 'text-red-500'
              }`}>
                {chapter.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`mt-6 p-6 rounded-lg border transition-all duration-300 ${
          darkMode 
            ? 'bg-yellow-primary/10 border-yellow-primary/30 shadow-yellow-glow/50' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <h4 className={`font-semibold mb-3 ${
            darkMode ? 'text-yellow-primary' : 'text-blue-800'
          }`}>
            Quick Actions
          </h4>
          <div className={`text-sm space-y-2 ${
            darkMode ? 'text-yellow-secondary' : 'text-blue-700'
          }`}>
            <p className="flex items-start">
              <span className="inline-block w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Click on resource cards to open links
            </p>
            <p className="flex items-start">
              <span className="inline-block w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Use the Edit button to modify chapter details
            </p>
            <p className="flex items-start">
              <span className="inline-block w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Toggle chapter status to show/hide from students
            </p>
            <p className="flex items-start">
              <span className="inline-block w-2 h-2 bg-current rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Resources with golden borders have valid links
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceEditor;