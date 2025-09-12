import React from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen, Users, FileText, Link, TrendingUp, Calendar } from 'lucide-react';

const AdminDashboard = ({ onNavigate }) => {
  const { coursesData } = useData();

  const stats = [
    {
      title: 'Total Chapters',
      value: (coursesData.class9?.length || 0) + (coursesData.class10?.length || 0),
      icon: BookOpen,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Class 9 Chapters',
      value: coursesData.class9?.length || 0,
      icon: FileText,
      color: 'bg-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Class 10 Chapters',
      value: coursesData.class10?.length || 0,
      icon: FileText,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Total Resources',
      value: getAllResourcesCount(),
      icon: Link,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  function getAllResourcesCount() {
    let count = 0;
    ['class9', 'class10'].forEach(className => {
      if (coursesData[className]) {
        coursesData[className].forEach(chapter => {
          if (chapter.notes) count++;
          if (chapter.dpp) count++;
          if (chapter.lecture) count++;
        });
      }
    });
    return count;
  }

  const quickActions = [
    {
      title: 'Manage Courses',
      description: 'Add, edit, or remove chapters and resources',
      action: () => onNavigate('courses'),
      icon: BookOpen,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'View Data',
      description: 'Overview of all courses and statistics',
      action: () => onNavigate('data'),
      icon: TrendingUp,
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  const recentActivity = [
    {
      action: 'System initialized',
      time: 'Just now',
      type: 'info'
    },
    {
      action: 'Admin panel accessed',
      time: '1 minute ago',
      type: 'success'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h2>
            <p className="text-blue-100">
              Manage your AryaPathshala content efficiently
            </p>
          </div>
          <div className="hidden md:block">
            <Calendar className="h-12 w-12 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200 dark:border-gray-700`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white">Version</h4>
            <p className="text-gray-600 dark:text-gray-400">v1.0.0</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white">Status</h4>
            <p className="text-green-600 dark:text-green-400">Active</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white">Last Updated</h4>
            <p className="text-gray-600 dark:text-gray-400">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;