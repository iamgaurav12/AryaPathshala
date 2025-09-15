import { db } from './config';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  updateDoc 
} from 'firebase/firestore';

// Students Collection
export const studentsRef = collection(db, 'students');

// Courses Collection
export const coursesRef = collection(db, 'courses');
export const class9Ref = doc(db, 'courses', 'class9');
export const class10Ref = doc(db, 'courses', 'class10');

// Helper Functions for Students
export const createStudent = async (studentId, data) => {
  const studentDoc = doc(studentsRef, studentId);
  await setDoc(studentDoc, {
    name: data.name,
    email: data.email,
    class: data.class,
    savedContent: [],
    progress: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
};

export const getStudent = async (studentId) => {
  const studentDoc = await getDoc(doc(studentsRef, studentId));
  return studentDoc.exists() ? studentDoc.data() : null;
};

export const updateStudent = async (studentId, data) => {
  const studentDoc = doc(studentsRef, studentId);
  await updateDoc(studentDoc, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

// Helper Functions for Courses
export const createChapter = async (classLevel, chapterData) => {
  const classRef = classLevel === '9' ? class9Ref : class10Ref;
  const chaptersRef = collection(classRef, 'chapters');
  const newChapterRef = doc(chaptersRef);
  
  await setDoc(newChapterRef, {
    ...chapterData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  return newChapterRef.id;
};

export const getChapters = async (classLevel) => {
  const classRef = classLevel === '9' ? class9Ref : class10Ref;
  const chaptersRef = collection(classRef, 'chapters');
  const chaptersSnapshot = await getDocs(chaptersRef);
  
  return chaptersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getChapter = async (classLevel, chapterId) => {
  const classRef = classLevel === '9' ? class9Ref : class10Ref;
  const chapterDoc = await getDoc(doc(classRef, 'chapters', chapterId));
  return chapterDoc.exists() ? { id: chapterDoc.id, ...chapterDoc.data() } : null;
};

export const updateChapter = async (classLevel, chapterId, data) => {
  const classRef = classLevel === '9' ? class9Ref : class10Ref;
  const chapterDoc = doc(classRef, 'chapters', chapterId);
  
  await updateDoc(chapterDoc, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};