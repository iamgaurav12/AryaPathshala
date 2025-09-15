import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '../firebase/auth';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const StudentAuthContext = createContext();

export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error('useStudentAuth must be used within a StudentAuthProvider');
  }
  return context;
};

export const StudentAuthProvider = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get additional student data from Firestore
        const studentDoc = await getDoc(doc(db, 'students', user.uid));
        const studentData = studentDoc.exists() ? studentDoc.data() : {};
        
        setCurrentStudent({
          uid: user.uid,
          email: user.email,
          ...studentData
        });
      } else {
        setCurrentStudent(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, additionalData = {}) => {
    try {
      setError(null);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create student profile in Firestore
      await setDoc(doc(db, 'students', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
        ...additionalData
      });

      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    currentStudent,
    loading,
    error,
    signup,
    login,
    logout
  };

  return (
    <StudentAuthContext.Provider value={value}>
      {!loading && children}
    </StudentAuthContext.Provider>
  );
};