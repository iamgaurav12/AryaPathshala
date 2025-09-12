import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  ChevronDown, 
  ChevronRight,
  Play,
  PenTool,
  Clock,
  Award,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Class9 = () => {
  const { isDark } = useTheme();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chaptersData, setChaptersData] = useState([]);

  // Load chapters data from localStorage or use default
  useEffect(() => {
    const savedData = localStorage.getItem('class9_chapters');
    if (savedData) {
      setChaptersData(JSON.parse(savedData));
    } else {
      // Default chapters data
      const defaultChapters = [
        {
          id: 1,
          title: "Matter in Our Surroundings",
          subject: "Science",
          description: "States of matter, properties, and changes",
          notesLink: "https://drive.google.com/file/d/sample1",
          dppLink: "https://drive.google.com/file/d/sample2",
          lectureLink: "https://youtube.com/watch?v=sample1",
          duration: "45 mins",
          topics: ["States of Matter", "Kinetic Theory", "Changes of State"]
        },
        {
          id: 2,
          title: "Is Matter Around Us Pure",
          subject: "Science",
          description: "Mixtures, compounds, and separation techniques",
          notesLink: "https://drive.google.com/file/d/sample3",
          dppLink: "https://drive.google.com/file/d/sample4",
          lectureLink: "https://youtube.com/watch?v=sample2",
          duration: "50 mins",
          topics: ["Pure Substances", "Mixtures", "Separation Methods"]
        },
        {
          id: 3,
          title: "Atoms and Molecules",
          subject: "Science",
          description: "Atomic structure and molecular composition",
          notesLink: "https://drive.google.com/file/d/sample5",
          dppLink: "https://drive.google.com/file/d/sample6",
          lectureLink: "https://youtube.com/watch?v=sample3",
          duration: "60 mins",
          topics: ["Atomic Theory", "Molecules", "Chemical Formulas"]
        },
        {
          id: 4,
          title: "Number Systems",
          subject: "Mathematics",
          description: "Real numbers, rational and irrational numbers",
          notesLink: "https://drive.google.com/file/d/sample7",
          dppLink: "https://drive.google.com/file/d/sample8",
          lectureLink: "https://youtube.com/watch?v=sample4",
          duration: "40 mins",
          topics: ["Rational Numbers", "Irrational Numbers", "Real Numbers"]
        },
        {
          id: 5,
          title: "Polynomials",
          subject: "Mathematics",
          description: "Polynomial expressions and their operations",
          notesLink: "https://drive.google.com/file/d/sample9",
          dppLink: "https://drive.google.com/file/d/sample10",
          lectureLink: "https://youtube.com/watch?v=sample5",
          duration: "55 mins",
          topics: ["Linear Polynomials", "Quadratic Polynomials", "Factorization"]
        }
      ];
      setChaptersData(defaultChapters);
    }
  }, []);

  const handleResourceClick = (link, type) => {
    if (type === 'lecture') {
      const userConfirmed = window.confirm("This will open YouTube in a new tab. Do you want to continue?");
      if (userConfirmed) {
        window.open(link, '_blank');
      }
    } else {
      window.open(link, '_blank');
    }
  };

  const subjects = [...new Set(chaptersData.map(chapter => chapter.subject))];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className={`flex items-center px-4 py-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} transition-colors duration-200`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Class 9th
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  Foundation courses for CBSE curriculum
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <Award className="w-5 h-5 inline mr-2" />
                {chaptersData.length} Chapters Available
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Chapters List */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>
                Available Chapters
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Select a chapter to access notes, lectures, and practice papers
              </p>
            </div>

            {subjects.map(subject => {
              const subjectChapters = chaptersData.filter(chapter => chapter.subject === subject);
              return (
                <div key={subject} className="mb-8">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 flex items-center`}>
                    <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
                    {subject}
                  </h3>
                  
                  <div className="space-y-4">
                    {subjectChapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className={`group border-2 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                          selectedChapter === chapter.id
                            ? isDark 
                              ? 'border-blue-500 bg-gray-800 shadow-blue-500/20'
                              : 'border-blue-400 bg-blue-50 shadow-blue-200/50'
                            : isDark
                              ? 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="p-6 cursor-pointer"
                          onClick={() => setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                                }`}>
                                  Chapter {chapter.id}
                                </span>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {chapter.duration}
                                </div>
                              </div>
                              <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} group-hover:text-blue-500 transition-colors duration-200 mb-2`}>
                                {chapter.title}
                              </h4>
                              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {chapter.description}
                              </p>
                            </div>
                            <div className="ml-4">
                              {selectedChapter === chapter.id ? (
                                <ChevronDown className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-500'} transition-transform duration-200`} />
                              ) : (
                                <ChevronRight className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-400'} group-hover:text-blue-500 transition-colors duration-200`} />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {selectedChapter === chapter.id && (
                          <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6 bg-gradient-to-r ${
                            isDark ? 'from-gray-800/50 to-gray-700/30' : 'from-blue-50/50 to-indigo-50/30'
                          }`}>
                            {/* Topics */}
                            <div className="mb-6">
                              <h5 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-3`}>
                                Topics Covered:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {chapter.topics.map((topic, index) => (
                                  <span
                                    key={index}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Resources */}
                            <div className="grid md:grid-cols-3 gap-4">
                              <button
                                onClick={() => handleResourceClick(chapter.notesLink, 'notes')}
                                className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                                  isDark 
                                    ? 'border-green-500/30 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500'
                                    : 'border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-400'
                                }`}
                              >
                                <FileText className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'} mb-3 mx-auto group-hover:scale-110 transition-transform duration-200`} />
                                <h6 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>
                                  Notes
                                </h6>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Detailed chapter notes
                                </p>
                                <div className={`flex items-center justify-center mt-2 text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                  <Download className="w-4 h-4 mr-1" />
                                  Download PDF
                                </div>
                              </button>

                              <button
                                onClick={() => handleResourceClick(chapter.lectureLink, 'lecture')}
                                className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                                  isDark 
                                    ? 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500'
                                    : 'border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-400'
                                }`}
                              >
                                <Video className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-600'} mb-3 mx-auto group-hover:scale-110 transition-transform duration-200`} />
                                <h6 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>
                                  Lecture
                                </h6>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Video explanation
                                </p>
                                <div className={`flex items-center justify-center mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                                  <Play className="w-4 h-4 mr-1" />
                                  Watch on YouTube
                                </div>
                              </button>

                              <button
                                onClick={() => handleResourceClick(chapter.dppLink, 'dpp')}
                                className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                                  isDark 
                                    ? 'border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500'
                                    : 'border-purple-200 bg-purple-50 hover:bg-purple-100 hover:border-purple-400'
                                }`}
                              >
                                <PenTool className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'} mb-3 mx-auto group-hover:scale-110 transition-transform duration-200`} />
                                <h6 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>
                                  DPP
                                </h6>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Practice problems
                                </p>
                                <div className={`flex items-center justify-center mt-2 text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                                  <Download className="w-4 h-4 mr-1" />
                                  Download PDF
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className={`sticky top-8 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>
                Quick Stats
              </h3>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {chaptersData.length}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Total Chapters
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {subjects.length}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Subjects Covered
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    100%
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    CBSE Aligned
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Study Tips
                </h4>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'} mb-1`}>
                      📚 Read Notes First
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Start with comprehensive notes before watching lectures
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'} mb-1`}>
                      🎥 Watch Lectures
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Reinforce concepts with video explanations
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'} mb-1`}>
                      ✍️ Practice DPP
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Test your understanding with daily practice
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/class-10"
                  className={`block w-full text-center py-3 px-4 rounded-xl border-2 border-dashed transition-all duration-300 ${
                    isDark 
                      ? 'border-gray-600 hover:border-blue-500 text-gray-300 hover:text-blue-400' 
                      : 'border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Ready for Class 10th? →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class9;