import React from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen, Users, FileText, ArrowRight } from 'lucide-react';

const CourseSelector = ({ onSelectClass }) => {
  const { coursesData } = useData();

  const classes = [
    {
      id: '9',
      title: 'Class 9',
      description: 'Foundation concepts for high school mathematics and science',
      chapters: coursesData.class9?.length || 0,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      iconBg: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: '10',
      title: 'Class 10',
      description: 'Advanced topics preparing for board examinations',
      chapters: coursesData.class10?.length || 0,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      iconBg: 'bg-purple-100 dark:bg-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Select Class to Manage
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose the class you want to manage chapters, notes, DPP, and lecture links for.
        </p>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            onClick={() => onSelectClass(classItem.id)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className={`${classItem.color} ${classItem.hoverColor} p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${classItem.iconBg} p-3 rounded-full`}>
                      <BookOpen className={`h-8 w-8 ${classItem.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {classItem.title}
                      </h3>
                      <p className="text-blue-100">
                        Manage Content
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {classItem.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Chapters
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {classItem.chapters}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Resources
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {getResourcesCount(classItem.id)}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full ${classItem.color} ${classItem.hoverColor} text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  Manage {classItem.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {(coursesData.class9?.length || 0) + (coursesData.class10?.length || 0)}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Total Chapters</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {getTotalResourcesCount()}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Total Resources</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              2
            </p>
            <p className="text-gray-600 dark:text-gray-400">Classes</p>
          </div>
        </div>
      </div>
    </div>
  );

  function getResourcesCount(classId) {
    const className = `class${classId}`;
    if (!coursesData[className]) return 0;
    
    let count = 0;
    coursesData[className].forEach(chapter => {
      if (chapter.notes) count++;
      if (chapter.dpp) count++;
      if (chapter.lecture) count++;
    });
    return count;
  }

  function getTotalResourcesCount() {
    return getResourcesCount('9') + getResourcesCount('10');
  }
};

export default CourseSelector;