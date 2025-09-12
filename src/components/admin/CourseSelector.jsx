import React, { useState, useContext } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Settings, 
  Users, 
  BarChart3,
  Edit,
  Trash2,
  Plus,
  Eye,
  FileText,
  Video,
  Calendar,
  Award,
  TrendingUp,
  Download,
  Upload,
  Save,
  RefreshCw
} from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { DataContext } from '../../context/DataContext';

const CourseSelector = ({ onBack, onNavigate }) => {
  const { theme } = useContext(ThemeContext);
  const { coursesData, updateCourseData } = useContext(DataContext);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseSettings, setCourseSettings] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: 'medium',
    prerequisites: '',
    objectives: '',
    isActive: true
  });

  const courses = Object.entries(coursesData).map(([key, course]) => ({
    id: key,
    ...course,
    chapters: course.chapters || []
  }));

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCourseSettings({
      name: course.name || `Class ${course.id}`,
      description: course.description || '',
      duration: course.duration || '',
      difficulty: course.difficulty || 'medium',
      prerequisites: course.prerequisites || '',
      objectives: course.objectives || '',
      isActive: course.isActive !== false
    });
  };

  const handleEditCourse = () => {
    setEditingCourse(selectedCourse);
  };

  const handleSaveCourse = () => {
    if (!selectedCourse) return;

    const updatedCourse = {
      ...selectedCourse,
      ...courseSettings
    };

    updateCourseData(selectedCourse.id, updatedCourse);
    setSelectedCourse(updatedCourse);
    setEditingCourse(null);
  };

  const handleDeleteChapter = (chapterId) => {
    if (!selectedCourse) return;
    if (!window.confirm('Are you sure you want to delete this chapter?')) return;

    const updatedChapters = selectedCourse.chapters.filter(ch => ch.id !== chapterId);
    const updatedCourse = { ...selectedCourse, chapters: updatedChapters };
    
    updateCourseData(selectedCourse.id, updatedCourse);
    setSelectedCourse(updatedCourse);
  };

  const getChapterStats = (chapters) => {
    return {
      total: chapters.length,
      withNotes: chapters.filter(ch => ch.notesLink).length,
      withDPP: chapters.filter(ch => ch.dppLink).length,
      withVideos: chapters.filter(ch => ch.lectureLink).length,
      completed: chapters.filter(ch => ch.notesLink && ch.dppLink && ch.lectureLink).length
    };
  };

  const CourseCard = ({ course, onSelect, isSelected }) => {
    const stats = getChapterStats(course.chapters);
    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
      <div
        onClick={() => onSelect(course)}
        className={`
          p-6 rounded-xl border cursor-pointer transition-all hover:shadow-lg
          ${isSelected
            ? theme === 'dark'
              ? 'bg-blue-900/30 border-blue-500 ring-2 ring-blue-500/20'
              : 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20'
            : theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
              : 'bg-white border-gray-200 hover:shadow-xl'
          }
        `}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}>
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {course.name || `Class ${course.id}`}
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stats.total} chapters • {completionRate}% complete
              </p>
            </div>
          </div>

          <div className={`
            px-2 py-1 rounded-full text-xs
            ${course.isActive !== false
              ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400'
            }
          `}>
            {course.isActive !== false ? 'Active' : 'Inactive'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className={`w-full h-2 rounded-full ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stats.withNotes}
            </div>
            <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Notes
            </div>
          </div>
          <div className="text-center">
            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stats.withDPP}
            </div>
            <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              DPP
            </div>
          </div>
          <div className="text-center">
            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stats.withVideos}
            </div>
            <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Videos
            </div>
          </div>
          <div className="text-center">
            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stats.completed}
            </div>
            <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Complete
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChapterListItem = ({ chapter, onDelete }) => (
    <div className={`
      p-4 rounded-lg border transition-all hover:shadow-sm
      ${theme === 'dark' 
        ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
        : 'bg-white border-gray-200 hover:bg-gray-50'
      }
    `}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className={`font-medium mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {chapter.name}
          </h4>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {chapter.description || 'No description provided'}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Resource Status */}
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              chapter.notesLink ? 'bg-green-500' : 'bg-gray-400'
            }`} title="Notes" />
            <div className={`w-2 h-2 rounded-full ${
              chapter.dppLink ? 'bg-green-500' : 'bg-gray-400'
            }`} title="DPP" />
            <div className={`w-2 h-2 rounded-full ${
              chapter.lectureLink ? 'bg-green-500' : 'bg-gray-400'
            }`} title="Video" />
          </div>

          {/* Actions */}
          <button
            onClick={() => onDelete(chapter.id)}
            className="text-red-500 hover:text-red-600 p-1"
            title="Delete chapter"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
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
                  Course Management
                </h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Manage course settings and structure
                </p>
              </div>
            </div>

            {selectedCourse && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('chapter-manager')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Chapter</span>
                </button>
                
                <button
                  onClick={() => onNavigate('resource-editor')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Resources</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course List */}
          <div className="lg:col-span-1">
            <h2 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Available Courses
            </h2>
            
            <div className="space-y-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={handleSelectCourse}
                  isSelected={selectedCourse?.id === course.id}
                />
              ))}
            </div>
          </div>

          {/* Course Details */}
          <div className="lg:col-span-2">
            {selectedCourse ? (
              <div className="space-y-6">
                {/* Course Header */}
                <div className={`
                  p-6 rounded-xl border
                  ${theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700' 
                    : 'bg-white border-gray-200'
                  }
                `}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {selectedCourse.name || `Class ${selectedCourse.id}`}
                      </h2>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Course ID: {selectedCourse.id} • {selectedCourse.chapters.length} chapters
                      </p>
                    </div>
                    
                    <button
                      onClick={handleEditCourse}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(() => {
                      const stats = getChapterStats(selectedCourse.chapters);
                      return [
                        { label: 'Chapters', value: stats.total, icon: BookOpen, color: 'text-blue-500' },
                        { label: 'Notes', value: stats.withNotes, icon: FileText, color: 'text-green-500' },
                        { label: 'Videos', value: stats.withVideos, icon: Video, color: 'text-red-500' },
                        { label: 'Complete', value: stats.completed, icon: Award, color: 'text-purple-500' }
                      ].map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                          </div>
                          <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {stat.value}
                          </div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {stat.label}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* Course Settings (when editing) */}
                {editingCourse && (
                  <div className={`
                    p-6 rounded-xl border
                    ${theme === 'dark' 
                      ? 'bg-gray-800/50 border-gray-700' 
                      : 'bg-white border-gray-200'
                    }
                  `}>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Course Settings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Course Name
                        </label>
                        <input
                          type="text"
                          value={courseSettings.name}
                          onChange={(e) => setCourseSettings(prev => ({ ...prev, name: e.target.value }))}
                          className={`
                            w-full px-4 py-2 rounded-lg border transition-colors
                            ${theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                          `}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Description
                        </label>
                        <textarea
                          value={courseSettings.description}
                          onChange={(e) => setCourseSettings(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                          placeholder="Brief description of the course"
                          className={`
                            w-full px-4 py-2 rounded-lg border transition-colors
                            ${theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                          `}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Difficulty Level
                        </label>
                        <select
                          value={courseSettings.difficulty}
                          onChange={(e) => setCourseSettings(prev => ({ ...prev, difficulty: e.target.value }))}
                          className={`
                            w-full px-4 py-2 rounded-lg border transition-colors
                            ${theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                          `}
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>

                      <div>
                        <label className={`flex items-center space-x-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <input
                            type="checkbox"
                            checked={courseSettings.isActive}
                            onChange={(e) => setCourseSettings(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>Course is active</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        onClick={() => setEditingCourse(null)}
                        className={`
                          px-4 py-2 rounded-lg border transition-colors
                          ${theme === 'dark' 
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }
                        `}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveCourse}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Chapters List */}
                <div className={`
                  p-6 rounded-xl border
                  ${theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700' 
                    : 'bg-white border-gray-200'
                  }
                `}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Chapters ({selectedCourse.chapters.length})
                    </h3>
                    
                    <button
                      onClick={() => onNavigate('chapter-manager')}
                      className="text-blue-500 hover:text-blue-600 flex items-center space-x-1 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Chapter</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedCourse.chapters.length > 0 ? (
                      selectedCourse.chapters.map((chapter) => (
                        <ChapterListItem
                          key={chapter.id}
                          chapter={chapter}
                          onDelete={handleDeleteChapter}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className={`w-12 h-12 mx-auto mb-3 ${
                          theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                        }`} />
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          No chapters added yet
                        </p>
                        <button
                          onClick={() => onNavigate('chapter-manager')}
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          Add Your First Chapter
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`
                    p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md
                    ${theme === 'dark' 
                      ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
                      : 'bg-white border-gray-200 hover:shadow-lg'
                    }
                  `}
                  onClick={() => onNavigate('chapter-manager')}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                        <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Manage Chapters
                      </h4>
                    </div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Add, edit, or remove chapters from this course
                    </p>
                  </div>

                  <div className={`
                    p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md
                    ${theme === 'dark' 
                      ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
                      : 'bg-white border-gray-200 hover:shadow-lg'
                    }
                  `}
                  onClick={() => onNavigate('resource-editor')}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                        <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Edit Resources
                      </h4>
                    </div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Update notes, DPP, and video links for chapters
                    </p>
                  </div>

                  <div className={`
                    p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md
                    ${theme === 'dark' 
                      ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
                      : 'bg-white border-gray-200 hover:shadow-lg'
                    }
                  `}
                  onClick={() => window.location.href = '/'}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
                        <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Preview Course
                      </h4>
                    </div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      View how students will see this course
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* No Course Selected */
              <div className={`
                p-12 rounded-xl border text-center
                ${theme === 'dark' 
                  ? 'bg-gray-800/30 border-gray-700' 
                  : 'bg-white border-gray-200'
                }
              `}>
                <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <BookOpen className={`w-10 h-10 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </div>
                
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Select a Course to Manage
                </h3>
                
                <p className={`text-sm mb-8 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Choose a course from the sidebar to view details and manage its content
                </p>

                <div className={`
                  max-w-md mx-auto p-6 rounded-lg border-2 border-dashed
                  ${theme === 'dark' 
                    ? 'border-gray-600 bg-gray-800/20' 
                    : 'border-gray-300 bg-gray-50'
                  }
                `}>
                  <h4 className={`font-medium mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    What you can manage:
                  </h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-blue-500" />
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Course settings and information
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-green-500" />
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Chapter structure and content
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-purple-500" />
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Resource links and materials
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-red-500" />
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Progress tracking and analytics
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

export default CourseSelector;