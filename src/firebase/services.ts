import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc,
  query, where, orderBy, limit
} from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { auth, googleProvider, db } from './config';
import type { Pet, Report, Story, UserProfile } from '@/types';

// ========== AUTH ==========

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signOutUser = () => signOut(auth);

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// ========== USERS ==========

export const createUserProfile = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      registeredPets: [],
      submittedReports: [],
      volunteerBadge: false,
      createdAt: Date.now()
    });
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

// ========== PETS ==========

let petCounter = 0;

const getNextPetId = async (): Promise<string> => {
  const counterRef = doc(db, 'meta', 'petCounter');
  const snap = await getDoc(counterRef);
  if (snap.exists()) {
    petCounter = snap.data().count || 0;
  }
  petCounter++;
  await setDoc(counterRef, { count: petCounter }, { merge: true });
  return `BP-${String(petCounter).padStart(6, '0')}`;
};

export const createPet = async (data: Omit<Pet, 'id' | 'petId' | 'createdAt' | 'updatedAt'>, photoURL?: string): Promise<Pet> => {
  const petId = await getNextPetId();

  const petData: Pet = {
    ...data,
    id: '',
    petId,
    photoURL: photoURL || '',
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  const docRef = await addDoc(collection(db, 'pets'), petData);
  petData.id = docRef.id;
  await updateDoc(docRef, { id: docRef.id });

  // Update user's registered pets
  const userRef = doc(db, 'users', data.userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const pets = userSnap.data().registeredPets || [];
    await updateDoc(userRef, { registeredPets: [...pets, petId] });
  }

  return petData;
};

export const getPetByPetId = async (petId: string): Promise<Pet | null> => {
  const q = query(collection(db, 'pets'), where('petId', '==', petId));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { ...snap.docs[0].data(), id: snap.docs[0].id } as Pet;
};

export const getPetById = async (id: string): Promise<Pet | null> => {
  const snap = await getDoc(doc(db, 'pets', id));
  return snap.exists() ? (snap.data() as Pet) : null;
};

export const getUserPets = async (userId: string): Promise<Pet[]> => {
  const q = query(collection(db, 'pets'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as Pet));
};

export const getAllPets = async (): Promise<Pet[]> => {
  const snap = await getDocs(collection(db, 'pets'));
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as Pet));
};

// ========== REPORTS ==========

export const createReport = async (data: Omit<Report, 'id' | 'createdAt'>, photoURL?: string): Promise<string> => {
  const reportData = {
    ...data,
    photoURL: photoURL || '',
    createdAt: Date.now()
  };

  const docRef = await addDoc(collection(db, 'reports'), reportData);
  await updateDoc(docRef, { id: docRef.id });

  // Update user's submitted reports
  const userRef = doc(db, 'users', data.userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const reports = userSnap.data().submittedReports || [];
    await updateDoc(userRef, { submittedReports: [...reports, docRef.id] });
  }

  return docRef.id;
};

export const getAllReports = async (): Promise<Report[]> => {
  const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as Report));
};

export const getRecentReports = async (limitCount = 10): Promise<Report[]> => {
  const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as Report));
};

// ========== STORIES ==========

export const getStories = async (): Promise<Story[]> => {
  const snap = await getDocs(collection(db, 'stories'));
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as Story));
};

export const likeStory = async (storyId: string, currentLikes: number) => {
  await updateDoc(doc(db, 'stories', storyId), { likes: currentLikes + 1 });
};

// ========== STATS ==========

export const getCommunityStats = async () => {
  const petsSnap = await getDocs(collection(db, 'pets'));
  const reportsSnap = await getDocs(collection(db, 'reports'));
  const usersSnap = await getDocs(collection(db, 'users'));

  return {
    totalPets: petsSnap.size,
    totalReports: reportsSnap.size,
    totalRescues: Math.floor(reportsSnap.size * 0.7),
    activeVolunteers: usersSnap.size
  };
};