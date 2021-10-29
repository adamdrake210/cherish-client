import { initializeApp, getApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../../config/firebaseConfig';
import { getFirestore } from 'firebase/firestore';

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// const firestore = firebase.;
// // firebase.analytics();

// export { firebase, firestore };
let firebaseApp: FirebaseApp;

try {
  firebaseApp = getApp();
} catch {
  firebaseApp = initializeApp(firebaseConfig);
}

const db = getFirestore();

export { firebaseApp, db };
