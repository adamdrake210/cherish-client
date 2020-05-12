const firebaseConfig = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: 'cherish-v2.appspot.com',
  messagingSenderId: process.env.FIREBASE_API_APP_ID,
  appId: process.env.FIREBASE_API_APP_ID,
};

export default firebaseConfig;
