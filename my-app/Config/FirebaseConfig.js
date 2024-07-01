import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1XOn5GX9m4qdqpDIi1GJkHGPNqGbBtqA",
  authDomain: "codinghub-bee51.firebaseapp.com",
  projectId: "codinghub-bee51",
  storageBucket: "codinghub-bee51.appspot.com",
  messagingSenderId: "403726960938",
  appId: "1:403726960938:web:c3bb0979c95d98da443653",
  measurementId: "G-QQ443GVG6B"
};


//connect firebase app to our application
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app; 