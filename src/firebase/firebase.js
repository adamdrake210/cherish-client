import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';
import firebaseConfig from './config';

// Initialize Firebase
if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}
const auth = app.auth();
const firestore = app.firestore();
// firebase.analytics();

export { app, firestore, auth };
