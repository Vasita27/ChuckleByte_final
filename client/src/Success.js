import React, { useState } from 'react';
import './Success.css';

const Carousel = ({ theme, toggleTheme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    {
      title: 'Custom Software: Streamlining Inventory',
      imageUrl: './images/Screenshot 2024-10-05 113644.png',
      info: 'Our custom software improved inventory management for a retail client, leading to a 60% increase in efficiency through real-time updates and automated reordering.',
    },
    {
      title: 'Web & Mobile: Boosting Engagement',
      imageUrl: 'https://www.shutterstock.com/image-vector/thin-line-influencer-icon-phone-600nw-1771009805.jpg',
      info: 'A fitness app we developed increased user engagement by 150%, offering personalized workouts and device integration across web and mobile platforms.',
    },
    {
      title: 'Enterprise Solutions: Automating Workflow',
      imageUrl: 'https://media.istockphoto.com/id/1324367576/vector/workflow-process-line-icon.jpg?s=612x612&w=0&k=20&c=d3oSLGkhbm_brnMPzf4jVbQmnMOpUt7mbYs_LzRQFw0=',
      info: 'Our enterprise solution helped a manufacturer improve productivity by 40%, automating operations and optimizing workflow across global locations.',
    },
    {
      title: 'Cloud & DevOps: Scaling for Growth',
      imageUrl: 'https://img.freepik.com/premium-vector/devops-icon-like-thin-line-phone-with-gear-cloud-linear-trend-modern-logotype-graphic-stroke-art-design-web-element-isolated-white-concept-data-optimization-pictogram-smartphone-develop_775815-460.jpg',
      info: 'After migrating to our cloud solution, an e-commerce startup scaled to support 500% growth, ensuring fast deployments and zero downtime.',
    },
    {
      title: 'Cybersecurity: Protecting Data',
      imageUrl: 'https://www.shutterstock.com/image-vector/cyber-security-icon-data-information-600nw-1917567236.jpg',
      info: 'Our cybersecurity services helped a financial firm secure customer data, prevent threats, and achieve full compliance with regulations.',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="success-stories-container">
      
      <div className="carousel">
        <div className="carousel-cards">
          {cards.map((card, index) => {
            let position = '';
            if (index === (currentIndex + 1) % cards.length) {
              position = 'right'; // The next card
            } else if (index === currentIndex) {
              position = 'center'; // The current card
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
              position = 'left'; // The previous card
            } else {
              position = 'hidden'; // Cards not in view
            }

            return (
              <div key={index} className={`card ${theme} ${position}`}>
                {index === currentIndex && (
                  <>
                    <button className={`carousel-button ${theme} left`} onClick={nextSlide}>
                      <div className={`left ${theme}`}>&lt;</div>
                    </button>
                    <div className="card-content">
                      <div className="card-image">
                        <img src={card.imageUrl} alt={card.title} />
                      </div>
                      <div className={`card-info ${theme}`}>
                        <h3>{card.title}</h3>
                        <p style={{padding:"10px"}} className={`content ${theme}`}>{card.info}</p>
                      </div>
                    </div>
                    <button className={`carousel-button ${theme} right`} onClick={nextSlide}>
                      <div className={`right ${theme}`}>&gt;</div>
                    </button>
                  </>
                )}
                {index !== currentIndex && (
                  <div className="card-content">
                    <div className="card-image">
                      <img src={card.imageUrl} alt={card.title} />
                    </div>
                    <div className="card-info">
                      <h3>{card.title}</h3>
                      <p>{card.info}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
