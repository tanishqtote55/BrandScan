import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';
import { data } from '../../assets/data'; 
import { dummyScores } from '../../assets/DummyData'; 
import Scoreboard from './Scoreboard'; // Importing the Scoreboard component

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [shuffledData, setShuffledData] = useState([]);
    const [question, setQuestion] = useState(null);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(300);
    const [isQuizActive, setIsQuizActive] = useState(true);  
    const [quizEnded, setQuizEnded] = useState(false); 

    const optionRefs = useRef([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        const shuffledQuestions = shuffleArray([...data]);  
        const updatedQuestions = shuffledQuestions.map(q => {
            const options = shuffleArray([q.option1, q.option2, q.option3, q.option4]);  
            const correctOption = options.find(option => option === q[`option${q.ans}`]);

            return {
                ...q,
                options: options,
                correctOption: correctOption  
            };
        });
        setShuffledData(updatedQuestions);
        setQuestion(updatedQuestions[index]);
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && isQuizActive) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            endQuiz();
        }
    }, [timeLeft, isQuizActive]);

    useEffect(() => {
        if (shuffledData.length > 0) {
            setQuestion(shuffledData[index]);
            setLock(false);
        }
    }, [index, shuffledData]);

    const checkAns = (e, selectedOption) => {
        if (!lock && isQuizActive) {
            const correctAnswer = question.correctOption; 

            if (correctAnswer === selectedOption) {
                e.target.classList.add("correct");  
                setScore(score + 1);
            } else {
                e.target.classList.add("wrong"); 
            }
            setLock(true);
        }
    };

    const next = () => {
        if (index < shuffledData.length - 1) {
            setIndex(index + 1);
            optionRefs.current.forEach(option => {
                option.classList.remove("correct", "wrong");
            });
        } else {
            endQuiz();
        }
    };

    const endQuiz = () => {
        setIsQuizActive(false);
        setQuizEnded(true);
    };

    return (
        <div className='container'>
            <h1>Brand Scan</h1>
            <hr />
            {!quizEnded ? (
                <>
                    {question && (
                        <>
                            <h2>{index + 1}. {question.question}</h2>
                            <ul>
                                {question.options.map((option, i) => (
                                    <li
                                        key={i}
                                        ref={(el) => (optionRefs.current[i] = el)}
                                        onClick={(e) => checkAns(e, option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    <button onClick={next} disabled={!isQuizActive || lock === false}>Next</button>
                    <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
                </>
            ) : (
                <Scoreboard score={score} totalQuestions={shuffledData.length} dummyScores={dummyScores} />
            )}
        </div>
    );
};

export default Quiz;
