import { useState } from "react";
import "../styles/accordion.css";

export default function Accordion({ accordionContent, showDescription = true, showRole = false}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const cards = accordionContent;

  const handleCardClick = (index) => {
    // Only handle click if description is enabled
    if (showDescription) {
      setActiveIndex((prevIndex) => (prevIndex === index ? null : index)); // toggle
    }
  };

  return (
    <div className="acc-container">
      {showDescription && (
        <p className="details">Click on the subteam card to know more</p>
      )}
      <div className="accordion">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${showDescription && activeIndex === index ? "active" : ""} ${showRole ? "square-card" : ""}`}
            onClick={() => handleCardClick(index)}
            style={{ 
              cursor: showDescription ? 'pointer' : 'default',
              ...(showRole && {})
            }}
          >
            <img src={card.img} alt={card.name} className="background" />
            <div className="accordion-content">
              <h3 className="title">{card.name}</h3>
              {showRole && card.role && (
                <p className="card-role">{card.role}</p>
              )}
            </div>
            <div className="backdrop"></div>
          </div>
        ))}
      </div>

      {showDescription && (
        <div className={`accordion-description ${activeIndex !== null ? "open" : ""}`}>
          <h3 className="title">{activeIndex !== null ? (cards[activeIndex].title || cards[activeIndex].name) : ""}</h3>
          <p>{activeIndex !== null ? cards[activeIndex].desc : ""}</p>
        </div>
      )}
    </div>
  );
}