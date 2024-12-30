import React, { useState, useEffect, useRef } from "react";
import { logos } from "../../assets/logoData"; // Assuming your dataset is in logoData
import { dummyScores } from '../../assets/DummyData'; // Import dummyScores
import Scoreboard from './Scoreboard'; // Import Scoreboard component
import "./AdvancedModeQuiz.css";
import BrandScan from "../share/UI";

// Importing sounds
import correctAnswerSound from "../../assets/sounds/correctbuttonclick.wav";
import buttonClickSound from "../../assets/sounds/anybuttonclick.wav";
import finalScoreSound from "../../assets/sounds/score_display.wav";
import backgroundMusic from "../../assets/sounds/bgm.wav";
import errorSound from "../../assets/sounds/errorSound.wav";

function App() {
    const [logoList, setLogoList] = useState([...logos]); // Copy of the logos to ensure no repeats
    const [currentLogo, setCurrentLogo] = useState({});
    const [guess, setGuess] = useState("");
    const [options, setOptions] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [timeUsed, setTimeUsed] = useState(0); // Time spent
    const [score, setScore] = useState(0);
    const [questionsAttempted, setQuestionsAttempted] = useState(0); // Track total attempts
    const [quizOver, setQuizOver] = useState(false);

    const bgmRef = useRef(null);

    const playSound = (audioFile) => {
        const audio = new Audio(audioFile);
        audio.play();
    };

    useEffect(() => {
        bgmRef.current = new Audio(backgroundMusic);
        bgmRef.current.loop = true;
        bgmRef.current.volume = 0.5;
        bgmRef.current.play();

        return () => {
            if (bgmRef.current) {
                bgmRef.current.pause();
                bgmRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        getNextLogo();
    }, []);

    useEffect(() => {
        if (!quizOver && timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                setTimeUsed(timeUsed + 1); 
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            handleQuizSubmit();
        }
    }, [timeLeft, timeUsed, quizOver]);

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
        setGuess("");
        setIsCorrect(null); 
        setIsSubmitted(false);
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
        playSound(buttonClickSound);

        if (guess.toLowerCase() === currentLogo.name.toLowerCase()) {
            setIsCorrect(true);
            setScore(score + 1);
            playSound(correctAnswerSound);
            setIsSubmitted(true);
            getNextLogo(); 
        } else {
            setIsCorrect(false);
            playSound(errorSound);
            setIsSubmitted(true);
            setTimeout(() => {
                getNextLogo();
            }, 500);
        }
    };

    const handleOptionClick = (option) => {
        if (!isSubmitted) {
            playSound(buttonClickSound);
            setGuess(option.name);
            setOptions([]);
        }
    };

    const handleQuizSubmit = () => {
        setQuizOver(true);
        playSound(finalScoreSound);
        if (bgmRef.current) bgmRef.current.pause(); 
    };

    if (quizOver) {
        return (
            <div className="Score">
                <BrandScan correctAns={score} accuracy={(score / questionsAttempted) * 100} mode={"Advanced"} />
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
