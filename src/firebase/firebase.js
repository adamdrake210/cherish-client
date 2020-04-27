import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: 'cherish-v2.firebaseapp.com',
  databaseURL: 'https://cherish-v2.firebaseio.com',
  projectId: 'cherish-v2',
  storageBucket: 'cherish-v2.appspot.com',
  messagingSenderId: process.env.REACT_API_MESSAGE_SENDER_ID,
  appId: process.env.REACT_API_APP_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();
// firebase.analytics();

export { firebase, firestore };
