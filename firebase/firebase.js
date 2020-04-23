import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: 'cherish-v2.firebaseapp.com',
  databaseURL: 'https://cherish-v2.firebaseio.com',
  projectId: 'cherish-v2',
  storageBucket: 'cherish-v2.appspot.com',
  messagingSenderId: '327696173692',
  appId: '1:327696173692:web:46ef512933a6e3511197f9',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();
// firebase.analytics();

export { firebase, firestore };
