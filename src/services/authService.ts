import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import axios from "axios";
import { User } from "../types/User.ts"

const API_URL = import.meta.env.VITE_API_URL;

export const loginWithEmail = async (user: User) => {
    try {
        const { email, password } = user;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);

        const idToken = await userCredential.user.getIdToken();
        const res = await axios.post(`${API_URL}/login/`, { idToken });

        console.log("Backend response: ", res.data);

        localStorage.setItem("token", res.data.accessToken);
        return userCredential.user;
    }
    catch (error) {
        console.log("Login failed:", error);
        throw error;
    }
};

export const signUpWithEmail = async (user: User) => {
    try {
        const { email, password } = user;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);

        const idToken = await userCredential.user.getIdToken();
        const res = await axios.post(`${API_URL}/login/`, { idToken });

        console.log("Backend response: ", res.data);
        localStorage.setItem("token", res.data.accessToken);
        return userCredential.user;
    }
    catch (error) {
        console.log("Login failed:", error);
        throw error;
    }
};

