// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; // Import Firestore

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD9fjLlcGkeNzgf2i8wSos-XMMcARzpYIA",
//   authDomain: "employees-app-96cb1.firebaseapp.com",
//   projectId: "employees-app-96cb1",
//   storageBucket: "employees-app-96cb1.appspot.com", // Corrected for Firestore
//   messagingSenderId: "536966624749",
//   appId: "1:536966624749:web:0018cfeb363f81084563e4",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// export { db }; // Export Firestore instance for use in your app


// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9fjLlcGkeNzgf2i8wSos-XMMcARzpYIA",
  authDomain: "employees-app-96cb1.firebaseapp.com",
  projectId: "employees-app-96cb1",
  storageBucket: "employees-app-96cb1.appspot.com",
  messagingSenderId: "536966624749",
  appId: "1:536966624749:web:0018cfeb363f81084563e4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
