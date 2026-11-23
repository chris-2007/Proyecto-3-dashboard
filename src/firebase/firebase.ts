import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQx5fRo6e8ug1pV3Xa4LAYqbTMht30AkE",
  authDomain: "proyecto3-dasboard.firebaseapp.com",
  databaseURL: "https://proyecto3-dasboard-default-rtdb.firebaseio.com",
  projectId: "proyecto3-dasboard",
  storageBucket: "proyecto3-dasboard.firebasestorage.app",
  messagingSenderId: "1001076045450",
  appId: "1:1001076045450:web:1fc8244201b964d16d1f73",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);