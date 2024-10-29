import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdvancedModeQuiz from './components/quiz/AdvancedModeQuiz';
import BegModeQuiz from './components/quiz/Quiz';
import QuizInstructions from './components/quiz/QuizInstructions';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/instructions" element={<QuizInstructions />} />
        <Route path="/quiz/beginner" element={<BegModeQuiz />} />
        <Route path="/quiz/advanced" element={<AdvancedModeQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
