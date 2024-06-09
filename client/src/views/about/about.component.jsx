import React from 'react';
import { useHistory } from 'react-router-dom';
import './about.styles.css';

const About = () => {
  const history = useHistory();

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const handleHomeButtonClick = () => {
    history.push('/home');
  };

  return (
    <div className="profile-page">
      <div className="profile-info">
        <img src="https://i.imgur.com/MrqgIhE.png" alt="Profile" className="profile-picture" />
        <h1 className="profile-name">Sir Black Sheep</h1>
        <p className="profile-description">
          Sir Black Sheep, the creator of this project, embodies resilience, resourcefulness, and proactivity. With an unwavering readiness to learn and a relentless pursuit of improvement, he consistently demonstrates a professional commitment to excellence. His ability to adapt and overcome challenges, coupled with his innovative approach and proactive mindset, positions him as a dynamic and dedicated professional in his field. Sir Black Sheep's work is a testament to his continuous efforts to enhance his skills and deliver high-quality results.
        </p>
        <div className="profile-links">
          <a href="https://github.com/beta-cancri?tab=repositories" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="http://www.linkedin.com/in/diego-alonso-chinchay-hernandez-aa0584249" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="button-group">
        <button className="button button-home" onClick={handleHomeButtonClick}></button>
        <button className="button button-back" onClick={handleBackButtonClick}></button>
      </div>
    </div>
  );
};

export default About;
