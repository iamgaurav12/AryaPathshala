import React, { useState, useContext } from 'react';
import { 
  ArrowLeft, 
  Save, 
  FileText, 
  Video, 
  BookOpen, 
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Upload,
  Link,
  Eye,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { DataContext } from '../../context/DataContext';

const ResourceEditor = ({ onBack }) => {
  const { theme } = useContext(ThemeContext);
  const { coursesData, updateCourseData } = useContext(DataContext);
  const [selectedClass, setSelectedClass] = useState('9');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [resources, setResources] = useState({
    notesLink: '',
    dppLink: '',
    lectureLink: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const currentCourse = coursesData[selectedClass] || { chapters: [] };
  const chapters = currentCourse.chapters || [];

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setResources({
      notesLink: chapter.notesLink || '',
      dppLink: chapter.dppLink || '',
      lectureLink: chapter.lectureLink || ''
    });
  };

  const handleResourceChange = (type, value) => {
    setResources(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const validateUrl = (url) => {
    if (!url) return true; // Empty URLs are allowed
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSaveResources = async () => {
    if (!selectedChapter) return;

    // Validate URLs
    const invalidUrls = [];
    if (resources.notesLink && !validateUrl(resources.notesLink)) invalidUrls.push('Notes');
    if (resources.dppLink && !validateUrl(resources.dppLink)) invalidUrls.push('DPP');
    if (resources.lectureLink && !validateUrl(resources.lectureLink)) invalidUrls.push('Lecture');

    if (invalidUrls.length > 0) {
      alert(`Please provide valid URLs for: ${invalidUrls.join(', ')}`);
      return;
    }

    setIsUpdating(true);

    try {
      // Update the selected chapter with new resource links
      const updatedChapters = chapters.map(chapter =>
        chapter.id === selectedChapter.id
          ? { ...chapter, ...resources }
          : chapter
      );

      // Update course data
      await updateCourseData(selectedClass, {
        ...currentCourse,
        chapters: updatedChapters
      });

      // Update selected chapter state
      setSelectedChapter(prev => ({ ...prev, ...resources }));
      setLastSaved(new Date());
      
    } catch (error) {
      alert('Failed to save resources. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTestLink = (url) => {
    if (!url) {
      alert('Please enter a URL first');
      return;
    }
    if (!validateUrl(url)) {
      alert('Please enter a valid URL');
      return;
    }
    window.open(url, '_blank');
  };

  const ResourceInput = ({ 
    icon: Icon, 
    label, 
    type, 
    placeholder, 
    value, 
    onChange, 
    color,
    description 
  }) => (
    <div className={`
      p-6 rounded-xl border transition-all hover:shadow-md
      ${theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white border-gray-200'
      }
    `}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <h3 className={`font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {label}
          </h3>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {description}
          </p>
        </div>
        <div className="ml-auto">
          {value ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(type, e.target.value)}
            placeholder={placeholder}
            className={`
              w-full px-4 py-3 rounded-lg border transition-colors pr-24
              ${theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              }
            `}
          />
          <div className="absolute right-2 top-2 flex space-x-1">
            <button
              onClick={() => handleTestLink(value)}
              disabled={!value}
              className={`
                p-1.5 rounded transition-colors
                ${value 
                  ? 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20' 
                  : 'text-gray-400 cursor-not-allowed'
                }
              `}
              title="Test link"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={() => onChange(type, '')}
              disabled={!value}
              className={`
                p-1.5 rounded transition-colors
                ${value 
                  ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
                  : 'text-gray-400 cursor-not-allowed'
                }
              `}
              title="Clear"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {value && !validateUrl(value) && (
          <p className="text-sm text-red-500 flex items-center space-x-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Please enter a valid URL</span>
          </p>
        )}
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
                  Resource Editor
                </h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Update notes, DPP, and lecture links for chapters
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {lastSaved && (
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Last saved: {lastSaved.toLocaleTimeString()}
                </div>
              )}
              
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSelectedChapter(null);
                }}
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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chapter Selection */}
          <div className="lg:col-span-1">
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Select Chapter
            </h2>
            
            <div className="space-y-2">
              {chapters.length > 0 ? chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterSelect(chapter)}
                  className={`
                    w-full p-4 rounded-lg border text-left transition-all
                    ${selectedChapter?.id === chapter.id
                      ? theme === 'dark'
                        ? 'bg-blue-900/30 border-blue-500 text-blue-300'
                        : 'bg-blue-50 border-blue-500 text-blue-700'
                      : theme === 'dark'
                        ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 text-gray-300'
                        : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                    }
                  `}
                >
                  <div className="font-medium mb-1">{chapter.name}</div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${
                      chapter.notesLink ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <div className={`w-2 h-2 rounded-full ${
                      chapter.dppLink ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <div className={`w-2 h-2 rounded-full ${
                      chapter.lectureLink ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                </button>
              )) : (
                <div className={`
                  p-6 rounded-lg border text-center
                  ${theme === 'dark' 
                    ? 'bg-gray-800/30 border-gray-700' 
                    : 'bg-white border-gray-200'
                  }
                `}>
                  <BookOpen className={`w-8 h-8 mx-auto mb-2 ${
                    theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    No chapters found for Class {selectedClass}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Resource Editor */}
          <div className="lg:col-span-3">
            {selectedChapter ? (
              <div className="space-y-6">
                {/* Chapter Info */}
                <div className={`
                  p-6 rounded-xl border
                  ${theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700' 
                    : 'bg-white border-gray-200'
                  }
                `}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={`text-xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {selectedChapter.name}
                      </h2>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Class {selectedClass} • {selectedChapter.description || 'No description'}
                      </p>
                    </div>
                    
                    <div className={`
                      px-3 py-1 rounded-full text-sm
                      ${theme === 'dark' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-blue-100 text-blue-600'
                      }
                    `}>
                      Editing Resources
                    </div>
                  </div>

                  {/* Resource Status Summary */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        resources.notesLink ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium">Notes</p>
                      <p className={`text-xs ${
                        resources.notesLink ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {resources.notesLink ? 'Available' : 'Missing'}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        resources.dppLink ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium">DPP</p>
                      <p className={`text-xs ${
                        resources.dppLink ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {resources.dppLink ? 'Available' : 'Missing'}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        resources.lectureLink ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Video className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium">Lecture</p>
                      <p className={`text-xs ${
                        resources.lectureLink ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {resources.lectureLink ? 'Available' : 'Missing'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resource Input Forms */}
                <div className="space-y-6">
                  <ResourceInput
                    icon={FileText}
                    label="Study Notes"
                    type="notesLink"
                    placeholder="https://drive.google.com/file/d/your-notes-file-id"
                    value={resources.notesLink}
                    onChange={handleResourceChange}
                    color="bg-blue-500"
                    description="Google Drive link for chapter notes PDF"
                  />

                  <ResourceInput
                    icon={BookOpen}
                    label="Daily Practice Problems (DPP)"
                    type="dppLink"
                    placeholder="https://drive.google.com/file/d/your-dpp-file-id"
                    value={resources.dppLink}
                    onChange={handleResourceChange}
                    color="bg-green-500"
                    description="Google Drive link for practice problems PDF"
                  />

                  <ResourceInput
                    icon={Video}
                    label="Video Lecture"
                    type="lectureLink"
                    placeholder="https://youtube.com/watch?v=your-video-id"
                    value={resources.lectureLink}
                    onChange={handleResourceChange}
                    color="bg-red-500"
                    description="YouTube link for video lecture"
                  />
                </div>

                {/* Save Button */}
                <div className="sticky bottom-6 z-10">
                  <div className={`
                    p-4 rounded-xl border backdrop-blur-sm
                    ${theme === 'dark' 
                      ? 'bg-gray-800/95 border-gray-700' 
                      : 'bg-white/95 border-gray-200'
                    }
                  `}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {Object.values(resources).filter(Boolean).length}/3 resources added
                        </div>
                        
                        {isUpdating && (
                          <div className="flex items-center space-x-2 text-blue-500">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Saving...</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            setResources({
                              notesLink: selectedChapter.notesLink || '',
                              dppLink: selectedChapter.dppLink || '',
                              lectureLink: selectedChapter.lectureLink || ''
                            });
                          }}
                          className={`
                            px-4 py-2 rounded-lg border transition-colors
                            ${theme === 'dark' 
                              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }
                          `}
                        >
                          Reset
                        </button>
                        
                        <button
                          onClick={handleSaveResources}
                          disabled={isUpdating}
                          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                        >
                          {isUpdating ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              <span>Save Resources</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* No Chapter Selected */
              <div className={`
                p-12 rounded-xl border text-center
                ${theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700' 
                  : 'bg-white border-gray-200'
                }
              `}>
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <BookOpen className={`w-8 h-8 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Select a Chapter to Edit
                </h3>
                
                <p className={`text-sm mb-6 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Choose a chapter from the sidebar to manage its resources
                </p>

                <div className={`
                  p-4 rounded-lg border-2 border-dashed max-w-md mx-auto
                  ${theme === 'dark' 
                    ? 'border-gray-600 bg-gray-800/20' 
                    : 'border-gray-300 bg-gray-50'
                  }
                `}>
                  <h4 className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Resource Types You Can Manage:
                  </h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Study Notes (PDF via Google Drive)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-green-500" />
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Daily Practice Problems (PDF via Google Drive)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-red-500" />
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Video Lectures (YouTube Links)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceEditor;