// src/hooks/useFirestore.jsx
import { useState, useEffect } from 'react';
import {
  getChapters,
  getChapter,
  addChapter,
  updateChapter,
  deleteChapter,
  reorderChapters,
  subscribeToChapters,
  initializeClassData
} from '../firebase/firestore';

export const useFirestore = (className) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chapters on mount
  useEffect(() => {
    if (!className) return;

    let unsubscribe;

    const setupListener = async () => {
      try {
        setLoading(true);
        
        // Initialize class data if it doesn't exist
        await initializeClassData(className);
        
        // Set up real-time listener
        unsubscribe = subscribeToChapters(className, (chaptersData) => {
          setChapters(chaptersData);
          setLoading(false);
          setError(null);
        });
        
      } catch (err) {
        console.error('Error setting up Firestore listener:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    setupListener();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [className]);

  // Add new chapter
  const addNewChapter = async (chapterData) => {
    try {
      setError(null);
      const chapterId = await addChapter(className, chapterData);
      return chapterId;
    } catch (err) {
      console.error('Error adding chapter:', err);
      setError(err.message);
      throw err;
    }
  };

  // Update existing chapter
  const updateExistingChapter = async (chapterId, chapterData) => {
    try {
      setError(null);
      await updateChapter(className, chapterId, chapterData);
    } catch (err) {
      console.error('Error updating chapter:', err);
      setError(err.message);
      throw err;
    }
  };

  // Delete chapter
  const removeChapter = async (chapterId) => {
    try {
      setError(null);
      await deleteChapter(className, chapterId);
    } catch (err) {
      console.error('Error deleting chapter:', err);
      setError(err.message);
      throw err;
    }
  };

  // Reorder chapters
  const reorderChaptersList = async (newChaptersOrder) => {
    try {
      setError(null);
      await reorderChapters(className, newChaptersOrder);
    } catch (err) {
      console.error('Error reordering chapters:', err);
      setError(err.message);
      throw err;
    }
  };

  return {
    chapters,
    loading,
    error,
    addChapter: addNewChapter,
    updateChapter: updateExistingChapter,
    deleteChapter: removeChapter,
    reorderChapters: reorderChaptersList
  };
};

// Hook for managing a single chapter
export const useChapter = (className, chapterId) => {
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!className || !chapterId) return;

    const fetchChapter = async () => {
      try {
        setLoading(true);
        const chapterData = await getChapter(className, chapterId);
        setChapter(chapterData);
        setError(null);
      } catch (err) {
        console.error('Error fetching chapter:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [className, chapterId]);

  return { chapter, loading, error };
};