import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, ArrowRight, Star, Play, FileText, PenTool } from 'lucide-react';

// --- Custom Tailwind Mappings for Pure Black and Yellow Theme ---
// (These mappings remain the same for consistency across the app)
// bg-dark-primary -> bg-black
// bg-dark-secondary -> bg-[#0A0A0A]
// bg-dark-card -> bg-[#1A1A1A]
// bg-dark-tertiary -> bg-[#222222]
// text-dark-primary -> text-white
// text-dark-secondary -> text-gray-300
// text-dark-muted -> text-gray-400
// yellow-primary -> #FFD700 (Gold/Yellow)
// yellow-secondary -> #FFC700
// yellow-tertiary -> #FFE87C
// yellow-hover -> #FFE87C
// shadow-yellow-glow -> shadow-[0_0_20px_rgba(255,215,0,0.5)]

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClassNavigation = (classRoute) => {
    navigate(classRoute);
  };

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Comprehensive Notes",
      description: "Detailed study materials for every chapter",
      color: "from-[#FFD700] to-[#FFC700]" 
    },
    {
      icon: <Play className="h-6 w-6" />,
      title: "Video Lectures",
      description: "Interactive YouTube lectures with expert explanations",
      color: "from-[#FFC700] to-[#FFE87C]" 
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Daily Practice Papers",
      description: "DPPs to enhance your problem-solving skills",
      color: "from-[#FFE87C] to-[#FFD700]" 
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Quality Education",
      description: "Prepared by experienced educators",
      color: "from-[#FFD700] to-[#FFE87C]" 
    }
  ];

  const stats = [
    { number: "2", label: "Classes", suffix: "" },
    { number: "50+", label: "Study Materials", suffix: "" },
    { number: "500+", label: "Practice Questions", suffix: "" },
    { number: "24/7", label: "Access", suffix: "" }
  ];

  return (
    // 1. MAIN BACKGROUND: Pure Black
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* --- ALTERNATIVE BACKGROUND: Fine-Grained Metallic Texture --- */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#080808] to-[#121212]">
            {/* Fine Grain/Noise Texture: Very subtle white dots on black */}
            <div className="absolute inset-0 opacity-10 bg-[length:4px_4px] bg-repeat" 
                style={{backgroundImage: 'radial-gradient(#1A1A1A 10%, transparent 10%)'}}>
            </div>
            {/* Subtle Diagonal Lines for an industrial feel */}
            <div className="absolute inset-0 opacity-5" 
                style={{backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0, #FFD700 1px, transparent 1px, transparent 50px)'}}>
            </div>
        </div>
        {/* ----------------------------------------------------------- */}

        {/* 2. TOP-LEFT GOLDEN LIGHT EFFECT (Sharper/More Focused) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgba(255,215,0,0.12)_0%,_transparent_25%)]"></div>
        </div>


        {/* Floating Golden Orbs (Kept for the glow, but less prominent) */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-15"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#FFC700] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000 opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#FFE87C] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000 opacity-10"></div>
        </div>

        {/* Premium Logo Section (No changes here, keeping the current bold design) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex items-center justify-center">
            {/* Multi-layered golden glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 via-[#FFC700]/20 to-[#FFE87C]/20 rounded-full blur-xl sm:blur-2xl lg:blur-3xl animate-pulse-slow shadow-[0_0_30px_rgba(255,215,0,0.5)]"></div>
            <div className="absolute inset-2 sm:inset-4 lg:inset-8 bg-gradient-to-tr from-[#FFD700]/10 via-[#FFC700]/10 to-[#FFE87C]/10 rounded-full blur-lg sm:blur-xl lg:blur-2xl animate-pulse-slow shadow-[0_0_40px_rgba(255,215,0,0.6)]" style={{ animationDelay: '1s' }}></div>
            
            {/* Rotating golden border effect */}
            <div className="absolute inset-0 rounded-full border border-transparent sm:border-2 bg-gradient-to-r from-[#FFD700]/30 via-[#FFC700]/30 to-[#FFE87C]/30 animate-spin-slow"></div>
            
            {/* Premium glass container with golden theme */}
            <div className="group relative w-full h-full max-w-80 max-h-80">
              {/* Outer golden glow */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#FFD700]/20 via-[#FFC700]/20 to-[#FFE87C]/20 rounded-full blur-xl sm:blur-2xl group-hover:blur-2xl sm:group-hover:blur-3xl transition-all duration-700 shadow-[0_0_30px_rgba(255,215,0,0.5)] group-hover:shadow-[0_0_40px_rgba(255,215,0,0.7)]"></div>
              
              {/* Main logo container with enhanced dark glass effect */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#1A1A1A]/80 to-[#222222]/80 backdrop-blur-lg sm:backdrop-blur-xl rounded-full p-3 sm:p-4 lg:p-5 shadow-[0_0_15px_rgba(0,0,0,0.8)] border border-[#FFD700]/20 group-hover:border-[#FFD700]/40 transition-all duration-700 shadow-[0_0_20px_rgba(255,215,0,0.2)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                {/* Inner container with golden gradient overlay */}
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#0A0A0A]/90 to-[#222222]/90 p-1 sm:p-2 group-hover:p-0.5 sm:group-hover:p-1 transition-all duration-500 border border-[#FFD700]/10">
                  {/* Logo image with enhanced golden effects */}
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/10 via-transparent to-[#FFC700]/10 group-hover:opacity-20 transition-opacity duration-700"></div>
                    <img 
                      src="/logo_arya.jpg" 
                      alt="Arya Pathshala Logo" 
                      className="relative z-10 w-full h-full object-contain rounded-full transform group-hover:scale-110 transition-all duration-700 filter brightness-110 contrast-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced decorative elements - golden theme */}
            <div className="absolute -top-4 sm:-top-6 lg:-top-8 -left-4 sm:-left-6 lg:-left-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#FFD700] to-[#FFE87C] rounded-full animate-float opacity-80 backdrop-blur-sm shadow-[0_0_15px_rgba(255,215,0,0.8)]"></div>
            <div className="absolute -bottom-6 sm:-bottom-8 lg:-bottom-10 -right-6 sm:-right-8 lg:-right-10 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-[#FFC700] to-[#FFE87C] rounded-full animate-float-delayed opacity-80 backdrop-blur-sm shadow-[0_0_15px_rgba(255,215,0,0.8)]" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -left-6 sm:-left-8 lg:-left-12 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-[#FFE87C] to-[#FFD700] rounded-full animate-float-slow opacity-80 backdrop-blur-sm shadow-[0_0_15px_rgba(255,215,0,0.8)]" style={{ animationDelay: '1s' }}></div>
            
            {/* Golden sparkle effects */}
            <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FFD700] rounded-full animate-ping-slow shadow-[0_0_8px_rgba(255,215,0,1)]"></div>
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FFC700] rounded-full animate-ping-slow shadow-[0_0_8px_rgba(255,215,0,1)]" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Enhanced Animation Styles (CSS unchanged as it's fine) */}
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes ping-slow {
            0% { transform: scale(1); opacity: 1; }
            75%, 100% { transform: scale(2); opacity: 0; }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 6s ease-in-out 2s infinite;
          }
          .animate-float-slow {
            animation: float 8s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-ping-slow {
            animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .golden-gradient-text {
            background: linear-gradient(135deg, #FFD700 0%, #FFC700 50%, #FFE87C 100%); 
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}</style>

        {/* Content (No major changes here) */}
        <div className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-4 sm:mb-6">
              <span className="golden-gradient-text">Arya</span>
              <br />
              <span className="text-white">Pathshala</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              Your gateway to academic excellence. Comprehensive study materials, 
              engaging lectures, and daily practice for Class 9 & 10 students.
            </p>
          </div>

          {/* Course Selection Cards - Enhanced with golden theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto mb-8 sm:mb-12">
            <button 
              onClick={() => handleClassNavigation('/class9')}
              className="group relative overflow-hidden bg-[#1A1A1A]/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transform hover:-translate-y-2 transition-all duration-300 border border-[#0A0A0A] hover:border-[#FFD700]/50 w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 to-[#FFC700]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 filter grayscale-0 group-hover:grayscale-0">📚</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#FFD700] transition-colors duration-300">
                  Class 9
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                  Foundation building with comprehensive study materials
                </p>
                <div className="flex items-center justify-center space-x-2 text-[#FFD700] font-medium">
                  <span className="text-sm sm:text-base">Start Learning</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </button>

            <button 
              onClick={() => handleClassNavigation('/class10')}
              className="group relative overflow-hidden bg-[#1A1A1A]/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transform hover:-translate-y-2 transition-all duration-300 border border-[#0A0A0A] hover:border-[#FFD700]/50 w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFC700]/5 to-[#FFE87C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎓</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#FFD700] transition-colors duration-300">
                  Class 10
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                  Board exam preparation with advanced concepts
                </p>
                <div className="flex items-center justify-center space-x-2 text-[#FFD700] font-medium">
                  <span className="text-sm sm:text-base">Start Learning</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </button>
          </div>

          {/* Stats with Golden Theme */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold golden-gradient-text mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-400 font-medium group-hover:text-[#FFD700] transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-[#FFD700]/60 rounded-full flex justify-center shadow-[0_0_10px_rgba(255,215,0,0.5)]">
            <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-[#FFD700] rounded-full mt-1.5 sm:mt-2 animate-pulse shadow-[0_0_5px_rgba(255,215,0,0.8)]"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0A0A0A] border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Why Choose <span className="golden-gradient-text">Arya Pathshala?</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              ✨ Because Arya Pathshala Gives You Wings ✨
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-[#1A1A1A] rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transform hover:-translate-y-2 transition-all duration-300 border border-[#0A0A0A] hover:border-[#FFD700]/30"
              >
                <div className={`inline-flex p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.color} text-black mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(255,215,0,0.3)]`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#FFD700] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#222222]/50 relative overflow-hidden border-t border-black">
        {/* Background gradient (soft yellow glow) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(255,215,0,0.05),transparent)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Meet Our <span className="golden-gradient-text">Expert Teachers</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Learn from our experienced educators dedicated to your academic success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Navneet Bhaiya", image: "navneet.jpg", role: "Mathematics Expert", experience: "5+ Years Experience" },
              { name: "Pavan Bhaiya", image: "pavan.jpg", role: "English Expert", experience: "12+ Years Experience" },
              { name: "Prem Bhaiya", image: "prem.jpg", role: "Biology Expert", experience: "5+ Years Experience" },
              { name: "Vaibhav Bhaiya", image: "vaibhav.jpg", role: "Physics Expert", experience: "5+ Years Experience" },
              { name: "Gaurav Bhaiya", image: "gaurav.jpg", role: "Chemistry Expert", experience: "5+ Years Experience" },
              { name: "Soni Di", image: "sonya.jpg", role: "Social Science Expert", experience: "5+ Years Experience" },
            ].map((teacher, index) => (
              <div 
                key={index}
                className="group relative bg-[#1A1A1A] rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-[#0A0A0A] hover:border-[#FFD700]/30"
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFC700]/0 to-[#FFE87C]/0 group-hover:from-[#FFD700]/5 group-hover:via-[#FFC700]/5 group-hover:to-[#FFE87C]/5 transition-all duration-500"></div>
                
                {/* Teacher Image Container */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 w-full max-w-72 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#FFC700]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={`/${teacher.image}`}
                      alt={teacher.name}
                      className="relative z-10 w-full h-full object-cover object-center rounded-full transform hover:scale-105 transition-transform duration-300 border-2 border-transparent group-hover:border-[#FFD700]/30"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="relative text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-[#FFD700] transition-colors duration-300">
                    {teacher.name}
                  </h3>
                  <p className="text-[#FFD700] font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    {teacher.role}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {teacher.experience}
                  </p>

                  {/* Hover effect decorative elements */}
                  <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-[#FFD700] to-[#FFC700] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 border-t border-r sm:border-t-2 sm:border-r-2 border-[#FFD700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 border-b border-l sm:border-b-2 sm:border-l-2 border-[#FFD700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;