import React from 'react';
import './landing.styles.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to Video Games World</h1>
      <p>Discover and explore the best video games</p>
      <Link to="/home" className="enter-button">Enter</Link>
    </div>
  );
}

export default Landing;
