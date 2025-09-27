// src/components/admin/ResourceEditor.jsx
import React from 'react';
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
  const openLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Not available';
    try {
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
      className={`p-4 rounded-lg border transition-all duration-300 transform hover:scale-[1.03] ${
        link 
          ? 'cursor-pointer hover:shadow-yellow-500/20 border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20' 
          : 'border-gray-800 bg-black/50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className={`h-5 w-5 transition-colors ${
            link ? 'text-yellow-400' : 'text-gray-600'
          }`} />
          <div>
            <h4 className="font-medium text-white">
              {title}
            </h4>
            <p className={`text-sm ${
              link ? 'text-yellow-400/80' : 'text-gray-500'
            }`}>
              {link ? description : 'Not uploaded yet'}
            </p>
          </div>
        </div>
        {link && <ExternalLink className="h-4 w-4 text-yellow-400/80 transition-colors" />}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {chapter.title}
          </h2>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4" />
              <span>{chapter.subject || 'General'}</span>
            </div>
            <div className="flex items-center space-x-1">
              {chapter.isActive ? (
                <>
                  <Eye className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">Active</span>
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 text-red-400" />
                  <span className="text-red-400 font-medium">Inactive</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-400/40"
        >
          <Edit3 className="h-4 w-4" />
          <span className="font-medium">Edit</span>
        </button>
      </div>

      <div className="p-6 rounded-lg mb-6 border bg-black/50 border-gray-800 shadow-xl">
        <h3 className="font-semibold mb-3 flex items-center space-x-2 text-white">
          <BookOpen className="h-5 w-5 text-yellow-400" />
          <span>Description</span>
        </h3>
        <p className="leading-relaxed text-gray-300">
          {chapter.description || 'No description available'}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-white">Resources</h3>
        <div className="grid grid-cols-1 gap-4">
          <ResourceCard title="Study Notes" link={chapter.notesLink} icon={FileText} description="PDF notes and study material" onClick={() => openLink(chapter.notesLink)} />
          <ResourceCard title="Daily Practice Problems (DPP)" link={chapter.dppLink} icon={BookOpen} description="Practice questions and solutions" onClick={() => openLink(chapter.dppLink)} />
          <ResourceCard title="Video Lecture" link={chapter.lectureLink} icon={Video} description="YouTube video explanation" onClick={() => openLink(chapter.lectureLink)} />
        </div>
      </div>

      <div className="p-6 rounded-lg border bg-black/50 border-gray-800 shadow-xl">
        <h4 className="font-semibold mb-4 flex items-center space-x-2 text-white">
          <Calendar className="h-5 w-5 text-yellow-400" />
          <span>Chapter Information</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <span className="font-medium text-gray-500">Created:</span>
            <p className="mt-1 text-gray-300">{formatDate(chapter.createdAt)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-500">Last Updated:</span>
            <p className="mt-1 text-gray-300">{formatDate(chapter.updatedAt)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-500">Chapter Order:</span>
            <p className="mt-1 text-gray-300">{chapter.order || 'Not set'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-500">Status:</span>
            <p className={`mt-1 font-medium ${chapter.isActive ? 'text-green-400' : 'text-red-400'}`}>{chapter.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceEditor;
