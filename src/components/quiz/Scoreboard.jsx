import React from 'react';
import './Scoreboard.css'; // Import specific CSS for Scoreboard

const Scoreboard = ({ score, totalQuestions, dummyScores }) => {
    const finalScores = [...dummyScores, { username: "You", score }];
    const sortedScores = finalScores.sort((a, b) => b.score - a.score);
    const userRank = sortedScores.findIndex(user => user.username === "You") + 1;

    return (
        <div className="scoreboard">
            <h2>Quiz Over!</h2>
            <p>Your Score: {score} / {totalQuestions}</p>
            <p>Your Rank: {userRank}</p>

            <h3>Scoreboard:</h3>
            <ul>
                {sortedScores.map((user, i) => (
                    <li key={i} className={user.username === "You" ? "highlight" : ""}>
                        {i + 1}. {user.username}: {user.score} {user.username === "You" ? "(You)" : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scoreboard;
