// TreeNavigation.js
import React from "react";
import "./../styles/TreeNavigation.css"; // Custom styling here
import { useNavigate } from "react-router-dom";

const TreeNavigation = () => {
  const navigate = useNavigate();

  const features = [
    { label: "Books", path: "/get-book" },
    { label: "AI Tutor", path: "/ai-tutor" },
    { label: "Quizzes", path: "/quiz" },
    { label: "Progress", path: "/progress" },
    { label: "Ask Doubts", path: "/doubts" },
  ];

  return (
    <div className="tree-container">
      <div className="tree-trunk">
        <div className="tree-branches">
          {features.map((feature, index) => (
            <div
              key={index}
              className="tree-leaf"
              onClick={() => navigate(feature.path)}
            >
              {feature.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreeNavigation;
