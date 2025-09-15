// src/firebase/firestore.js
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
  onSnapshot
} from 'firebase/firestore';
import { db } from './config';

// Collection references
const coursesRef = collection(db, 'courses');

// Get all chapters for a specific class
export const getChapters = async (className) => {
  try {
    const classDoc = doc(db, 'courses', className);
    const chaptersRef = collection(classDoc, 'chapters');
    const q = query(chaptersRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};

// Get a specific chapter
export const getChapter = async (className, chapterId) => {
  try {
    const chapterDoc = doc(db, 'courses', className, 'chapters', chapterId);
    const snapshot = await getDoc(chapterDoc);
    
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error('Chapter not found');
    }
  } catch (error) {
    console.error('Error fetching chapter:', error);
    throw error;
  }
};

// Add a new chapter
export const addChapter = async (className, chapterData) => {
  try {
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
    console.error('Error adding chapter:', error);
    throw error;
  }
};

// Update a chapter
export const updateChapter = async (className, chapterId, chapterData) => {
  try {
    const chapterDoc = doc(db, 'courses', className, 'chapters', chapterId);
    await updateDoc(chapterDoc, {
      ...chapterData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating chapter:', error);
    throw error;
  }
};

// Delete a chapter
export const deleteChapter = async (className, chapterId) => {
  try {
    const chapterDoc = doc(db, 'courses', className, 'chapters', chapterId);
    await deleteDoc(chapterDoc);
  } catch (error) {
    console.error('Error deleting chapter:', error);
    throw error;
  }
};

// Reorder chapters
export const reorderChapters = async (className, chapters) => {
  try {
    const batch = [];
    
    chapters.forEach((chapter, index) => {
      const chapterDoc = doc(db, 'courses', className, 'chapters', chapter.id);
      batch.push(
        updateDoc(chapterDoc, {
          order: index + 1,
          updatedAt: serverTimestamp()
        })
      );
    });
    
    await Promise.all(batch);
  } catch (error) {
    console.error('Error reordering chapters:', error);
    throw error;
  }
};

// Real-time listener for chapters
export const subscribeToChapters = (className, callback) => {
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
    console.error('Error in chapters subscription:', error);
  });
};

// Initialize default data for a class if it doesn't exist
export const initializeClassData = async (className, defaultChapters = []) => {
  try {
    const classDoc = doc(db, 'courses', className);
    const classSnapshot = await getDoc(classDoc);
    
    if (!classSnapshot.exists()) {
      // Create the class document
      await setDoc(classDoc, {
        name: className,
        createdAt: serverTimestamp()
      });
      
      // Add default chapters if provided
      if (defaultChapters.length > 0) {
        const chaptersRef = collection(classDoc, 'chapters');
        const batch = defaultChapters.map((chapter, index) => 
          addDoc(chaptersRef, {
            ...chapter,
            order: index + 1,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          })
        );
        
        await Promise.all(batch);
      }
    }
  } catch (error) {
    console.error('Error initializing class data:', error);
    throw error;
  }
};