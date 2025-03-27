import React, { useState } from "react";
import "./../styles/QuizComponent.css";

const QuizComponent = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!quizData || quizData.length === 0) {
    return <p>No quiz data available.</p>;
  }

  const question = quizData[currentQuestionIndex];

  const handleOptionSelect = (optionKey) => {
    setSelectedOption(optionKey);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("🎉 Quiz Completed!");
    }
  };

  return (
    <div className="quiz-box">
      <h2>📖 Quiz</h2>
      <div className="question">
        <p>{currentQuestionIndex + 1}. {question.question}</p>
        <div className="options">
          {Object.entries(question.options).map(([key, option]) => (
            <button
              key={key}
              className={`option-btn ${showAnswer ? (key === question.correct_answer ? "correct" : "wrong") : ""}`}
              onClick={() => handleOptionSelect(key)}
              disabled={showAnswer}
            >
              {key}. {option}
            </button>
          ))}
        </div>
      </div>

      {showAnswer && (
        <div className="answer-box">
          {selectedOption === question.correct_answer ? (
            <p className="correct-text">✅ Correct Answer!</p>
          ) : (
            <p className="wrong-text">❌ Wrong! Correct Answer: {question.correct_answer}. {question.options[question.correct_answer]}</p>
          )}
          <p className="explanation">💡 Explanation: {question.explanation}</p>
          <button onClick={nextQuestion} className="next-btn">Next</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
