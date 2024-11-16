import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import '../styles/mainMenu.css';

const QuestionForm: React.FC = () => {
    const [question, setQuestion] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('User question:', question);
    };

    return (
        <div className="question-container">
            <header className="header">
                <h1 className="title">AlgebrAI</h1>
            </header>
            <div className="divider"></div>
            <div className="main-content">
                <div className="question-input">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type your question here..."
                            className="input-field"
                            value={question}
                            onChange={handleInputChange}
                        />
                    </form>
                </div>

                <div className="conversation-cards">
                    <div className="card">
                        <h3 className="card-title">Ordinary Differential Equations</h3>
                        <p className="card-description">
                            Ordinary Differential Equations (ODEs) involve functions of a single variable and their
                            derivatives. ODEs can be linear or nonlinear and are categorized by their order.
                        </p>
                        <div className="math-example">
                            <BlockMath math={'\\frac{d^2y}{dx^2} + p(x) \\frac{dy}{dx} + q(x) y = 0'}/>
                        </div>
                    </div>
                    <div className="card">
                        <h3 className="card-title">Partial Differential Equations</h3>
                        <p className="card-description">
                            Partial Differential Equations (PDEs) involve functions of multiple variables and their
                            partial derivatives. Solutions often require boundary conditions and numerical techniques.
                        </p>
                        <div className="math-example">
                            <BlockMath math={'\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u'}/>
                        </div>
                    </div>
                    <div className="card">
                        <h3 className="card-title">Systems of Differential Equations</h3>
                        <p className="card-description">
                            Systems of differential equations describe the behavior of multiple functions
                            simultaneously. These often require matrix theory or numerical methods for solving.
                        </p>
                        <div className="math-example">
                            <BlockMath math={'\\frac{dx}{dt} = \\alpha x - \\beta xy'}/>
                            <BlockMath math={'\\frac{dy}{dt} = \\delta xy - \\gamma y'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;
