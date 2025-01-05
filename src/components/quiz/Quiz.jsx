import { useState, useEffect, useRef } from "react";
import { logos } from "../../assets/logoData";
import "./Quiz.css";
import BrandScan from "../share/UI";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import correctAnswerSound from "../../assets/sounds/correctbuttonclick.wav";
import buttonClickSound from "../../assets/sounds/anybuttonclick.wav";
import finalScoreSound from "../../assets/sounds/score_display.wav";
import backgroundMusic from "../../assets/sounds/bgm.wav";
import errorSound from "../../assets/sounds/errorSound.wav";

function App() {
  const [logoList, setLogoList] = useState([...logos]);
  const [currentLogo, setCurrentLogo] = useState({});
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [questionsAttempted, setQuestionsAttempted] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  const bgmRef = useRef(new Audio(backgroundMusic));
  bgmRef.current.preload = "auto";

  const playSound = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  useEffect(() => {
    const bgm = bgmRef.current;
    bgm.loop = true;
    bgm.volume = 0.5;
    bgm.play().catch((error) => console.error(error));
    return () => bgm.pause();
  }, []);

  useEffect(() => {
    getNextLogo();
  }, []);

  useEffect(() => {
    if (!quizOver && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
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
  };

  const generateOptions = (correctName) => {
    const incorrectOptions = logos
      .filter((logo) => logo.name !== correctName)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((logo) => logo.name);

    const allOptions = [correctName, ...incorrectOptions];
    return allOptions.sort(() => 0.5 - Math.random());
  };

  const handleOptionClick = (option) => {
    if (selectedOption) return;

    setSelectedOption(option);
    const correct = option === currentLogo.name;
    setIsCorrect(correct);
    setQuestionsAttempted((prev) => prev + 1);

    if (correct) {
      setScore((prev) => prev + 1);
      playSound(correctAnswerSound);
    } else {
      playSound(errorSound);
    }

    setTimeout(() => {
      getNextLogo();
    }, 1000);
  };

  const handleQuizSubmit = () => {
    setQuizOver(true);
    playSound(finalScoreSound);
    const bgm = bgmRef.current;
    bgm.pause();
  };

  if (quizOver) {
    return (
      <div className="Score">
        <BrandScan
          attemptedQs={questionsAttempted}
          correctAns={score}
          accuracy={(score / questionsAttempted) * 100}
          mode={"Beginner"}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="score-display">
        {score} / {questionsAttempted}
      </div>
      <div className="timer">
        <CircularProgressbar
          value={(timeLeft / 60) * 100}
          text={`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${timeLeft % 60}`}
          styles={buildStyles({
            textColor: "black",
            pathColor: timeLeft > 10 ? "green" : "red",
            trailColor: "#d6d6d6",
          })}
        />
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
              selectedOption === option
                ? isCorrect
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={!!selectedOption}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
