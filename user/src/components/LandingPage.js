import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="hero">
        <h1>AI-Powered Learning for Rural India</h1>
        <p>Learn in your language with AI-driven personalized education.</p>
        <Link to="/get_trend" className="cta-button">Get Updated!</Link>
      </header>
      <section className="features">
        <Link to="/PersonalizedLearning" className="feature-card">🎓 Personalized Learning</Link>
        <Link to="/chatbot" className="feature-card">🤖 AI Tutor Support</Link>
        <Link to="/get_books" className="feature-card">📶Get Books</Link>
        <Link to="/Quiz" className="feature-card">📶 Quiz</Link>
        <Link to="/teach" className="feature-card">Teacher Support</Link>
      </section>
     
    </div>
  );
};

export default LandingPage;