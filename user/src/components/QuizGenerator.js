import React, { useState } from "react";
import QuizComponent from "./QuizComponent";
import "./../styles/QuizGenerator.css";
import LandingPage from "./LandingPage";

const QuizGenerator = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    level: "easy",
    class_num: 7,
    topic: "maths",
    language: "english",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  // Send request to Flask backend
  const generateQuiz = () => {
    setLoading(true);
    setError("");

    fetch("http://127.0.0.1:5000/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data); // Store quiz data within the same component
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to generate quiz. Try again.");
        setLoading(false);
      });
  };

  return (<div><LandingPage/>
    <div className="quiz-container">
      
      {!quiz ? (
        <>
          <h2>📚 Generate a Quiz</h2>

          <div className="form-group">
            <label>Difficulty Level:</label>
            <select name="level" value={formData.level} onChange={handleChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Class Number:</label>
            <input
              type="number"
              name="class_num"
              value={formData.class_num}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Topic:</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Language:</label>
            <select name="language" value={formData.language} onChange={handleChange}>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
          </div>

          <button onClick={generateQuiz} disabled={loading}>
            {loading ? "Generating..." : "Generate Quiz"}
          </button>

          {error && <p className="error">{error}</p>}
        </>
      ) : (
        <QuizComponent quizData={quiz} /> // Directly render QuizComponent after generation
      )}
    </div></div>
  );
};

export default QuizGenerator;

