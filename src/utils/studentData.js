import { db } from '../firebase/config';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

export const saveContentForStudent = async (studentId, content) => {
  if (!studentId) throw new Error('Student ID is required');
  
  try {
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, {
      savedContent: arrayUnion(content)
    });
  } catch (error) {
    console.error('Error saving content:', error);
    throw error;
  }
};

export const removeContentForStudent = async (studentId, content) => {
  if (!studentId) throw new Error('Student ID is required');
  
  try {
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, {
      savedContent: arrayRemove(content)
    });
  } catch (error) {
    console.error('Error removing content:', error);
    throw error;
  }
};

export const updateStudentProgress = async (studentId, chapterId, progress) => {
  if (!studentId) throw new Error('Student ID is required');
  
  try {
    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, {
      [`progress.${chapterId}`]: progress
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};

export const getStudentData = async (studentId) => {
  if (!studentId) throw new Error('Student ID is required');
  
  try {
    const studentRef = doc(db, 'students', studentId);
    const studentDoc = await getDoc(studentRef);
    
    if (studentDoc.exists()) {
      return studentDoc.data();
    } else {
      throw new Error('Student document not found');
    }
  } catch (error) {
    console.error('Error getting student data:', error);
    throw error;
  }
};