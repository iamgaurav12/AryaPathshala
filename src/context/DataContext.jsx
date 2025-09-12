import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const defaultCourseData = {
  class9: {
    subjects: {
      mathematics: {
        name: "Mathematics",
        color: "bg-blue-500",
        icon: "📐",
        chapters: [
          {
            id: 1,
            name: "Number Systems",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 2,
            name: "Polynomials",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 3,
            name: "Coordinate Geometry",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 4,
            name: "Linear Equations in Two Variables",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 5,
            name: "Introduction to Euclid's Geometry",
            notes: "",
            dpp: "",
            lecture: ""
          }
        ]
      },
      science: {
        name: "Science",
        color: "bg-green-500",
        icon: "🧪",
        chapters: [
          {
            id: 1,
            name: "Matter in Our Surroundings",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 2,
            name: "Is Matter Around Us Pure",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 3,
            name: "Atoms and Molecules",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 4,
            name: "Structure of the Atom",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 5,
            name: "The Fundamental Unit of Life",
            notes: "",
            dpp: "",
            lecture: ""
          }
        ]
      },
      socialScience: {
        name: "Social Science",
        color: "bg-purple-500",
        icon: "🌍",
        chapters: [
          {
            id: 1,
            name: "The French Revolution",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 2,
            name: "Socialism in Europe and Russian Revolution",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 3,
            name: "Nazism and the Rise of Hitler",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 4,
            name: "Forest Society and Colonialism",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 5,
            name: "Pastoralists in the Modern World",
            notes: "",
            dpp: "",
            lecture: ""
          }
        ]
      }
    }
  },
  class10: {
    subjects: {
      mathematics: {
        name: "Mathematics",
        color: "bg-blue-500",
        icon: "📐",
        chapters: [
          {
            id: 1,
            name: "Real Numbers",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 2,
            name: "Polynomials",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 3,
            name: "Pair of Linear Equations in Two Variables",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 4,
            name: "Quadratic Equations",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 5,
            name: "Arithmetic Progressions",
            notes: "",
            dpp: "",
            lecture: ""
          }
        ]
      },
      science: {
        name: "Science",
        color: "bg-green-500",
        icon: "🧪",
        chapters: [
          {
            id: 1,
            name: "Chemical Reactions and Equations",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 2,
            name: "Acids, Bases and Salts",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 3,
            name: "Metals and Non-metals",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 4,
            name: "Carbon and its Compounds",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 5,
            name: "Life Processes",
            notes: "",
            dpp: "",
            lecture: ""
          }
        ]
      },
      socialScience: {
        name: "Social Science",
        color: "bg-purple-500",
        icon: "🌍",
        chapters: [
          {
            id: 1,
            name: "The Rise of Nationalism in Europe",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 2,
            name: "The Nationalist Movement in Indo-China",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 3,
            name: "Nationalism in India",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 4,
            name: "The Making of a Global World",
            notes: "",
            dpp: "",
            lecture: ""
          },
          {
            id: 5,
            name: "The Age of Industrialisation",
            notes: "",
            dpp: "",
            lecture: ""
          }
        ]
      }
    }
  }
};

export const DataProvider = ({ children }) => {
  const [courseData, setCourseData] = useState(() => {
    const savedData = localStorage.getItem('courseData');
    return savedData ? JSON.parse(savedData) : defaultCourseData;
  });

  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    localStorage.setItem('courseData', JSON.stringify(courseData));
  }, [courseData]);

  const updateChapter = (classNumber, subject, chapterId, updates) => {
    setCourseData(prevData => {
      const newData = { ...prevData };
      const chapterIndex = newData[`class${classNumber}`].subjects[subject].chapters.findIndex(
        chapter => chapter.id === chapterId
      );
      
      if (chapterIndex !== -1) {
        newData[`class${classNumber}`].subjects[subject].chapters[chapterIndex] = {
          ...newData[`class${classNumber}`].subjects[subject].chapters[chapterIndex],
          ...updates
        };
      }
      
      return newData;
    });
  };

  const addChapter = (classNumber, subject, newChapter) => {
    setCourseData(prevData => {
      const newData = { ...prevData };
      const chapters = newData[`class${classNumber}`].subjects[subject].chapters;
      const newId = Math.max(...chapters.map(ch => ch.id), 0) + 1;
      
      newData[`class${classNumber}`].subjects[subject].chapters.push({
        id: newId,
        name: newChapter.name,
        notes: newChapter.notes || "",
        dpp: newChapter.dpp || "",
        lecture: newChapter.lecture || ""
      });
      
      return newData;
    });
  };

  const deleteChapter = (classNumber, subject, chapterId) => {
    setCourseData(prevData => {
      const newData = { ...prevData };
      newData[`class${classNumber}`].subjects[subject].chapters = 
        newData[`class${classNumber}`].subjects[subject].chapters.filter(
          chapter => chapter.id !== chapterId
        );
      
      return newData;
    });
  };

  const value = {
    courseData,
    selectedChapter,
    setSelectedChapter,
    updateChapter,
    addChapter,
    deleteChapter
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};