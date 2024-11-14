import React from 'react';
import '../styles/mainMenu.css';

const QuestionForm: React.FC = () => {
    return (
        <div className="question-container">
            <header className="header">
                <h1 className="title">AlgebrAI</h1>
                <div className="divider"></div>
            </header>
            <div className="question-input">
                <input
                    type="text"
                    placeholder="Type your question here..."
                    className="input-field"
                />
            </div>
        </div>
    );
};

export default QuestionForm;
