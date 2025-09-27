import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const courses = [
    {
      id: 'class-9',
      title: 'Class 9th',
      subtitle: 'Foundation Building Year',
      description: 'Build strong fundamentals with comprehensive coverage of all subjects. Perfect preparation for Class 10th boards.',
      subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
      features: [
        { icon: '🎥', text: 'HD Video Lectures', count: '200+' },
        { icon: '📚', text: 'Study Materials', count: '150+' },
        { icon: '📝', text: 'Practice Papers', count: '50+' },
        { icon: '🎯', text: 'Mock Tests', count: '25+' }
      ],
      stats: {
        students: '2000+',
        rating: '4.9',
        completion: '95%'
      },
      gradient: 'from-yellow-500 via-yellow-400 to-yellow-600',
      bgPattern: 'from-gray-900 to-black',
      route: '/class-9'
    },
    {
      id: 'class-10',
      title: 'Class 10th',
      subtitle: 'Board Exam Excellence',
      description: 'Master your board exams with targeted preparation, practice papers, and expert guidance for top scores.',
      subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'],
      features: [
        { icon: '🎥', text: 'HD Video Lectures', count: '250+' },
        { icon: '📚', text: 'Study Materials', count: '200+' },
        { icon: '📝', text: 'Board Papers', count: '75+' },
        { icon: '🏆', text: 'Sample Papers', count: '40+' }
      ],
      stats: {
        students: '3000+',
        rating: '4.8',
        completion: '98%'
      },
      gradient: 'from-yellow-600 via-yellow-500 to-yellow-400',
      bgPattern: 'from-gray-900 to-black',
      route: '/class-10'
    }
  ];

  const subjectIcons = {
    'Mathematics': '🔢',
    'Science': '🧪',
    'English': '📚',
    'Hindi': '📖',
    'Social Science': '🌍'
  };

  return (
    <section id="courses" className="py-20 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-5 animate-float"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-700 rotate-45 opacity-5 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full opacity-5 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Learning Path</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select your class and embark on a journey of academic excellence with our comprehensive study materials and expert guidance.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`group relative bg-gradient-to-br ${course.bgPattern} rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/20 transform hover:-translate-y-4 transition-all duration-500 border border-gray-800 overflow-hidden cursor-pointer`}
              onMouseEnter={() => setHoveredCard(course.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(course.route)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-40 transform group-hover:scale-110 transition-all duration-300">
                {index === 0 ? '📖' : '🎓'}
              </div>
              <div className="absolute bottom-4 left-4 text-lg opacity-20 group-hover:opacity-40 transform group-hover:rotate-12 transition-all duration-300 text-yellow-500">
                ⭐
              </div>

              {/* Course Header */}
              <div className="relative z-10 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-3xl font-bold bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                    {course.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-yellow-500">⭐</span>
                    <span className="text-sm font-semibold text-gray-300">
                      {course.stats.rating}
                    </span>
                  </div>
                </div>
                
                <p className="text-lg font-semibold text-white mb-2">
                  {course.subtitle}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Subjects Grid */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                  Subjects Covered
                </h4>
                <div className="flex flex-wrap gap-3">
                  {course.subjects.map((subject, subIndex) => (
                    <div
                      key={subject}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-xl shadow-md hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1 transition-all duration-300 border border-gray-700 group-hover:border-yellow-500/50"
                      style={{ 
                        animationDelay: `${subIndex * 0.1}s`,
                        background: hoveredCard === course.id ? 'rgba(34, 197, 94, 0.1)' : ''
                      }}
                    >
                      <span className="text-lg">{subjectIcons[subject]}</span>
                      <span className="text-sm font-medium text-gray-300">
                        {subject}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
                  What You'll Get
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {course.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3 p-3 bg-gray-800 rounded-xl shadow-sm hover:shadow-md hover:shadow-yellow-500/10 transition-all duration-300 border border-gray-700"
                    >
                      <span className="text-xl">{feature.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-300">
                          {feature.text}
                        </p>
                        <p className={`text-xs font-bold bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent`}>
                          {feature.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Bar */}
              <div className="mb-6 p-4 bg-gray-800/80 rounded-xl backdrop-blur-sm border border-gray-700/50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">
                      {course.stats.students}
                    </div>
                    <div className="text-xs text-gray-400">Students</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {course.stats.rating}/5
                    </div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {course.stats.completion}
                    </div>
                    <div className="text-xs text-gray-400">Success</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-4 bg-gradient-to-r ${course.gradient} text-black rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 transform hover:-translate-y-1 transition-all duration-300 group-hover:scale-105`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(course.route);
                }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Start Learning {course.title}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </span>
              </button>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${course.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                   style={{ 
                     background: `linear-gradient(135deg, transparent, transparent), linear-gradient(135deg, ${course.gradient.split(' ').join(', ')})`,
                     mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                     maskComposite: 'xor',
                     padding: '2px'
                   }}>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Success Stories from Our Students
            </h3>
            <p className="text-gray-300">
              See what our students have achieved with AryaPathshala
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Sharma",
                class: "Class 10th",
                score: "95%",
                message: "AryaPathshala helped me score 95% in boards! The video lectures were amazing.",
                subject: "Mathematics"
              },
              {
                name: "Priya Singh", 
                class: "Class 9th",
                score: "92%",
                message: "The practice papers and notes made complex topics so easy to understand.",
                subject: "Science"
              },
              {
                name: "Rahul Kumar",
                class: "Class 10th", 
                score: "98%",
                message: "Best decision ever! Got 98% thanks to the comprehensive study material.",
                subject: "All Subjects"
              }
            ].map((story, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-2 transition-all duration-300 border border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">{story.name}</h4>
                    <p className="text-sm text-gray-400">{story.class} Student</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold">
                      {story.score}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 italic mb-3">
                  "{story.message}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {story.subject}
                  </span>
                  <div className="flex text-yellow-400">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CourseCards;