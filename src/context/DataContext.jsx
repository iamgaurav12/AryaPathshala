import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { defaultCourseData } from '../data/defaultContent';

const DataContext = createContext();

// Action types
const DATA_ACTIONS = {
  LOAD_DATA: 'LOAD_DATA',
  UPDATE_CHAPTER: 'UPDATE_CHAPTER',
  ADD_CHAPTER: 'ADD_CHAPTER',
  DELETE_CHAPTER: 'DELETE_CHAPTER',
  UPDATE_RESOURCE: 'UPDATE_RESOURCE',
  RESET_DATA: 'RESET_DATA'
};

// Initial state
const initialState = {
  courses: {
    class9: defaultCourseData.class9,
    class10: defaultCourseData.class10
  },
  lastUpdated: Date.now()
};

// Reducer function
function dataReducer(state, action) {
  switch (action.type) {
    case DATA_ACTIONS.LOAD_DATA:
      return {
        ...action.payload,
        lastUpdated: Date.now()
      };

    case DATA_ACTIONS.UPDATE_CHAPTER:
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.payload.classType]: state.courses[action.payload.classType].map(chapter =>
            chapter.id === action.payload.chapterId
              ? { ...chapter, ...action.payload.updates }
              : chapter
          )
        },
        lastUpdated: Date.now()
      };

    case DATA_ACTIONS.ADD_CHAPTER:
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.payload.classType]: [
            ...state.courses[action.payload.classType],
            {
              id: Date.now().toString(),
              ...action.payload.chapter,
              resources: action.payload.chapter.resources || {
                notes: '',
                dpp: '',
                lecture: ''
              }
            }
          ]
        },
        lastUpdated: Date.now()
      };

    case DATA_ACTIONS.DELETE_CHAPTER:
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.payload.classType]: state.courses[action.payload.classType].filter(
            chapter => chapter.id !== action.payload.chapterId
          )
        },
        lastUpdated: Date.now()
      };

    case DATA_ACTIONS.UPDATE_RESOURCE:
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.payload.classType]: state.courses[action.payload.classType].map(chapter =>
            chapter.id === action.payload.chapterId
              ? {
                  ...chapter,
                  resources: {
                    ...chapter.resources,
                    [action.payload.resourceType]: action.payload.url
                  }
                }
              : chapter
          )
        },
        lastUpdated: Date.now()
      };

    case DATA_ACTIONS.RESET_DATA:
      return {
        ...initialState,
        lastUpdated: Date.now()
      };

    default:
      return state;
  }
}

// Custom hook to use data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Data Provider component
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('aryapathshala-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: DATA_ACTIONS.LOAD_DATA, payload: parsedData });
      } catch (error) {
        console.error('Failed to load saved data:', error);
        // If loading fails, save current state to localStorage
        localStorage.setItem('aryapathshala-data', JSON.stringify(state));
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('aryapathshala-data', JSON.stringify(state));
  }, [state]);

  // Action creators
  const actions = {
    updateChapter: (classType, chapterId, updates) => {
      dispatch({
        type: DATA_ACTIONS.UPDATE_CHAPTER,
        payload: { classType, chapterId, updates }
      });
    },

    addChapter: (classType, chapter) => {
      dispatch({
        type: DATA_ACTIONS.ADD_CHAPTER,
        payload: { classType, chapter }
      });
    },

    deleteChapter: (classType, chapterId) => {
      dispatch({
        type: DATA_ACTIONS.DELETE_CHAPTER,
        payload: { classType, chapterId }
      });
    },

    updateResource: (classType, chapterId, resourceType, url) => {
      dispatch({
        type: DATA_ACTIONS.UPDATE_RESOURCE,
        payload: { classType, chapterId, resourceType, url }
      });
    },

    resetData: () => {
      dispatch({ type: DATA_ACTIONS.RESET_DATA });
    },

    // Helper functions
    getChapter: (classType, chapterId) => {
      return state.courses[classType]?.find(chapter => chapter.id === chapterId);
    },

    getAllChapters: (classType) => {
      return state.courses[classType] || [];
    }
  };

  const value = {
    ...state,
    ...actions,
    dispatch // For direct access if needed
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};