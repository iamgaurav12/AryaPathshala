// src/context/DataContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { initializeClassData } from '../firebase/firestore';
import { defaultClass9Data, defaultClass10Data } from '../data/defaultContent';

// Create context
const DataContext = createContext();

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CHAPTERS: 'SET_CHAPTERS',
  SET_SELECTED_CLASS: 'SET_SELECTED_CLASS',
  SET_SELECTED_CHAPTER: 'SET_SELECTED_CHAPTER',
  CLEAR_SELECTED_CHAPTER: 'CLEAR_SELECTED_CHAPTER'
};

// Initial state
const initialState = {
  selectedClass: null,
  selectedChapter: null,
  chapters: [],
  loading: false,
  error: null
};

// Reducer
const dataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.SET_CHAPTERS:
      return { ...state, chapters: action.payload, loading: false, error: null };
    case actionTypes.SET_SELECTED_CLASS:
      return { ...state, selectedClass: action.payload, selectedChapter: null };
    case actionTypes.SET_SELECTED_CHAPTER:
      return { ...state, selectedChapter: action.payload };
    case actionTypes.CLEAR_SELECTED_CHAPTER:
      return { ...state, selectedChapter: null };
    default:
      return state;
  }
};

// Data Provider Component
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Initialize default data on app start
  useEffect(() => {
    const initializeDefaultData = async () => {
      try {
        // Initialize both classes with default data
        await initializeClassData('class9', defaultClass9Data);
        await initializeClassData('class10', defaultClass10Data);
      } catch (error) {
        console.error('Error initializing default data:', error);
      }
    };

    initializeDefaultData();
  }, []);

  // Select a class (9 or 10)
  const selectClass = (className) => {
    dispatch({ type: actionTypes.SET_SELECTED_CLASS, payload: className });
    dispatch({ type: actionTypes.CLEAR_SELECTED_CHAPTER });
  };

  // Select a chapter
  const selectChapter = (chapter) => {
    dispatch({ type: actionTypes.SET_SELECTED_CHAPTER, payload: chapter });
  };

  // Clear selected chapter
  const clearSelectedChapter = () => {
    dispatch({ type: actionTypes.CLEAR_SELECTED_CHAPTER });
  };

  // Get chapter by id
  const getChapterById = (chapterId) => {
    return state.chapters.find(chapter => chapter.id === chapterId);
  };

  const contextValue = {
    // State
    ...state,
    
    // Actions
    selectClass,
    selectChapter,
    clearSelectedChapter,
    getChapterById,
    
    // Action types for child components
    actionTypes,
    dispatch
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// Hook to use data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Higher-order component for components that need Firebase data
export const withFirestoreData = (Component, className) => {
  return function WrappedComponent(props) {
    const { chapters, loading, error, ...firestoreActions } = useFirestore(className);
    const { dispatch } = useData();

    // Update context when Firebase data changes
    useEffect(() => {
      if (chapters) {
        dispatch({ type: actionTypes.SET_CHAPTERS, payload: chapters });
      }
    }, [chapters, dispatch]);

    useEffect(() => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    }, [loading, dispatch]);

    useEffect(() => {
      if (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error });
      }
    }, [error, dispatch]);

    return (
      <Component 
        {...props} 
        chapters={chapters}
        loading={loading}
        error={error}
        {...firestoreActions}
      />
    );
  };
};