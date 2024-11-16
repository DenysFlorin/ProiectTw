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

        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('accessToken', res.data.accessToken);
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
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('accessToken', res.data.accessToken);
        return userCredential.user;
    }
    catch (error) {
        console.log("Signup failed:", error);
        throw error;
    }
};

export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error("No refresh token found");

        const res = await axios.post(`${API_URL}/token/refresh`, { refresh: refreshToken });

        localStorage.setItem('accessToken', res.data.accessToken);
        return res.data.accessToken;
    }
    catch (error) {
        console.log("Refresh token failed:", error);
        throw error;
    }
};

