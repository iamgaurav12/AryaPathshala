import React, { useState, useContext } from 'react';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Video, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = ({ onNavigate }) => {
  const { theme } = useContext(ThemeContext);
  const { coursesData, updateCourseData } = useContext(DataContext);
  const { logout, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate statistics
  const stats = {
    totalChapters: Object.values(coursesData).reduce((total, course) => 
      total + (course.chapters ? course.chapters.length : 0), 0
    ),
    totalVideos: Object.values(coursesData).reduce((total, course) => 
      total + (course.chapters ? course.chapters.filter(ch => ch.lectureLink).length : 0), 0
    ),
    totalNotes: Object.values(coursesData).reduce((total, course) => 
      total + (course.chapters ? course.chapters.filter(ch => ch.notesLink).length : 0), 0
    ),
    totalDPPs: Object.values(coursesData).reduce((total, course) => 
      total + (course.chapters ? course.chapters.filter(ch => ch.dppLink).length : 0), 0
    )
  };

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className={`
      p-6 rounded-xl border transition-all hover:scale-105
      ${theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' 
        : 'bg-white border-gray-200 hover:shadow-lg'
      }
    `}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ icon: Icon, title, description, color, onClick }) => (
    <div 
      onClick={onClick}
      className={`
        p-6 rounded-xl border cursor-pointer transition-all hover:scale-105
        ${theme === 'dark' 
          ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800' 
          : 'bg-white border-gray-200 hover:shadow-lg'
        }
      `}
    >
      <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-20 flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <p className={`text-sm ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {description}
      </p>
    </div>
  );

  const RecentActivity = () => (
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
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {[
          { action: 'Added new chapter', course: 'Class 9', time: '2 hours ago', type: 'add' },
          { action: 'Updated DPP link', course: 'Class 10', time: '5 hours ago', type: 'edit' },
          { action: 'Uploaded video lecture', course: 'Class 9', time: '1 day ago', type: 'video' },
          { action: 'Added chapter notes', course: 'Class 10', time: '2 days ago', type: 'notes' }
        ].map((activity, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${activity.type === 'add' ? 'bg-green-100 text-green-600' :
                activity.type === 'edit' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'video' ? 'bg-red-100 text-red-600' :
                'bg-yellow-100 text-yellow-600'
              }
            `}>
              {activity.type === 'add' ? <Plus className="w-4 h-4" /> :
               activity.type === 'edit' ? <Edit className="w-4 h-4" /> :
               activity.type === 'video' ? <Video className="w-4 h-4" /> :
               <FileText className="w-4 h-4" />
              }
            </div>
            
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {activity.action}
              </p>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {activity.course} • {activity.time}
              </p>
            </div>
          </div>
        ))}
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
            <div>
              <h1 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Admin Dashboard
              </h1>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Welcome back, {user?.username}! Manage your Aryapathshala content
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`
                px-3 py-1 rounded-full text-sm
                ${theme === 'dark' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-green-100 text-green-600'
                }
              `}>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Online</span>
                </div>
              </div>
              
              <button
                onClick={logout}
                className={`
                  p-2 rounded-lg transition-colors
                  ${theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            title="Total Chapters"
            value={stats.totalChapters}
            color="bg-blue-500"
            trend="12"
          />
          <StatCard
            icon={Video}
            title="Video Lectures"
            value={stats.totalVideos}
            color="bg-red-500"
            trend="8"
          />
          <StatCard
            icon={FileText}
            title="Study Notes"
            value={stats.totalNotes}
            color="bg-green-500"
            trend="15"
          />
          <StatCard
            icon={Award}
            title="DPP Sets"
            value={stats.totalDPPs}
            color="bg-purple-500"
            trend="10"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className={`text-xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickActionCard
              icon={Plus}
              title="Add New Chapter"
              description="Create a new chapter for Class 9 or 10"
              color="bg-green-500"
              onClick={() => onNavigate('chapter-manager')}
            />
            <QuickActionCard
              icon={Edit}
              title="Edit Resources"
              description="Update notes, DPP, or video links"
              color="bg-blue-500"
              onClick={() => onNavigate('resource-editor')}
            />
            <QuickActionCard
              icon={Settings}
              title="Course Settings"
              description="Manage course structure and settings"
              color="bg-purple-500"
              onClick={() => onNavigate('course-selector')}
            />
          </div>
        </div>

        {/* Recent Activity & Course Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivity />
          
          {/* Course Overview */}
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
              Course Overview
            </h3>
            
            <div className="space-y-4">
              {Object.entries(coursesData).map(([classKey, course]) => (
                <div key={classKey} className={`
                  p-4 rounded-lg border
                  ${theme === 'dark' 
                    ? 'bg-gray-700/30 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                  }
                `}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {course.name || `Class ${classKey}`}
                    </h4>
                    
                    <button
                      onClick={() => onNavigate('course-selector', classKey)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`flex items-center space-x-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <BookOpen className="w-4 h-4" />
                      <span>{course.chapters?.length || 0} chapters</span>
                    </span>
                    
                    <span className={`flex items-center space-x-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Clock className="w-4 h-4" />
                      <span>Updated today</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;