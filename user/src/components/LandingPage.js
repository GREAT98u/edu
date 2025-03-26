import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/LandingPage.css";
import PersonalizedLearning from "./PersonalizedLearning"; // Import components
import Chatbot from "./Chatbot";
import GetBook from "./GetBook";


const LandingPage = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "PersonalizedLearning":
        return <PersonalizedLearning />;
      case "Chatbot":
        return <Chatbot />;
      case "GetBooks":
        return <GetBook />;
      
      default:
        return <h2 className="instruction-text">Select an option from the navbar to get started.</h2>;
    }
  };

  return (
    <div className="landing-container">
      {/* Animated Navigation Bar */}
      <nav className={`navbar ${activeComponent ? "nav-move-left" : ""}`}>
        <div className="logo">EduAI</div>
        <ul className="nav-links">
          <li><button onClick={() => setActiveComponent("PersonalizedLearning")}>🎓 Personalized Learning</button></li>
          <li><button onClick={() => setActiveComponent("Chatbot")}>🤖 AI Tutor</button></li>
          <li><button onClick={() => setActiveComponent("GetBooks")}>📚 Get Books</button></li>
          <li><button onClick={() => setActiveComponent("FindTeacher")}>🧑‍🏫 Find Teacher</button></li>
        </ul>
      </nav>

      {/* Animated Content Section */}
      <div className={`content-area ${activeComponent ? "content-show" : ""}`}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default LandingPage;
