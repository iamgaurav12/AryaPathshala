import React, { useState } from 'react';
import { X, FileText, Video, BookOpen, ExternalLink, AlertCircle, CheckCircle, Clock, Target } from 'lucide-react';

const ResourcePanel = ({ chapter, onClose = false }) => {
  const [loadingResource, setLoadingResource] = useState(null);

  const cleanUrl = (val) => val?.trim().replace(/^ahttps/, 'https');

  const handleResourceClick = (rawUrl, type) => {
    const url = cleanUrl(rawUrl);
    if (!url) return;
    setLoadingResource(type);
    if (type === 'lecture' && (url.includes('youtube.com') || url.includes('youtu.be'))) {
      if (!window.confirm('This will open YouTube in a new tab. Continue?')) {
        setLoadingResource(null);
        return;
      }
    }
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setLoadingResource(null);
    }, 500);
  };

  const ResourceCard = ({ title, description, url, icon: Icon, type, isAvailable }) => (
    <div 
      className={`p-4 rounded-lg border transition-all duration-200 transform hover:scale-[1.02] ${
        isAvailable 
          ? 'cursor-pointer hover:shadow-xl border-gray-800 bg-black/50 hover:border-yellow-500 hover:shadow-yellow-500/20' 
          : 'border-gray-800 bg-black/30'
      }`}
      onClick={() => isAvailable && handleResourceClick(url, type)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isAvailable ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-gray-800'}`}>
            <Icon className={`h-5 w-5 ${isAvailable ? 'text-yellow-400' : 'text-gray-600'}`} />
          </div>
          <div className="flex-1">
            <h4 className={`font-medium ${isAvailable ? 'text-white' : 'text-gray-600'}`}>{title}</h4>
            <p className="text-sm text-gray-500">{isAvailable ? description : 'Not available yet'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {loadingResource === type ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-yellow-400"></div>
          ) : isAvailable ? (
            <>
              <span className="text-xs font-medium text-yellow-400">Available</span>
              <ExternalLink className="h-4 w-4 text-yellow-400" />
            </>
          ) : (
            <span className="text-xs text-gray-600">Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black shadow-xl border border-gray-800 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{chapter.title}</h2>
          <div className="flex items-center space-x-4 mt-2">
            {chapter.subject && <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/50">{chapter.subject}</span>}
            <span className="flex items-center space-x-1 text-sm text-gray-500"><Clock className="h-4 w-4" /><span>Study Material</span></span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg transition-all hover:bg-gray-800 text-gray-500 hover:text-yellow-400"><X className="h-6 w-6" /></button>
      </div>

      <div className="p-4 rounded-lg mb-6 bg-black/50 border border-gray-800">
        <p className="text-gray-300">{chapter.description}</p>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold flex items-center space-x-2 text-white"><BookOpen className="h-5 w-5 text-yellow-400" /><span>Study Resources</span></h3>
        <div className="grid gap-4">
          <ResourceCard title="Study Notes" description="Comprehensive notes & theory" url={chapter.notesLink} icon={FileText} type="notes" isAvailable={!!chapter.notesLink} />
          <ResourceCard title="Daily Practice Problems (DPP)" description="Practice questions with solutions" url={chapter.dppLink} icon={BookOpen} type="dpp" isAvailable={!!chapter.dppLink} />
          <ResourceCard title="Video Lecture" description="Detailed video explanations" url={chapter.lectureLink} icon={Video} type="lecture" isAvailable={!!chapter.lectureLink} />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1"><AlertCircle className="h-4 w-4" /><span>Click on available resources to open them.</span></div>
          <span>Updated recently</span>
        </div>
      </div>
    </div>
  );
};

export default ResourcePanel;
