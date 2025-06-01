import React, { useState } from 'react';
import oldBoard from '../jsons/oldBoard.json';
import Accordion from './Accordion';
import '../styles/carousel2.css';

export const OldBoardCarousel = () => {
  // Get all the years from the oldBoard object
  const years = Object.keys(oldBoard);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentYear = years[currentIndex];
  const currentBoardData = oldBoard[currentYear];

  return (
    <div className="carousel2-container">
      <div className="carousel2-wrapper">
        <div className="carousel2-content">
          <div className="year-indicator">
            <h3 className="current-year">{currentYear}</h3>
          </div>     
          <div className="accordion2-wrapper">
            <Accordion 
              accordionContent={currentBoardData} 
              showRole={true} 
              showDescription={false}
              cardSize="180px"
            />
          </div>
        </div>
      </div>
      <div className="year-navigation">
        {years.map((year, index) => (
          <button
            key={year}
            className={`year-button ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};