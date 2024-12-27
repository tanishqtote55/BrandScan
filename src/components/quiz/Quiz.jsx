import React, { useState, useEffect } from "react";
import { logos } from "../../assets/logoData";
import { dummyScores } from '../../assets/DummyData';
import Scoreboard from './Scoreboard';
import "./Quiz.css";
import BrandScan from "../share/UI";

function App() {
    const [logoList, setLogoList] = useState([...logos]);
    const [currentLogo, setCurrentLogo] = useState({});
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [score, setScore] = useState(0);
    const [questionsAttempted, setQuestionsAttempted] = useState(0);
    const [quizOver, setQuizOver] = useState(false);

    useEffect(() => {
        getNextLogo();
    }, []);

    useEffect(() => {
        if (!quizOver && timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            handleQuizSubmit();
        }
    }, [timeLeft, quizOver]);

    const getNextLogo = () => {
        if (logoList.length === 0) {
            handleQuizSubmit();
            return;
        }
        const randomIndex = Math.floor(Math.random() * logoList.length);
        const selectedLogo = logoList[randomIndex];
        const newLogoList = logoList.filter((_, index) => index !== randomIndex);
        setLogoList(newLogoList);
        setCurrentLogo(selectedLogo);
        setOptions(generateOptions(selectedLogo.name));
        setSelectedOption(null);
        setIsCorrect(null);
        setIsSubmitted(false);
    };

    const generateOptions = (correctName) => {
        const incorrectOptions = logos
            .filter((logo) => logo.name !== correctName)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(logo => logo.name);

        const allOptions = [correctName, ...incorrectOptions];
        return allOptions.sort(() => 0.5 - Math.random());
    };

    const handleSubmit = () => {
        setQuestionsAttempted(questionsAttempted + 1);
        setIsSubmitted(true);
        if (selectedOption === currentLogo.name) {
            setScore(score + 1);
        }

        setTimeout(() => {
            getNextLogo();
        }, 500);
    };

    const handleOptionClick = (option) => {
        if (!isSubmitted) {
            setSelectedOption(option);
            setIsCorrect(option === currentLogo.name);
        }
    };

    const handleQuizSubmit = () => {
        setQuizOver(true);
    };

    if (quizOver) {
        return (
            <div className="Score">
                <BrandScan attemptedQs = { questionsAttempted } correctAns={score} accuracy={score / questionsAttempted * 100} mode={"Beginner"}/>
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
            <div className="options-container">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`option-button ${
                            selectedOption === option ? (isSubmitted ? (isCorrect ? 'correct' : 'wrong') : 'selected') : ''
                        }`}
                        disabled={isSubmitted}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="next-button"
                disabled={!selectedOption || isSubmitted}
            >
                Next
            </button>
        </div>
    );
}

export default App;
