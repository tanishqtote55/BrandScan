import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleModeSelection = (mode) => {
    navigate('/instructions', { state: { mode } });
  };

  return (
    <div className="home-container">
      <div className="home-content"> {/* Added a wrapper for styling */}
        <h1>BrandScan: Choose a Mode</h1>
        <div className="button-group">
          <button onClick={() => handleModeSelection('beginner')} className="mode-button">
            Beginner
          </button>
          <button onClick={() => handleModeSelection('advanced')} className="mode-button">
            Advanced
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
