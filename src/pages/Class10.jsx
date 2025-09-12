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
  ArrowLeft,
  Target,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Class10 = () => {
  const { isDark } = useTheme();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chaptersData, setChaptersData] = useState([]);

  // Load chapters data from localStorage or use default
  useEffect(() => {
    const savedData = localStorage.getItem('class10_chapters');
    if (savedData) {
      setChaptersData(JSON.parse(savedData));
    } else {
      // Default chapters data for Class 10
      const defaultChapters = [
        {
          id: 1,
          title: "Light - Reflection and Refraction",
          subject: "Science",
          description: "Laws of reflection, refraction, and optical instruments",
          notesLink: "https://drive.google.com/file/d/sample1",
          dppLink: "https://drive.google.com/file/d/sample2",
          lectureLink: "https://youtube.com/watch?v=sample1",
          duration: "65 mins",
          topics: ["Laws of Reflection", "Refraction", "Lenses", "Human Eye"],
          difficulty: "High",
          boardImportance: "Very High"
        },
        {
          id: 2,
          title: "Acids, Bases and Salts",
          subject: "Science",
          description: "Properties and reactions of acids, bases, and salts",
          notesLink: "https://drive.google.com/file/d/sample3",
          dppLink: "https://drive.google.com/file/d/sample4",
          lectureLink: "https://youtube.com/watch?v=sample2",
          duration: "55 mins",
          topics: ["Acid-Base Indicators", "pH Scale", "Salt Preparation"],
          difficulty: "Medium",
          boardImportance: "High"
        },
        {
          id: 3,
          title: "Carbon and its Compounds",
          subject: "Science",
          description: "Organic chemistry basics and carbon compounds",
          notesLink: "https://drive.google.com/file/d/sample5",
          dppLink: "https://drive.google.com/file/d/sample6",
          lectureLink: "https://youtube.com/watch?v=sample3",
          duration: "70 mins",
          topics: ["Covalent Bonding", "Hydrocarbons", "Functional Groups"],
          difficulty: "High",
          boardImportance: "Very High"
        },
        {
          id: 4,
          title: "Real Numbers",
          subject: "Mathematics",
          description: "Euclid's division algorithm and fundamental theorem",
          notesLink: "https://drive.google.com/file/d/sample7",
          dppLink: "https://drive.google.com/file/d/sample8",
          lectureLink: "https://youtube.com/watch?v=sample4",
          duration: "45 mins",
          topics: ["HCF and LCM", "Euclid's Algorithm", "Rational Numbers"],
          difficulty: "Medium",
          boardImportance: "High"
        },
        {
          id: 5,
          title: "Polynomials",
          subject: "Mathematics",
          description: "Quadratic polynomials and their applications",
          notesLink: "https://drive.google.com/file/d/sample9",
          dppLink: "https://drive.google.com/file/d/sample10",
          lectureLink: "https://youtube.com/watch?v=sample5",
          duration: "50 mins",
          topics: ["Zeroes of Polynomial", "Relationship between Zeroes and Coefficients"],
          difficulty: "Medium",
          boardImportance: "Very High"
        },
        {
          id: 6,
          title: "Quadratic Equations",
          subject: "Mathematics",
          description: "Solutions and applications of quadratic equations",
          notesLink: "https://drive.google.com/file/d/sample11",
          dppLink: "https://drive.google.com/file/d/sample12",
          lectureLink: "https://youtube.com/watch?v=sample6",
          duration: "60 mins",
          topics: ["Factorization Method", "Quadratic Formula", "Nature of Roots"],
          difficulty: "High",
          boardImportance: "Very High"
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

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return isDark ? 'text-green-400' : 'text-green-600';
      case 'Medium': return isDark ? 'text-yellow-400' : 'text-yellow-600';
      case 'High': return isDark ? 'text-red-400' : 'text-red-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getImportanceColor = (importance) => {
    switch(importance) {
      case 'Very High': return isDark ? 'text-red-400' : 'text-red-600';
      case 'High': return isDark ? 'text-orange-400' : 'text-orange-600';
      case 'Medium': return isDark ? 'text-yellow-400' : 'text-yellow-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'}`}>
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
                  Class 10th
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  Board exam preparation with expert guidance
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                <Target className="w-5 h-5 inline mr-2" />
                Board Exam Ready
              </div>
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
                Board Exam Chapters
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Complete coverage of CBSE Class 10 curriculum with exam-focused content
              </p>
            </div>

            {subjects.map(subject => {
              const subjectChapters = chaptersData.filter(chapter => chapter.subject === subject);
              return (
                <div key={subject} className="mb-8">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 flex items-center`}>
                    <BookOpen className="w-6 h-6 mr-2 text-purple-500" />
                    {subject}
                  </h3>
                  
                  <div className="space-y-4">
                    {subjectChapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className={`group border-2 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                          selectedChapter === chapter.id
                            ? isDark 
                              ? 'border-purple-500 bg-gray-800 shadow-purple-500/20'
                              : 'border-purple-400 bg-purple-50 shadow-purple-200/50'
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
                              <div className="flex items-center space-x-3 mb-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                                }`}>
                                  Chapter {chapter.id}
                                </span>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {chapter.duration}
                                </div>
                                <div className={`flex items-center text-sm ${getDifficultyColor(chapter.difficulty)}`}>
                                  <TrendingUp className="w-4 h-4 mr-1" />
                                  {chapter.difficulty}
                                </div>
                                <div className={`flex items-center text-sm ${getImportanceColor(chapter.boardImportance)}`}>
                                  <Target className="w-4 h-4 mr-1" />
                                  {chapter.boardImportance}
                                </div>
                              </div>
                              <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} group-hover:text-purple-500 transition-colors duration-200 mb-2`}>
                                {chapter.title}
                              </h4>
                              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {chapter.description}
                              </p>
                            </div>
                            <div className="ml-4">
                              {selectedChapter === chapter.id ? (
                                <ChevronDown className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-500'} transition-transform duration-200`} />
                              ) : (
                                <ChevronRight className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-400'} group-hover:text-purple-500 transition-colors duration-200`} />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {selectedChapter === chapter.id && (
                          <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6 bg-gradient-to-r ${
                            isDark ? 'from-gray-800/50 to-gray-700/30' : 'from-purple-50/50 to-pink-50/30'
                          }`}>
                            {/* Board Exam Info */}
                            <div className="mb-4">
                              <div className="flex items-center space-x-4 mb-3">
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  chapter.boardImportance === 'Very High' 
                                    ? isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                                    : chapter.boardImportance === 'High'
                                    ? isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
                                    : isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                                }`}>
                                  📋 Board Importance: {chapter.boardImportance}
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  chapter.difficulty === 'High'
                                    ? isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                                    : chapter.difficulty === 'Medium'
                                    ? isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                                    : isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                                }`}>
                                  📊 Difficulty: {chapter.difficulty}
                                </div>
                              </div>
                            </div>

                            {/* Topics */}
                            <div className="mb-6">
                              <h5 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-3`}>
                                Key Topics for Board Exams:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {chapter.topics.map((topic, index) => (
                                  <span
                                    key={index}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      isDark ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
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
                                  Board Notes
                                </h6>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Exam-focused notes
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
                                  Expert Lecture
                                </h6>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Detailed explanation
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
                                  Board DPP
                                </h6>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Exam practice papers
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
                Board Exam Stats
              </h3>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    {chaptersData.length}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Board Chapters
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    {subjects.length}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Core Subjects
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-red-500/20' : 'bg-red-100'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {chaptersData.filter(ch => ch.boardImportance === 'Very High').length}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    High Priority
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>
                  Board Exam Strategy
                </h4>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'} mb-1`}>
                      🔄 Regular Revision
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Review completed chapters weekly for better retention
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className={`p-4 rounded-xl border-2 border-dashed ${isDark ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-yellow-300 bg-yellow-50'}`}>
                  <div className={`text-center ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    <Target className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-bold text-sm mb-1">Board Exam Alert!</div>
                    <div className="text-xs">Stay focused and practice daily for best results</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/class-9"
                  className={`block w-full text-center py-3 px-4 rounded-xl border-2 border-dashed transition-all duration-300 ${
                    isDark 
                      ? 'border-gray-600 hover:border-purple-500 text-gray-300 hover:text-purple-400' 
                      : 'border-gray-300 hover:border-purple-400 text-gray-600 hover:text-purple-600'
                  }`}
                >
                  ← Review Class 9th Basics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class10;