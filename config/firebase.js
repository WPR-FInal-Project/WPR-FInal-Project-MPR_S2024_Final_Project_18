// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtWY0HW1X63OsKzTNVhWBDG_FERBlkERY",
  authDomain: "mpr-final-project.firebaseapp.com",
  projectId: "mpr-final-project",
  storageBucket: "mpr-final-project.appspot.com",
  messagingSenderId: "743416125568",
  appId: "1:743416125568:web:e56fdb6b86ee6e5254ae65",
  measurementId: "G-GW4NHRH7RW"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);

export const userCollection = collection(db, 'users');

export const skillCollection = collection(db, 'skills');

