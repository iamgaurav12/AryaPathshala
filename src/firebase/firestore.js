// src/firebase/firestore.js - IMPROVED VERSION
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  orderBy, 
  query,
  serverTimestamp,
  onSnapshot,
  writeBatch  // Added for better batch operations
} from 'firebase/firestore';
import { db } from './config';

// Collection references
const coursesRef = collection(db, 'courses');

// Get all chapters for a specific class
export const getChapters = async (className) => {
  try {
    if (!className) {
      throw new Error('Class name is required');
    }
    
    const classDoc = doc(db, 'courses', className);
    const chaptersRef = collection(classDoc, 'chapters');
    const q = query(chaptersRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching chapters for ${className}:`, error);
    throw error;
  }
};

// Get a specific chapter
export const getChapter = async (className, chapterId) => {
  try {
    if (!className || !chapterId) {
      throw new Error('Class name and chapter ID are required');
    }
    
    const chapterDoc = doc(db, 'courses', className, 'chapters', chapterId);
    const snapshot = await getDoc(chapterDoc);
    
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error(`Chapter ${chapterId} not found in ${className}`);
    }
  } catch (error) {
    console.error(`Error fetching chapter ${chapterId} from ${className}:`, error);
    throw error;
  }
};

// Add a new chapter
export const addChapter = async (className, chapterData) => {
  try {
    if (!className || !chapterData) {
      throw new Error('Class name and chapter data are required');
    }
    
    const classDoc = doc(db, 'courses', className);
    const chaptersRef = collection(classDoc, 'chapters');
    
    // Get the current chapters count for ordering
    const existingChapters = await getDocs(chaptersRef);
    const order = existingChapters.size + 1;
    
    const docRef = await addDoc(chaptersRef, {
      ...chapterData,
      order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error(`Error adding chapter to ${className}:`, error);
    throw error;
  }
};

// Update a chapter
export const updateChapter = async (className, chapterId, chapterData) => {
  try {
    if (!className || !chapterId || !chapterData) {
      throw new Error('Class name, chapter ID, and chapter data are required');
    }
    
    const chapterDoc = doc(db, 'courses', className, 'chapters', chapterId);
    await updateDoc(chapterDoc, {
      ...chapterData,
      updatedAt: serverTimestamp()
    });
    
  } catch (error) {
    console.error(`Error updating chapter ${chapterId} in ${className}:`, error);
    throw error;
  }
};

// Delete a chapter
export const deleteChapter = async (className, chapterId) => {
  try {
    if (!className || !chapterId) {
      throw new Error('Class name and chapter ID are required');
    }
    
    const chapterDoc = doc(db, 'courses', className, 'chapters', chapterId);
    await deleteDoc(chapterDoc);
    
  } catch (error) {
    console.error(`Error deleting chapter ${chapterId} from ${className}:`, error);
    throw error;
  }
};

// Reorder chapters - IMPROVED with batch writes
export const reorderChapters = async (className, chapters) => {
  try {
    if (!className || !chapters || !Array.isArray(chapters)) {
      throw new Error('Class name and chapters array are required');
    }
    
    const batch = writeBatch(db);
    
    chapters.forEach((chapter, index) => {
      const chapterDoc = doc(db, 'courses', className, 'chapters', chapter.id);
      batch.update(chapterDoc, {
        order: index + 1,
        updatedAt: serverTimestamp()
      });
    });
    
    await batch.commit();
  } catch (error) {
    console.error(`Error reordering chapters in ${className}:`, error);
    throw error;
  }
};

// Real-time listener for chapters
export const subscribeToChapters = (className, callback) => {
  try {
    if (!className || typeof callback !== 'function') {
      throw new Error('Class name and callback function are required');
    }
    
    const classDoc = doc(db, 'courses', className);
    const chaptersRef = collection(classDoc, 'chapters');
    const q = query(chaptersRef, orderBy('order', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const chapters = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(chapters);
    }, (error) => {
      console.error(`Error in chapters subscription for ${className}:`, error);
      // Call callback with empty array on error to prevent app crash
      callback([]);
    });
  } catch (error) {
    console.error(`Error setting up subscription for ${className}:`, error);
    // Return a no-op unsubscribe function
    return () => {};
  }
};

// Initialize default data for a class - IMPROVED with better error handling
export const initializeClassData = async (className, defaultChapters = []) => {
  try {
    if (!className) {
      throw new Error('Class name is required');
    }
    
    
    const classDoc = doc(db, 'courses', className);
    const classSnapshot = await getDoc(classDoc);
    
    if (!classSnapshot.exists()) {
      
      // Create the class document
      await setDoc(classDoc, {
        name: className,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Add default chapters if provided
      if (defaultChapters && defaultChapters.length > 0) {
        
        const batch = writeBatch(db);
        const chaptersRef = collection(classDoc, 'chapters');
        
        defaultChapters.forEach((chapter, index) => {
          const chapterDocRef = doc(chaptersRef);
          batch.set(chapterDocRef, {
            ...chapter,
            order: index + 1,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        });
        
        await batch.commit();
      }
    } else {
      console.log(`hello`);
    }
  } catch (error) {
    console.error(`Error initializing class data for ${className}:`, error);
    
    // More specific error handling
    if (error.code === 'permission-denied') {
      console.error('❌ PERMISSION DENIED - Check your Firebase Security Rules');
      console.error('📚 Your app is trying to create/write data but the rules are blocking it');
    } else if (error.code === 'unauthenticated') {
      console.error('❌ UNAUTHENTICATED - User needs to be signed in');
    }
    
    throw error;
  }
};

// Helper function to check if a class exists
export const classExists = async (className) => {
  try {
    const classDoc = doc(db, 'courses', className);
    const snapshot = await getDoc(classDoc);
    return snapshot.exists();
  } catch (error) {
    console.error(`Error checking if class ${className} exists:`, error);
    return false;
  }
};