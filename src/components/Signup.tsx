import React, { useState } from "react";
import "../styles/Singup.css"; // Import the updated CSS file
import matrixLogo from "../assets/matrix-logo.png";
import googleIcon from "../assets/Google_Icons-09-512.webp";
import { useGoogleLogin } from "@react-oauth/google";
import { User } from "../types/User.ts";
import { signUpWithEmail } from "../services/authService.ts"; // Assuming signupWithEmail is a service method for signup
import axios from "axios";

const Signup: React.FC = () => {
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                setIsLoading(true);
                console.log("Google login successful:", response);
                const idToken = response.access_token; // Depending on the library, might need to extract differently

                const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup/`, { idToken });
                console.log(res.data);

                // Store token if needed
                localStorage.setItem('authToken', res.data.token);
                alert("Google signup successful!");
            } catch (error) {
                console.error('Google signup failed:', error);
                setError(new Error("Google signup failed."));
            } finally {
                setIsLoading(false);
            }
        },
        onError: (error) => {
            console.log('Google signup failed:', error);
            setError(new Error("Google signup failed."));
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await signUpWithEmail(user);  // Assuming signupWithEmail is the method for handling email signup
            alert("Signup successful!");
            // Redirect or perform other actions
        } catch (error) {
            console.error("Signup error:", error);
            setError(new Error("Signup failed. Please check your credentials or try again."));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
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
            <form className="signup-form" onSubmit={handleSignup}>
                <label htmlFor="firstName" className="visually-hidden">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name:"
                    className="input-field montserrat-input"
                    value={user.firstName}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="lastName" className="visually-hidden">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name:"
                    className="input-field montserrat-input"
                    value={user.lastName}
                    onChange={handleInputChange}
                    required
                />
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
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </button>
                <button type="button" onClick={() => googleLogin()} className="custom-google-login">
                    <img src={googleIcon} alt="Google logo" className="google-icon"/>
                    Continue with Google
                </button>{error && <p className="error-message">{error?.message}</p>}
            </form>
        </div>
    );
};

export default Signup;