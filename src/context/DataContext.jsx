import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const defaultData = {
  class9: [
    {
      title: "Introduction to Algebra",
      notes: "https://drive.google.com/file/d/example1",
      dpp: "https://drive.google.com/file/d/example2",
      lecture: "https://youtube.com/watch?v=example1"
    },
    {
      title: "Linear Equations",
      notes: "https://drive.google.com/file/d/example3",
      dpp: "",
      lecture: "https://youtube.com/watch?v=example2"
    }
  ],
  class10: [
    {
      title: "Quadratic Equations",
      notes: "https://drive.google.com/file/d/example4",
      dpp: "https://drive.google.com/file/d/example5",
      lecture: "https://youtube.com/watch?v=example3"
    }
  ]
};

export const DataProvider = ({ children }) => {
  const [coursesData, setCoursesData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('aryapathshala_courses');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setCoursesData(parsedData);
      }
    } catch (error) {
      console.error('Error loading courses data:', error);
      // Use default data if there's an error
      setCoursesData(defaultData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save data to localStorage whenever coursesData changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('aryapathshala_courses', JSON.stringify(coursesData));
      } catch (error) {
        console.error('Error saving courses data:', error);
      }
    }
  }, [coursesData, loading]);

  const updateChapter = (className, chapterIndex, updatedChapter) => {
    setCoursesData(prev => {
      const newData = { ...prev };
      if (!newData[className]) {
        newData[className] = [];
      }
      newData[className][chapterIndex] = updatedChapter;
      return newData;
    });
  };

  const addChapter = (className, newChapter) => {
    setCoursesData(prev => {
      const newData = { ...prev };
      if (!newData[className]) {
        newData[className] = [];
      }
      newData[className].push(newChapter);
      return newData;
    });
  };

  const deleteChapter = (className, chapterIndex) => {
    setCoursesData(prev => {
      const newData = { ...prev };
      if (newData[className]) {
        newData[className].splice(chapterIndex, 1);
      }
      return newData;
    });
  };

  const getChaptersByClass = (className) => {
    return coursesData[className] || [];
  };

  const resetData = () => {
    setCoursesData(defaultData);
    localStorage.removeItem('aryapathshala_courses');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(coursesData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'aryapathshala_courses.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (jsonData) => {
    try {
      const parsedData = JSON.parse(jsonData);
      setCoursesData(parsedData);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  const value = {
    coursesData,
    loading,
    updateChapter,
    addChapter,
    deleteChapter,
    getChaptersByClass,
    resetData,
    exportData,
    importData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};