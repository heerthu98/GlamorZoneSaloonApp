// import firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDxtLQ-XjM5B-hDXKnhTQZnYbj3MNsyuHk',
//   authDomain: 'fir-auth-356f3.firebaseapp.com',
//   projectId: 'fir-auth-356f3',
//   storageBucket: 'fir-auth-356f3.appspot.com',
//   messagingSenderId: '547194862914',
//   appId: '1:547194862914:web:23cde3022fa1c3682a1cdb',
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const auth = firebase.auth();

// const db = firebase.database();

// export { auth, db };
import 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDxtLQ-XjM5B-hDXKnhTQZnYbj3MNsyuHk',
  authDomain: 'fir-auth-356f3.firebaseapp.com',
  projectId: 'fir-auth-356f3',
  storageBucket: 'fir-auth-356f3.appspot.com',
  messagingSenderId: '547194862914',
  appId: '1:547194862914:web:23cde3022fa1c3682a1cdb',
};

// Initialize Firebase
let app;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps();
}
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
