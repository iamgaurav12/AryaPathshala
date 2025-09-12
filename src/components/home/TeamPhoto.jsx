import React, { useState } from 'react';

const TeamPhoto = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFullTeam, setShowFullTeam] = useState(false);

  // Mock team data - replace with actual team information
  const teamMembers = [
    {
      name: "Gaurav Sir",
      role: "Mathematics Expert",
      experience: "8+ Years",
      specialization: "Advanced Math & Problem Solving",
      image: "/api/placeholder/150/150", // Replace with actual image
      achievements: ["IIT Graduate", "10,000+ Students Taught", "Math Olympiad Coach"]
    },
    {
      name: "Priya Ma'am",
      role: "Science Faculty",
      experience: "6+ Years", 
      specialization: "Physics & Chemistry",
      image: "/api/placeholder/150/150", // Replace with actual image
      achievements: ["PhD in Physics", "Research Publications", "Board Exam Expert"]
    },
    {
      name: "Rajesh Sir",
      role: "English Expert",
      experience: "7+ Years",
      specialization: "Literature & Grammar",
      image: "/api/placeholder/150/150", // Replace with actual image
      achievements: ["Literature Masters", "Communication Skills", "Creative Writing"]
    },
    {
      name: "Sunita Ma'am",
      role: "Hindi Faculty", 
      experience: "5+ Years",
      specialization: "Hindi Literature & Grammar",
      image: "/api/placeholder/150/150", // Replace with actual image
      achievements: ["Hindi Literature Expert", "Poetry & Prose", "Language Skills"]
    },
    {
      name: "Amit Sir",
      role: "Social Science",
      experience: "6+ Years",
      specialization: "History & Geography",
      image: "/api/placeholder/150/150", // Replace with actual image
      achievements: ["History PhD", "Geography Expert", "Current Affairs"]
    }
  ];

  const achievements = [
    { number: "500+", label: "Happy Students", icon: "👨‍🎓" },
    { number: "95%", label: "Success Rate", icon: "📈" },
    { number: "100+", label: "Video Lectures", icon: "🎥" },
    { number: "50+", label: "Practice Sets", icon: "📝" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-5 w-16 h-16 bg-pink-200 dark:bg-pink-800 rotate-45 opacity-20 animate-spin" style={{ animationDuration: '10s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Meet Our Expert Faculty
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn from experienced educators who are passionate about your success. 
            Our team brings years of teaching excellence and subject expertise.
          </p>
        </div>

        {/* Main Team Photo Section */}
        <div className="relative mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Team Photo Container */}
            <div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-8 overflow-hidden group">
              {/* Placeholder for team photo - replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  {/* Team photo placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-20 absolute inset-0"></div>
                  
                  {/* Team illustration */}
                  <div className="relative z-10 flex justify-center items-end space-x-4">
                    {teamMembers.slice(0, 5).map((member, index) => (
                      <div
                        key={index}
                        className={`bg-white dark:bg-gray-700 rounded-full p-3 shadow-lg transform transition-all duration-500 hover:scale-110 ${
                          index % 2 === 0 ? 'translate-y-0' : '-translate-y-4'
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {member.name.charAt(0)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      AryaPathshala Teaching Team
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      "Together, we make learning an amazing journey!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-6 left-6 text-2xl animate-bounce">📚</div>
              <div className="absolute top-8 right-8 text-2xl animate-pulse">⭐</div>
              <div className="absolute bottom-6 left-8 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🎯</div>
              <div className="absolute bottom-8 right-6 text-2xl animate-pulse" style={{ animationDelay: '2s' }}>🏆</div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl mb-3">{achievement.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Individual Team Members (Toggle Section) */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowFullTeam(!showFullTeam)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            {showFullTeam ? 'Hide' : 'Meet'} Individual Faculty Members
            <span className="ml-2 transform transition-transform duration-300" style={{ transform: showFullTeam ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ⬇️
            </span>
          </button>
        </div>

        {/* Expandable Team Grid */}
        <div className={`transition-all duration-500 overflow-hidden ${
          showFullTeam ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
              >
                {/* Member Photo */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {member.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {member.experience} Experience
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {member.specialization}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {member.achievements.map((achievement, achIndex) => (
                      <span
                        key={achIndex}
                        className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mr-1 mb-1"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Learn with the Best?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of successful students who have achieved their academic goals with our expert faculty guidance.
            </p>
            <button
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Journey Today 🚀
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPhoto;