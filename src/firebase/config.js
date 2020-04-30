const firebaseConfig = {
  apiKey: 'AIzaSyA4K4yoNB0H4DkOE0QLKJ0YyL6w-cHiiQ4',
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
