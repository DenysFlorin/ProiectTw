import React, { useState } from 'react';
import '../styles/Login.css'; // Import the updated CSS file
import matrixLogo from '../assets/matrix-logo.png';
import googleIcon from '../assets/Google_Icons-09-512.webp';
import { useGoogleLogin } from '@react-oauth/google';
import { User } from "../types/User.ts"
import { loginWithEmail} from "../services/authService.ts";
import axios from 'axios';

const Login: React.FC = () => {
    const [user, setUser] = useState<User>({ email: "", password: "" });
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                setIsLoading(true);
                console.log("Google login successful:", response);
                const idToken = response.access_token; // Depending on the library, might need to extract differently

                const res = await axios.post(`${import.meta.env.VITE_API_URL}/login/`, { idToken });
                console.log(res.data);

                // Store token if needed
                localStorage.setItem('authToken', res.data.token);
                alert("Google login successful!");
            } catch (error) {
                console.error('Google login failed:', error);
                setError(new Error("Google login failed."));
            } finally {
                setIsLoading(false);
            }
        },
        onError: (error) => {
            console.log('Google login failed:', error);
            setError(new Error("Google login failed."));
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await loginWithEmail(user);
            alert("Login successful!");
            // Redirect or perform other actions
        } catch (error) {
            console.error("Login error:", error);
            setError(new Error("Login failed. Please check your credentials."));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="left-container">
            <h1 className="montserrat-title">AlgebrAI</h1>
                <div className="logo-container">
                    <div className="matrix-logo">
                        <img src={matrixLogo} alt="Matrix logo" className="matrix-image"/>
                    </div>
                </div>
            </div>
            <div className="horizontal-line"></div>
            <div className="vertical-line"></div>
            <form className="login-form" onSubmit={handleLogin}>
                <label htmlFor="email" className="visually-hidden">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email:"
                    className="input-field montserrat-input"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="password" className="visually-hidden">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password:"
                    className="input-field montserrat-input"
                    value={user.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="submit-button montserrat-input" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <button type="button" onClick={() => googleLogin()} className="custom-google-login">
                    <img src={googleIcon} alt="Google logo" className="google-icon"/>
                    Continue with Google
                </button>
                {error && <p className="error-message">{error?.message}</p>}
            </form>
        </div>
    );
};

export default Login;
