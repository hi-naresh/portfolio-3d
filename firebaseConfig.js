// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbyrtFIYFTfdKzSscLJgZxnIbs4lfgHXc",
  authDomain: "portfolio-c083b.firebaseapp.com",
  projectId: "portfolio-c083b",
  storageBucket: "portfolio-c083b.firebasestorage.app",
  messagingSenderId: "223135494193",
  appId: "1:223135494193:web:4c55b2e764f526eb8e2510",
  measurementId: "G-W7E4PSGBES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db,auth };