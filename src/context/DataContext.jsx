// src/context/DataContext.jsx - IMPROVED VERSION
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
  CLEAR_SELECTED_CHAPTER: 'CLEAR_SELECTED_CHAPTER',
  SET_INITIALIZATION_STATUS: 'SET_INITIALIZATION_STATUS'
};

// Initial state
const initialState = {
  selectedClass: null,
  selectedChapter: null,
  chapters: [],
  loading: false,
  error: null,
  initializationComplete: false
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
    case actionTypes.SET_INITIALIZATION_STATUS:
      return { ...state, initializationComplete: action.payload };
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
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        
        
        // Initialize both classes with default data
        await Promise.all([
          initializeClassData('class9', defaultClass9Data).catch(error => {
            console.error('Error initializing class9:', error);
            return null; // Don't let one failure stop the other
          }),
          initializeClassData('class10', defaultClass10Data).catch(error => {
            console.error('Error initializing class10:', error);
            return null;
          })
        ]);
        
        dispatch({ type: actionTypes.SET_INITIALIZATION_STATUS, payload: true });
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        
      } catch (error) {
        console.error('Error during data initialization:', error);
        
        // Provide helpful error messages
        let userFriendlyMessage = 'Failed to initialize app data. ';
        
        if (error.code === 'permission-denied') {
          userFriendlyMessage += 'Please check Firebase Security Rules.';
        } else if (error.code === 'unauthenticated') {
          userFriendlyMessage += 'User authentication required.';
        } else if (error.message?.includes('projectId')) {
          userFriendlyMessage += 'Firebase project configuration issue.';
        } else {
          userFriendlyMessage += 'Please check your internet connection and try again.';
        }
        
        dispatch({ 
          type: actionTypes.SET_ERROR, 
          payload: userFriendlyMessage 
        });
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

  // Clear error
  const clearError = () => {
    dispatch({ type: actionTypes.SET_ERROR, payload: null });
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
    clearError,
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