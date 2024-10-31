import React, { useState, useEffect } from "react";
import { logos } from "../../assets/logoData"; // Assuming your dataset is in logoData
import { dummyScores } from '../../assets/DummyData'; // Import dummyScores
import Scoreboard from './Scoreboard'; // Import Scoreboard component
import "./AdvancedModeQuiz.css";

function App() {
    const [logoList, setLogoList] = useState([...logos]); // Copy of the logos to ensure no repeats
    const [currentLogo, setCurrentLogo] = useState({});
    const [guess, setGuess] = useState("");
    const [options, setOptions] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 1 minute in seconds
    const [timeUsed, setTimeUsed] = useState(0); // Time spent
    const [score, setScore] = useState(0);
    const [questionsAttempted, setQuestionsAttempted] = useState(0); // Track total attempts
    const [quizOver, setQuizOver] = useState(false);

    useEffect(() => {
        getNextLogo();
    }, []);

    useEffect(() => {
        if (!quizOver && timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                setTimeUsed(timeUsed + 1); // Track time used
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            handleQuizSubmit(); // Automatically submit quiz when time runs out
        }
    }, [timeLeft, timeUsed, quizOver]);

    const getNextLogo = () => {
        if (logoList.length === 0) {
            handleQuizSubmit(); // Submit if no logos left
            return;
        }
        const randomIndex = Math.floor(Math.random() * logoList.length);
        const selectedLogo = logoList[randomIndex];
        const newLogoList = logoList.filter((_, index) => index !== randomIndex);
        setLogoList(newLogoList);
        setCurrentLogo(selectedLogo);
        setGuess("");
        setIsCorrect(null); // Reset correct/wrong state for the new question
        setIsSubmitted(false); // Reset submission state for the next question
    };

    const handleSearch = (e) => {
        if (!isSubmitted) {
            const value = e.target.value;
            setGuess(value);
            if (value.length > 0) {
                const filteredOptions = logos.filter((logo) =>
                    logo.name.toLowerCase().startsWith(value.toLowerCase())
                );
                setOptions(filteredOptions);
            } else {
                setOptions([]);
            }
        }
    };

    const handleSubmit = () => {
        setQuestionsAttempted(questionsAttempted + 1);

        if (guess.toLowerCase() === currentLogo.name.toLowerCase()) {
            setIsCorrect(true);
            setScore(score + 1);
            setIsSubmitted(true);
            getNextLogo(); // Move to the next logo
        } else {
            setIsCorrect(false);
            setIsSubmitted(true);
            setTimeout(() => {
                getNextLogo();
            }, 500);
        }
    };

    const handleOptionClick = (option) => {
        if (!isSubmitted) {
            setGuess(option.name);
            setOptions([]);
        }
    };

    const handleQuizSubmit = () => {
        setQuizOver(true);
    };

    if (quizOver) {
        return (
            <div className="Score">
                <Scoreboard score={score} totalQuestions={questionsAttempted} dummyScores={dummyScores} />
            </div>
        );
    }

    return (
        <div className="App">
            <div className="timer">
                Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}{timeLeft % 60}
            </div>
            <div className="logo-container">
                <img src={currentLogo.logo} alt="Company Logo" className="logo-image" />
            </div>
            <div className={`search-container ${isCorrect === false ? "error" : ""}`}>
                <input
                    type="text"
                    value={guess}
                    onChange={handleSearch}
                    placeholder="Guess the company..."
                    className="search-bar"
                />
                <div className="dropdown">
                    {options.map((option) => (
                        <div key={option.name} onClick={() => handleOptionClick(option)}>
                            {option.name}
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmit} className="next-button" disabled={isSubmitted}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;
