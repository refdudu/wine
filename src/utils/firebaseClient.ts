import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAE1LcySXwk7tRAbCWBp0RZhg30Ie6NMbY",
  authDomain: "wine-f786a.firebaseapp.com",
  projectId: "wine-f786a",
  storageBucket: "wine-f786a.appspot.com",
  messagingSenderId: "773046745270",
  appId: "1:773046745270:web:89efb9243d223b54cf0e17",
};
const firebaseClient = initializeApp(firebaseConfig);
const firebaseAuthClient = getAuth(firebaseClient);
const firebaseDatabase = getDatabase(firebaseClient);
export { firebaseClient, firebaseAuthClient, firebaseDatabase };
