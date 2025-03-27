import React from "react";
import "./../styles/FillerSection.css";
import {Link} from 'react-router-dom';

const Filler = () => {
  return (
    <div className="filler-container">
      <div className="filler-content">
        <h2>🌟 Enhance Your Learning Experience</h2>
        <p>
          Unlock a world of knowledge with AI-powered learning. Explore new subjects, connect with teachers, 
          and gain access to valuable resources tailored for you.
        </p>
        <Link to="/get_trend" className="cta-button"><button className="explore-button">Get Updated</button></Link>
      </div>
      <div className="filler-image">
        <img src="https://kidaha.com/wp-content/uploads/2017/09/m212-1.jpg" alt="Learning" />
      </div>
    </div>
  );
};

export default Filler;
