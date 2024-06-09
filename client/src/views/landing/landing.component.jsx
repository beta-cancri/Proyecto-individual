import React from 'react';
import './landing.styles.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-container">
      <Link to="/home" className="enter-button"></Link>
    </div>
  );
}

export default Landing;
