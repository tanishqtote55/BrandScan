import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QuizInstructions.css';

const QuizInstructions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode } = location.state || {}; 

  const instructions = {
    beginner: [
      "Welcome to the Beginner Mode!",
      "1. You will see a logo on the screen. Your task is to guess the company it represents.",
      "2. Four answer options will be provided for each logo. Select the option you believe is correct.",
      "3. You have 5 minutes to answer as many questions as possible.",
      "4. Each correct answer earns you 1 point. There are no penalties for incorrect answers.",
      "Click the START button when you're ready to begin."
    ],
    advanced: [
      "Welcome to the Advanced Mode!",
      "1. A logo will be displayed on the screen. Enter the name of the company or brand associated with the logo in the provided text box.",
      "2. To assist you, a dropdown with autocomplete suggestions will appear as you type.",
      "3. You have 5 minutes to answer as many questions as possible.",
      "4. Each correct answer earns you 1 point. There are no penalties for incorrect answers.",
      "Click the START button when you're ready to begin."
    ]
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${mode}`); 
  };

  return (
    <div className="instructions-container">
      <h2>{mode === "beginner" ? "Beginner Mode Instructions" : "Advanced Mode Instructions"}</h2>
      <ul>
        {instructions[mode]?.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
      <button onClick={handleStartQuiz} className="start-button">START</button>
    </div>
  );
};

export default QuizInstructions;
