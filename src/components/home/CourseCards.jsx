import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCards = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 'class-9', title: 'Class 9th', subtitle: 'Foundation Building', description: 'Build strong fundamentals with comprehensive coverage of all subjects, preparing you for Class 10th boards.', gradient: 'from-yellow-500 to-yellow-600', route: '/class9' },
    { id: 'class-10', title: 'Class 10th', subtitle: 'Board Exam Excellence', description: 'Master your board exams with targeted preparation, practice papers, and expert guidance for top scores.', gradient: 'from-yellow-600 to-yellow-400', route: '/class10' }
  ];

  const subjectIcons = { Mathematics: '🔢', Science: '🧪', English: '📚', Hindi: '📖', "Social Science": '🌍' };

  return (
    <section id="courses" className="py-20 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-500 rounded-full opacity-5 animate-float"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-yellow-600 rotate-45 opacity-5 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Learning Path</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Select your class and embark on a journey of academic excellence with our expert guidance.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {courses.map(course => (
            <div key={course.id} className="group relative bg-black rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 transform hover:-translate-y-4 transition-all duration-500 border border-gray-800 overflow-hidden cursor-pointer" onClick={() => navigate(course.route)}>
              <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10 mb-8">
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>{course.title}</h3>
                <p className="text-lg font-semibold text-white mt-2 mb-4">{course.subtitle}</p>
                <p className="text-gray-300 leading-relaxed">{course.description}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Subjects Covered</h4>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(subjectIcons).map(([subject, icon]) => (
                    <div key={subject} className="flex items-center space-x-2 px-4 py-2 bg-black rounded-xl shadow-md transform hover:-translate-y-1 transition-all duration-300 border border-gray-700 group-hover:border-yellow-500/50">
                      <span className="text-lg">{icon}</span>
                      <span className="text-sm font-medium text-gray-300">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className={`w-full py-4 bg-gradient-to-r ${course.gradient} text-black rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 transform hover:-translate-y-1 transition-all duration-300 group-hover:scale-105`}>
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Learning {course.title}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`.animate-float { animation: float 6s ease-in-out infinite; } @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }`}</style>
    </section>
  );
};

export default CourseCards;
