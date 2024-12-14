// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBqIxvl2FPZKmfgHcdr7IH1rDAP4X1JTTY',
  authDomain: 'jamsync-1.firebaseapp.com',
  projectId: 'jamsync-1',
  storageBucket: 'jamsync-1.firebasestorage.app',
  messagingSenderId: '535667279717',
  appId: '1:535667279717:web:df334eca84aa9c4bb9038c',
  measurementId: 'G-9NKHFLNPWV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
// console.log('🚀 ~ file: firebaseConfig.js:24 ~ db:', db);

export {storage, db };

// import { initializeApp} from 'firebase/app';
// import { getStorage } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBG5rHGQ55DT3eLx1RCF4xaFVx0iaTscbY',
//   authDomain: 'jamsync-b8449.firebaseapp.com',
//   projectId: 'jamsync-b8449',
//   storageBucket: 'jamsync-b8449.firebasestorage.app',
//   messagingSenderId: '1051300914969',
//   appId: '1:1051300914969:web:861a02350292b60ca70788',
//   databaseId: 'jamsync-b8449'
// };

// // Initialize Firebase

// const app = initializeApp(firebaseConfig);

// const storage = getStorage(app);
// const db = getFirestore(app);

// console.log('🚀 ~ file: firebaseConfig.js:24 ~ db:', db);

// export { storage, db };
