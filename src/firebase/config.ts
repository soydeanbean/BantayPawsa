import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCCUZqb5jfuAWP9aiC71r7l84L15rayUIc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bantaypawsa.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bantaypawsa",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bantaypawsa.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "196159188855",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:196159188855:web:3efc0a05ab5414c5557b72",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-E5GKLR8R2V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);