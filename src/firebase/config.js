const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: 'cherish-v2.firebaseapp.com',
  databaseURL: 'https://cherish-v2.firebaseio.com',
  projectId: 'cherish-v2',
  storageBucket: 'cherish-v2.appspot.com',
  messagingSenderId: process.env.REACT_API_MESSAGE_SENDER_ID,
  appId: process.env.REACT_API_APP_ID,
};

export default firebaseConfig;

// class Firebase {
//   constructor() {
//     this.auth = app.auth();
//     this.firestore = app.firestore();
//   }

//   async register({ firstName, email, password }) {
//     const newUser = await this.auth.createUserWithEmailAndPassword(
//       email,
//       password,
//     );
//     return newUser.user.updateProfile({
//       displayName: firstName,
//     });
//   }

//   async login({ email, password }) {
//     return this.auth.signInWithEmailAndPassword(email, password);
//   }

//   async getpeople({})
// }
