// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAYIuOcxKUsoJ5F3PM8cCq8LB0malDP3Ko",
  authDomain: "avsynctech.firebaseapp.com",
  databaseURL: "https://avsynctech-default-rtdb.firebaseio.com",
  projectId: "avsynctech",
  storageBucket: "avsynctech.appspot.com",
  messagingSenderId: "160116712806",
  appId: "1:160116712806:web:ef3d8bf4e63ccfea15d4a7",
  measurementId: "G-ER71W968RF",
};

// Initialize Firebase

export function Realtimedb(userId) {
  get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
