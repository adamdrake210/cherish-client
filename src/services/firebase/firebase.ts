import { initializeApp, getApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './config/firebaseConfig';
import { getFirestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp;

try {
  firebaseApp = getApp();
} catch {
  firebaseApp = initializeApp(firebaseConfig);
}

const db = getFirestore();

const auth = getAuth();

export { firebaseApp, db, auth };
