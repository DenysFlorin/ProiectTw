import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD7Kk6Uy7vkIhv1fXMfLfO78WQiadSlN-U",
    authDomain: "proiecttw-b0fca.firebaseapp.com",
    projectId: "proiecttw-b0fca",
    storageBucket: "proiecttw-b0fca.firebasestorage.app",
    messagingSenderId: "545743716135",
    appId: "1:545743716135:web:3fced9b5915b574d947302",
    measurementId: "G-PWME9NDNEJ"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);