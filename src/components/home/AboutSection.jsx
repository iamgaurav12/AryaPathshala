import React, { useState, useEffect, useRef } from 'react';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [counters, setCounters] = useState({ students: 0, lectures: 0, papers: 0, success: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      const targets = { students: 5000, lectures: 500, papers: 200, success: 95 };
      const duration = 2000;
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCounters({
          students: Math.floor(progress * targets.students),
          lectures: Math.floor(progress * targets.lectures),
          papers: Math.floor(progress * targets.papers),
          success: Math.floor(progress * targets.success),
        });
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'mission', title: 'Our Mission', icon: '🎯', content: { heading: 'Empowering Academic Excellence', description: 'Our mission is to provide high-quality, accessible education, transforming learning into an engaging and rewarding experience for every student.', points: ['Accessible quality education', 'Strong conceptual foundation', 'Foster critical thinking', 'Supportive learning community'] } },
    { id: 'vision', title: 'Our Vision', icon: '👁️', content: { heading: 'Creating Future Leaders', description: 'We envision a world where every student has access to exceptional educational resources to achieve their dreams and become innovators.', points: ["India's most trusted platform", 'Revolutionize teaching methods', 'Bridge education gap', 'Prepare for a global future'] } },
    { id: 'approach', title: 'Our Approach', icon: '🚀', content: { heading: 'Student-Centered Learning', description: 'Our approach combines traditional wisdom with modern technology for an immersive experience tailored for Class 9th and 10th students.', points: ['Interactive video lectures', 'Comprehensive study materials', 'Regular assessments', 'Personalized doubt clearing'] } }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <section id="about" className="py-20 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-yellow-500 rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-32 h-32 bg-yellow-400 rotate-45 opacity-5 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">AryaPathshala</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Dedicated to transforming education and empowering students to achieve their academic dreams.</p>
        </div>

        <div className="mb-20">
          <div className="flex flex-wrap justify-center mb-12 space-x-2 sm:space-x-4">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${activeTab === tab.id ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/25' : 'bg-black text-gray-300 hover:bg-gray-900 hover:text-yellow-400 shadow-md border border-gray-800'}`}>
                <span className="text-lg">{tab.icon}</span>
                <span className="text-sm sm:text-base">{tab.title}</span>
              </button>
            ))}
          </div>
          <div className="bg-black rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-800">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">{currentTab.content.heading}</h3>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">{currentTab.content.description}</p>
                <ul className="space-y-4">
                  {currentTab.content.points.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3 transform hover:translate-x-2 transition-transform duration-300">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black text-sm font-bold mt-0.5">✓</span>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                  <div className="text-8xl opacity-20">{currentTab.icon}</div>
              </div>
            </div>
          </div>
        </div>

        <div ref={statsRef} id="about-stats" className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[{icon: '👨‍🎓', count: counters.students, label: 'Happy Students'}, {icon: '🎥', count: counters.lectures, label: 'Video Lectures'}, {icon: '📝', count: counters.papers, label: 'Practice Papers'}, {icon: '📈', count: counters.success, label: 'Success Rate', suffix: '%'}].map(stat => (
            <div key={stat.label} className="text-center p-6 bg-black rounded-2xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transform hover:-translate-y-2 transition-all duration-300 border border-gray-800">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">{stat.count.toLocaleString()}{stat.suffix || '+'}</div>
              <div className="text-sm font-medium text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
