import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [counters, setCounters] = useState({
    students: 0,
    lectures: 0,
    papers: 0,
    success: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  // Counter animation
  useEffect(() => {
    if (isVisible) {
      const targets = { students: 5000, lectures: 500, papers: 200, success: 95 };
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        setCounters(prev => ({
          students: Math.min(prev.students + Math.ceil(targets.students / steps), targets.students),
          lectures: Math.min(prev.lectures + Math.ceil(targets.lectures / steps), targets.lectures),
          papers: Math.min(prev.papers + Math.ceil(targets.papers / steps), targets.papers),
          success: Math.min(prev.success + Math.ceil(targets.success / steps), targets.success)
        }));
      }, stepDuration);

      setTimeout(() => clearInterval(timer), duration);
    }
  }, [isVisible]);

  // Intersection observer for counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('about-stats');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [isVisible]);

  const tabs = [
    {
      id: 'mission',
      title: 'Our Mission',
      icon: '🎯',
      content: {
        heading: 'Empowering Students for Academic Excellence',
        description: 'At AryaPathshala, we believe every student has the potential to excel. Our mission is to provide high-quality, accessible education that transforms learning into an engaging and rewarding experience.',
        points: [
          'Make quality education accessible to every student',
          'Build strong conceptual foundation for long-term success',
          'Foster critical thinking and problem-solving skills',
          'Create a supportive learning community'
        ]
      }
    },
    {
      id: 'vision',
      title: 'Our Vision',
      icon: '👁️',
      content: {
        heading: 'Creating Future Leaders and Innovators',
        description: 'We envision a world where every student, regardless of their background, has access to exceptional educational resources and guidance to achieve their academic dreams.',
        points: [
          'Become India\'s most trusted online learning platform',
          'Revolutionize traditional teaching methods',
          'Bridge the gap between students and quality education',
          'Prepare students for a competitive global future'
        ]
      }
    },
    {
      id: 'approach',
      title: 'Our Approach',
      icon: '🚀',
      content: {
        heading: 'Student-Centered Learning Methodology',
        description: 'Our unique approach combines traditional teaching wisdom with modern technology to create an immersive learning experience tailored for Class 9th and 10th students.',
        points: [
          'Interactive video lectures by expert faculty',
          'Comprehensive study materials and practice papers',
          'Regular assessments and progress tracking',
          'Personalized doubt clearing sessions'
        ]
      }
    }
  ];

  const values = [
    {
      icon: '🎓',
      title: 'Excellence',
      description: 'We strive for the highest standards in education and content quality.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously innovate our teaching methods and technology.'
    },
    {
      icon: '🤝',
      title: 'Support',
      description: 'We provide unwavering support to help students achieve their goals.'
    },
    {
      icon: '🌟',
      title: 'Inspiration',
      description: 'We inspire students to dream big and work towards their aspirations.'
    }
  ];

  const achievements = [
    { number: '2019', label: 'Founded', description: 'Started our educational journey' },
    { number: '10+', label: 'Expert Faculty', description: 'Experienced educators' },
    { number: '50+', label: 'Cities Reached', description: 'Pan-India presence' },
    { number: '99%', label: 'Satisfaction Rate', description: 'Happy students & parents' }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-yellow-500 rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-32 h-32 bg-yellow-400 rotate-45 opacity-5 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-yellow-300 rounded-full opacity-5 animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">AryaPathshala</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dedicated to transforming education and empowering students to achieve their academic dreams through innovative learning solutions.
          </p>
        </div>

        {/* Interactive Tabs Section */}
        <div className="mb-20">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12 space-x-2 sm:space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/25'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-yellow-400 shadow-md border border-gray-800'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-sm sm:text-base">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-800">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  {currentTab.content.heading}
                </h3>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {currentTab.content.description}
                </p>
                <ul className="space-y-4">
                  {currentTab.content.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 transform hover:translate-x-2 transition-transform duration-300"
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black text-sm font-bold mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 relative overflow-hidden border border-gray-700">
                  {/* Decorative elements based on active tab */}
                  {activeTab === 'mission' && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🎯</div>
                        <h4 className="text-xl font-bold text-white">Our Mission</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-black rounded-lg shadow-md border border-gray-800">
                          <span className="text-2xl">📚</span>
                          <p className="text-sm font-medium text-gray-300 mt-2">Quality Content</p>
                        </div>
                        <div className="text-center p-4 bg-black rounded-lg shadow-md border border-gray-800">
                          <span className="text-2xl">👨‍🎓</span>
                          <p className="text-sm font-medium text-gray-300 mt-2">Student Success</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'vision' && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-6xl mb-4">👁️</div>
                        <h4 className="text-xl font-bold text-white">Our Vision</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-black rounded-lg shadow-md border border-gray-800">
                          <span className="text-xl">🌍</span>
                          <span className="text-sm font-medium text-gray-300">Global Impact</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-black rounded-lg shadow-md border border-gray-800">
                          <span className="text-xl">🚀</span>
                          <span className="text-sm font-medium text-gray-300">Innovation</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'approach' && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🚀</div>
                        <h4 className="text-xl font-bold text-white">Our Approach</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-black rounded-lg shadow-md border border-gray-800">
                          <span className="text-sm font-medium text-gray-300">Interactive Learning</span>
                          <span className="text-xl">🎥</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-black rounded-lg shadow-md border border-gray-800">
                          <span className="text-sm font-medium text-gray-300">Practice & Assessment</span>
                          <span className="text-xl">📝</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Background decoration */}
                  <div className="absolute -top-4 -right-4 text-4xl opacity-20 text-yellow-500">✨</div>
                  <div className="absolute -bottom-4 -left-4 text-3xl opacity-20 text-yellow-500">🌟</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div id="about-stats" className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-2 transition-all duration-300 border border-gray-800">
              <div className="text-4xl mb-4">👨‍🎓</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                {counters.students.toLocaleString()}+
              </div>
              <div className="text-sm font-medium text-gray-400">Happy Students</div>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-2 transition-all duration-300 border border-gray-800">
              <div className="text-4xl mb-4">🎥</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                {counters.lectures}+
              </div>
              <div className="text-sm font-medium text-gray-400">Video Lectures</div>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-2 transition-all duration-300 border border-gray-800">
              <div className="text-4xl mb-4">📝</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                {counters.papers}+
              </div>
              <div className="text-sm font-medium text-gray-400">Practice Papers</div>
            </div>

            <div className="text-center p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-2 transition-all duration-300 border border-gray-800">
              <div className="text-4xl mb-4">📈</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                {counters.success}%
              </div>
              <div className="text-sm font-medium text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Our Core Values</h3>
            <p className="text-lg text-gray-300">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-3 transition-all duration-300 border border-gray-700 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline/Journey Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Our Journey</h3>
            <p className="text-lg text-gray-300">
              Milestones in our educational mission
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="relative text-center p-8 bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-2 transition-all duration-300 border border-gray-800 group overflow-hidden"
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {achievement.number}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {achievement.label}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {achievement.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 text-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 text-yellow-500">
                  {index % 2 === 0 ? '⭐' : '🎯'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-3xl p-8 sm:p-12 text-black relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-black rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-black rotate-45"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-black rounded-full"></div>
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-bold mb-6">Why Choose AryaPathshala?</h3>
              <p className="text-xl text-black/80 mb-8 max-w-3xl mx-auto">
                Join thousands of successful students who trust us for their academic journey
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎓</div>
                  <h4 className="text-lg font-semibold mb-2">Expert Faculty</h4>
                  <p className="text-black/70 text-sm">
                    Learn from experienced teachers with proven track records
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h4 className="text-lg font-semibold mb-2">Flexible Learning</h4>
                  <p className="text-black/70 text-sm">
                    Study anytime, anywhere with our comprehensive online platform
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🏆</div>
                  <h4 className="text-lg font-semibold mb-2">Proven Results</h4>
                  <p className="text-black/70 text-sm">
                    95% of our students achieve their target scores in board exams
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-black text-yellow-400 rounded-xl font-semibold text-lg hover:bg-gray-900 hover:text-yellow-300 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Your Journey Today 🚀
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="text-center">
          <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">
              Have Questions? We're Here to Help!
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-3xl mb-3">📧</div>
                <h4 className="font-semibold text-white mb-2">Email Us</h4>
                <p className="text-gray-400 text-sm">
                  info@aryapathshala.com
                </p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-semibold text-white mb-2">Call Us</h4>
                <p className="text-gray-400 text-sm">
                  +91 12345 67890
                </p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-3">💬</div>
                <h4 className="font-semibold text-white mb-2">Chat Support</h4>
                <p className="text-gray-400 text-sm">
                  24/7 Online Support
                </p>
              </div>
            </div>

            <p className="text-gray-400">
              Our support team is always ready to assist you with any questions about courses, 
              technical issues, or study guidance. Don't hesitate to reach out!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;