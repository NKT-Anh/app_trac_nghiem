import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATcjfhkcDh0kCZ4VVpLFQK4Zgqz7uJDLU",
  authDomain: "trac-nghiem-tin-hoc.firebaseapp.com",
  projectId: "trac-nghiem-tin-hoc",
  storageBucket: "trac-nghiem-tin-hoc.appspot.com",
  messagingSenderId: "602736953722",
  appId: "1:602736953722:web:320ebf445bef09790eeec3",
  measurementId: "G-Z243SMHJQJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };