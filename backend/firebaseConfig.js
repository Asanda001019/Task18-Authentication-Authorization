// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD9fjLlcGkeNzgf2i8wSos-XMMcARzpYIA",
//   authDomain: "employees-app-96cb1.firebaseapp.com",
//   projectId: "employees-app-96cb1",
//   storageBucket: "employees-app-96cb1.firebasestorage.app",
//   messagingSenderId: "536966624749",
//   appId: "1:536966624749:web:0018cfeb363f81084563e4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// firebaseConfig.js
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "employees-app-96cb1.appspot.com", // Corrected line
// });

// const db = admin.firestore();
// const bucket = admin.storage().bucket();
// module.exports = { admin, db, bucket };




const admin = require("firebase-admin");
const path = require("path");

let serviceAccount;

if (process.env.NODE_ENV === 'production') {
  // In production (Render), use the path to the uploaded secure file
  serviceAccount = path.join(__dirname, "serviceAccountKey.json"); 
} else {
  // In local development, use the file directly
  serviceAccount = require("./serviceAccountKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "employees-app-96cb1.appspot.com", // Your storage bucket name
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };

