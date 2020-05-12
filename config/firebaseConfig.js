const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'cherish-v2.firebaseapp.com',
  databaseURL: 'https://cherish-v2.firebaseio.com',
  projectId: 'cherish-v2',
  storageBucket: 'cherish-v2.appspot.com',
  messagingSenderId: process.env.REACT_API_APP_ID,
  appId: process.env.REACT_API_APP_ID,
};

export default firebaseConfig;
