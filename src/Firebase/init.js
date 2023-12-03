// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOOX-cVIdgqpdUrQspm7_y1vVPkgjj9mY",
  authDomain: "socialthreads-71fbe.firebaseapp.com",
  projectId: "socialthreads-71fbe",
  storageBucket: "socialthreads-71fbe.appspot.com",
  messagingSenderId: "273635693910",
  appId: "1:273635693910:web:c81bf5511b2020329672f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
