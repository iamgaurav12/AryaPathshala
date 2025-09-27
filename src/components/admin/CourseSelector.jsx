import React from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen, Users, FileText, Video, ArrowRight } from 'lucide-react';

const CourseSelector = ({ onSelectClass }) => {
  const { courses } = useData();

  const courseData = [
    {
      id: 'class9',
      title: 'Class 9',
      description: 'Foundation level courses for Class 9 students',
      chapters: courses.class9?.length || 0,
      color: 'yellow',
      gradient: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-gray-900 to-black',
      borderGradient: 'from-yellow-500/20 to-yellow-600/20',
      stats: {
        notes: courses.class9?.filter(ch => ch.resources?.notes).length || 0,
        lectures: courses.class9?.filter(ch => ch.resources?.lecture).length || 0,
        dpps: courses.class9?.filter(ch => ch.resources?.dpp).length || 0
      }
    },
    {
      id: 'class10',
      title: 'Class 10',
      description: 'Advanced level courses for Class 10 students',
      chapters: courses.class10?.length || 0,
      color: 'yellow',
      gradient: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-gray-900 to-black',
      borderGradient: 'from-yellow-500/20 to-yellow-600/20',
      stats: {
        notes: courses.class10?.filter(ch => ch.resources?.notes).length || 0,
        lectures: courses.class10?.filter(ch => ch.resources?.lecture).length || 0,
        dpps: courses.class10?.filter(ch => ch.resources?.dpp).length || 0
      }
    }
  ];

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Select a Class to Manage
        </h2>
        <p className="text-gray-400">
          Choose which class you want to edit chapters and resources for.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {courseData.map((course) => (
          <div
            key={course.id}
            className={`bg-gradient-to-br ${course.bgGradient} border border-gray-800 hover:border-yellow-400/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/10 hover:scale-105 cursor-pointer group relative overflow-hidden`}
            onClick={() => onSelectClass('chapters', course.id)}
          >
            {/* Subtle background glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${course.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`p-4 bg-gradient-to-r ${course.gradient} rounded-xl text-black group-hover:scale-110 transition-transform duration-200 shadow-lg shadow-yellow-400/30`}>
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200">
                      {course.title}
                    </h3>
                    <p className="text-gray-400">
                      {course.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-2 transition-all duration-200" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/70 backdrop-blur rounded-xl p-4 text-center border border-gray-800 group-hover:border-yellow-400/30 transition-colors duration-200">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {course.chapters}
                  </p>
                  <p className="text-sm text-gray-400">
                    Chapters
                  </p>
                </div>
                
                <div className="bg-gray-900/70 backdrop-blur rounded-xl p-4 text-center border border-gray-800 group-hover:border-yellow-400/30 transition-colors duration-200">
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {course.stats.notes + course.stats.dpps}
                  </p>
                  <p className="text-sm text-gray-400">
                    Resources
                  </p>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-400">
                    <FileText className="h-4 w-4 mr-2 text-yellow-400" />
                    Notes Available
                  </span>
                  <span className="font-medium text-white">
                    {course.stats.notes}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-400">
                    <Video className="h-4 w-4 mr-2 text-yellow-400" />
                    Lectures Available
                  </span>
                  <span className="font-medium text-white">
                    {course.stats.lectures}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-gray-400">
                    <BookOpen className="h-4 w-4 mr-2 text-yellow-400" />
                    DPPs Available
                  </span>
                  <span className="font-medium text-white">
                    {course.stats.dpps}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <div className={`w-full bg-gradient-to-r ${course.gradient} text-black py-3 px-6 rounded-xl font-medium text-center group-hover:shadow-xl group-hover:shadow-yellow-400/40 transition-all duration-200 hover:from-yellow-400 hover:to-yellow-500`}>
                  Manage {course.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-12 bg-gray-900/70 backdrop-blur rounded-2xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">
          Overall Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center bg-black/40 rounded-lg p-4 border border-gray-800">
            <p className="text-2xl font-bold text-yellow-400">
              {(courses.class9?.length || 0) + (courses.class10?.length || 0)}
            </p>
            <p className="text-sm text-gray-400">Total Chapters</p>
          </div>
          <div className="text-center bg-black/40 rounded-lg p-4 border border-gray-800">
            <p className="text-2xl font-bold text-yellow-400">
              {courseData.reduce((total, course) => total + course.stats.notes, 0)}
            </p>
            <p className="text-sm text-gray-400">Total Notes</p>
          </div>
          <div className="text-center bg-black/40 rounded-lg p-4 border border-gray-800">
            <p className="text-2xl font-bold text-yellow-400">
              {courseData.reduce((total, course) => total + course.stats.lectures, 0)}
            </p>
            <p className="text-sm text-gray-400">Total Lectures</p>
          </div>
          <div className="text-center bg-black/40 rounded-lg p-4 border border-gray-800">
            <p className="text-2xl font-bold text-yellow-400">
              {courseData.reduce((total, course) => total + course.stats.dpps, 0)}
            </p>
            <p className="text-sm text-gray-400">Total DPPs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSelector;