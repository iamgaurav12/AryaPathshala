import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create Data Context
const DataContext = createContext();

// Custom hook to use Data Context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Initial course data structure
const initialCourseData = {
  '9': [
    {
      id: '9-ch-1',
      title: 'Number Systems',
      description: 'Real numbers, rational and irrational numbers, representation of real numbers on number line',
      subject: 'Mathematics',
      notesLink: '',
      dppLink: '',
      lectureLink: '',
      order: 1,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '9-ch-2',
      title: 'Polynomials',
      description: 'Introduction to polynomials, types of polynomials, operations on polynomials',
      subject: 'Mathematics',
      notesLink: '',
      dppLink: '',
      lectureLink: '',
      order: 2,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '9-ch-3',
      title: 'Matter in Our Surroundings',
      description: 'Physical nature of matter, states of matter, particle nature of matter',
      subject: 'Science',
      notesLink: '',
      dppLink: '',
      lectureLink: '',
      order: 3,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  '10': [
    {
      id: '10-ch-1',
      title: 'Real Numbers',
      description: 'Euclid\'s division lemma, fundamental theorem of arithmetic, HCF and LCM',
      subject: 'Mathematics',
      notesLink: '',
      dppLink: '',
      lectureLink: '',
      order: 1,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '10-ch-2',
      title: 'Polynomials',
      description: 'Geometrical meaning of zeros, relationship between zeros and coefficients',
      subject: 'Mathematics',
      notesLink: '',
      dppLink: '',
      lectureLink: '',
      order: 2,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '10-ch-3',
      title: 'Light - Reflection and Refraction',
      description: 'Reflection of light, spherical mirrors, refraction of light, lenses',
      subject: 'Science',
      notesLink: '',
      dppLink: '',
      lectureLink: '',
      order: 3,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

// Team data
const teamData = {
  members: [
    {
      id: 1,
      name: 'Gaurav Sir',
      role: 'Mathematics Teacher',
      image: '/assets/images/team/gaurav.jpg',
      bio: 'Expert in Mathematics with 5+ years of teaching experience',
      subjects: ['Mathematics', 'Physics']
    },
    {
      id: 2,
      name: 'Priya Ma\'am',
      role: 'Science Teacher',
      image: '/assets/images/team/priya.jpg',
      bio: 'Passionate Science teacher with innovative teaching methods',
      subjects: ['Physics', 'Chemistry', 'Biology']
    },
    {
      id: 3,
      name: 'Rajesh Sir',
      role: 'English Teacher',
      image: '/assets/images/team/rajesh.jpg',
      bio: 'English literature enthusiast with excellent communication skills',
      subjects: ['English', 'Hindi']
    }
  ],
  teamPhoto: '/assets/images/team/team-photo.jpg',
  motto: 'Empowering Students for a Brighter Future',
  description: 'At Aryapathshala, we believe in providing quality education that nurtures young minds and helps them achieve their dreams.'
};

// Data Provider Component
export const DataProvider = ({ children }) => {
  const [courseData, setCourseData] = useState(initialCourseData);
  const [team, setTeam] = useState(teamData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  // Save data to localStorage whenever courseData changes
  useEffect(() => {
    if (!isLoading) {
      saveDataToStorage();
    }
  }, [courseData, isLoading]);

  const loadDataFromStorage = () => {
    try {
      setIsLoading(true);
      
      // Load course data
      const savedCourseData = localStorage.getItem('aryapathshala_courses');
      if (savedCourseData) {
        const parsedData = JSON.parse(savedCourseData);
        setCourseData(parsedData.courses || initialCourseData);
        setLastUpdated(parsedData.lastUpdated || null);
      }

      // Load team data
      const savedTeamData = localStorage.getItem('aryapathshala_team');
      if (savedTeamData) {
        setTeam(JSON.parse(savedTeamData));
      }

    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      setError('Failed to load saved data. Using default data.');
      setCourseData(initialCourseData);
      setTeam(teamData);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDataToStorage = () => {
    try {
      const dataToSave = {
        courses: courseData,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('aryapathshala_courses', JSON.stringify(dataToSave));
      localStorage.setItem('aryapathshala_team', JSON.stringify(team));
      setLastUpdated(dataToSave.lastUpdated);
      
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      setError('Failed to save data. Changes may be lost.');
    }
  };

  // Chapter CRUD operations
  const addChapter = useCallback((classNumber, chapterData) => {
    try {
      const newChapter = {
        id: `${classNumber}-ch-${Date.now()}`,
        ...chapterData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        order: courseData[classNumber].length + 1
      };

      setCourseData(prev => ({
        ...prev,
        [classNumber]: [...prev[classNumber], newChapter].sort((a, b) => a.order - b.order)
      }));

      return { success: true, chapter: newChapter };
    } catch (error) {
      console.error('Error adding chapter:', error);
      return { success: false, error: error.message };
    }
  }, [courseData]);

  const updateChapter = useCallback((classNumber, chapterId, updatedData) => {
    try {
      setCourseData(prev => ({
        ...prev,
        [classNumber]: prev[classNumber].map(chapter =>
          chapter.id === chapterId
            ? { ...chapter, ...updatedData, updatedAt: new Date().toISOString() }
            : chapter
        )
      }));

      return { success: true };
    } catch (error) {
      console.error('Error updating chapter:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const deleteChapter = useCallback((classNumber, chapterId) => {
    try {
      setCourseData(prev => ({
        ...prev,
        [classNumber]: prev[classNumber].filter(chapter => chapter.id !== chapterId)
      }));

      return { success: true };
    } catch (error) {
      console.error('Error deleting chapter:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const reorderChapters = useCallback((classNumber, chapters) => {
    try {
      const reorderedChapters = chapters.map((chapter, index) => ({
        ...chapter,
        order: index + 1,
        updatedAt: new Date().toISOString()
      }));

      setCourseData(prev => ({
        ...prev,
        [classNumber]: reorderedChapters
      }));

      return { success: true };
    } catch (error) {
      console.error('Error reordering chapters:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Utility functions
  const getChaptersByClass = useCallback((classNumber) => {
    return courseData[classNumber] || [];
  }, [courseData]);

  const getChapterById = useCallback((classNumber, chapterId) => {
    return courseData[classNumber]?.find(chapter => chapter.id === chapterId) || null;
  }, [courseData]);

  const getChaptersBySubject = useCallback((classNumber, subject) => {
    return courseData[classNumber]?.filter(chapter => chapter.subject === subject) || [];
  }, [courseData]);

  const getPublishedChapters = useCallback((classNumber) => {
    return courseData[classNumber]?.filter(chapter => chapter.isPublished) || [];
  }, [courseData]);

  const getTotalChapters = useCallback((classNumber) => {
    return courseData[classNumber]?.length || 0;
  }, [courseData]);

  const getSubjects = useCallback((classNumber) => {
    const chapters = courseData[classNumber] || [];
    return [...new Set(chapters.map(chapter => chapter.subject))];
  }, [courseData]);

  const searchChapters = useCallback((classNumber, searchTerm) => {
    const chapters = courseData[classNumber] || [];
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return chapters.filter(chapter =>
      chapter.title.toLowerCase().includes(lowerSearchTerm) ||
      chapter.description.toLowerCase().includes(lowerSearchTerm) ||
      chapter.subject.toLowerCase().includes(lowerSearchTerm)
    );
  }, [courseData]);

  // Bulk operations
  const bulkUpdateChapters = useCallback((classNumber, updates) => {
    try {
      setCourseData(prev => ({
        ...prev,
        [classNumber]: prev[classNumber].map(chapter => {
          const update = updates.find(u => u.id === chapter.id);
          return update 
            ? { ...chapter, ...update, updatedAt: new Date().toISOString() }
            : chapter;
        })
      }));

      return { success: true };
    } catch (error) {
      console.error('Error bulk updating chapters:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const bulkPublishChapters = useCallback((classNumber, chapterIds, isPublished = true) => {
    try {
      setCourseData(prev => ({
        ...prev,
        [classNumber]: prev[classNumber].map(chapter =>
          chapterIds.includes(chapter.id)
            ? { ...chapter, isPublished, updatedAt: new Date().toISOString() }
            : chapter
        )
      }));

      return { success: true };
    } catch (error) {
      console.error('Error bulk publishing chapters:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Data export/import
  const exportData = useCallback(() => {
    try {
      const exportData = {
        courses: courseData,
        team: team,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };

      return { success: true, data: exportData };
    } catch (error) {
      console.error('Error exporting data:', error);
      return { success: false, error: error.message };
    }
  }, [courseData, team]);

  const importData = useCallback((importedData) => {
    try {
      if (importedData.courses) {
        setCourseData(importedData.courses);
      }
      if (importedData.team) {
        setTeam(importedData.team);
      }

      return { success: true };
    } catch (error) {
      console.error('Error importing data:', error);
      return { success: false, error: error.message };
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset data
  const resetData = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      setCourseData(initialCourseData);
      setTeam(teamData);
      localStorage.removeItem('aryapathshala_courses');
      localStorage.removeItem('aryapathshala_team');
      return { success: true };
    }
    return { success: false };
  }, []);

  const contextValue = {
    // State
    courseData,
    team,
    isLoading,
    error,
    lastUpdated,

    // Chapter CRUD operations
    addChapter,
    updateChapter,
    deleteChapter,
    reorderChapters,

    // Utility functions
    getChaptersByClass,
    getChapterById,
    getChaptersBySubject,
    getPublishedChapters,
    getTotalChapters,
    getSubjects,
    searchChapters,

    // Bulk operations
    bulkUpdateChapters,
    bulkPublishChapters,

    // Data management
    exportData,
    importData,
    resetData,
    clearError,

    // Refresh data
    refreshData: loadDataFromStorage,

    // Statistics
    stats: {
      totalClass9Chapters: getTotalChapters('9'),
      totalClass10Chapters: getTotalChapters('10'),
      totalChapters: getTotalChapters('9') + getTotalChapters('10'),
      publishedClass9: getPublishedChapters('9').length,
      publishedClass10: getPublishedChapters('10').length,
      subjects9: getSubjects('9'),
      subjects10: getSubjects('10'),
    }
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;