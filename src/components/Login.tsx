import React from 'react';
import '../styles/Login.css'; // Import the updated CSS file
import matrixLogo from '../assets/matrix-logo.png';
import googleIcon from '../assets/Google_Icons-09-512.webp';
import { useGoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            console.log('Google login successful:', response);
            // Handle successful login response (e.g., store user info)
        },
        onError: (error) => {
            console.log('Google login failed:', error);
        },
    });

    return (
        <div className="login-container">
            <div className="logo-container">
                <h1 className="montserrat-title">AlgebrAI</h1>
                <div className="horizontal-line"></div>
                <div className="matrix-logo">
                    <img src={matrixLogo} alt="Matrix logo" className="matrix-image"/>
                </div>
            </div>
            <div className="vertical-line"></div>
            <form className="login-form">
                <label htmlFor="email" className="visually-hidden">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email:"
                    className="input-field montserrat-input"
                    required
                />
                <label htmlFor="password" className="visually-hidden">Parola</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Parola:"
                    className="input-field montserrat-input"
                    required
                />
                <button type="submit" className="submit-button montserrat-input">Login</button>

                <button onClick={() => googleLogin()} className="custom-google-login">
                    <img src={googleIcon} alt="Google logo" className="google-icon"/>
                    Continue with Google
                </button>
            </form>
        </div>
    );
};

export default Login;
