import React from 'react';
import '../styles/Login.css'; // Import the updated CSS file
import matrixLogo from '../assets/matrix-logo.png'; // Adjust the path to where your image is stored

const Login: React.FC = () => {
    return (
        <div className="login-container">
            <div className="logo-container">
                <h1 className="montserrat-title">AlgebrAI</h1>
                <div className="matrix-logo">
                    <img src={matrixLogo} alt="Matrix logo" className="matrix-image" />
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
            </form>
        </div>
    );
};

export default Login;
