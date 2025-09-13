import React from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen, Users, FileText, Video, Plus, BarChart3 } from 'lucide-react';

const AdminDashboard = ({ onNavigate }) => {
  const { courses, resetData } = useData();

  const stats = {
    class9Chapters: courses.class9?.length || 0,
    class10Chapters: courses.class10?.length || 0,
    totalNotes: (courses.class9?.filter(ch => ch.resources?.notes).length || 0) + 
                (courses.class10?.filter(ch => ch.resources?.notes).length || 0),
    totalLectures: (courses.class9?.filter(ch => ch.resources?.lecture).length || 0) + 
                   (courses.class10?.filter(ch => ch.resources?.lecture).length || 0),
    totalDPPs: (courses.class9?.filter(ch => ch.resources?.dpp).length || 0) + 
               (courses.class10?.filter(ch => ch.resources?.dpp).length || 0)
  };

  const quickActions = [
    {
      title: 'Manage Class 9',
      description: 'Add or edit Class 9 chapters and resources',
      icon: BookOpen,
      color: 'blue',
      action: () => onNavigate('chapters', 'class9')
    },
    {
      title: 'Manage Class 10',
      description: 'Add or edit Class 10 chapters and resources',
      icon: BookOpen,
      color: 'green',
      action: () => onNavigate('chapters', 'class10')
    },
    {
      title: 'View Courses',
      description: 'Browse all available courses',
      icon: Users,
      color: 'purple',
      action: () => onNavigate('courses')
    }
  ];

  const statCards = [
    {
      title: 'Class 9 Chapters',
      value: stats.class9Chapters,
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Class 10 Chapters',
      value: stats.class10Chapters,
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Total Notes',
      value: stats.totalNotes,
      icon: FileText,
      color: 'yellow'
    },
    {
      title: 'Total Lectures',
      value: stats.totalLectures,
      icon: Video,
      color: 'red'
    }
  ];

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      resetData();
      alert('Data has been reset successfully!');
    }
  };

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Admin Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your course content, chapters, and resources from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
            green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
            yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
            red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
          };

          return (
            <div
              key={index}
              className={`${colorClasses[stat.color]} border-2 rounded-xl p-6 transition-all duration-200 hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-75">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 opacity-75" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            const colorClasses = {
              blue: 'bg-blue-500 hover:bg-blue-600',
              green: 'bg-green-500 hover:bg-green-600',
              purple: 'bg-purple-500 hover:bg-purple-600'
            };

            return (
              <button
                key={index}
                onClick={action.action}
                className="text-left p-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses[action.color]} text-white group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {action.title}
                    </h4>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          System Overview
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Content Summary
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Total Chapters:</span>
                  <span className="font-medium">{stats.class9Chapters + stats.class10Chapters}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Notes:</span>
                  <span className="font-medium">{stats.totalNotes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available DPPs:</span>
                  <span className="font-medium">{stats.totalDPPs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Lectures:</span>
                  <span className="font-medium">{stats.totalLectures}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Completion Status
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Class 9 Progress</span>
                    <span>{stats.class9Chapters > 0 ? '100%' : '0%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: stats.class9Chapters > 0 ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Class 10 Progress</span>
                    <span>{stats.class10Chapters > 0 ? '100%' : '0%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: stats.class10Chapters > 0 ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
          Danger Zone
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Reset all data to default state. This action cannot be undone.
        </p>
        <button
          onClick={handleResetData}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;