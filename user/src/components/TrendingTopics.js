import React, { useState, useEffect } from "react";
import "./../styles/TrendingTopics.css";
import LandingPage from "./LandingPage";

const TrendingTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/trending-topics") // Backend API endpoint
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          setTopics(data.articles);
        } else {
          setError("No trending topics available.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch topics.");
        setLoading(false);
      });
  }, []);

  return (<div><LandingPage/>
    <div className="trending-container">
      
      <h2>📚 Trending Study Topics</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            <a href={topic.url} target="_blank" rel="noopener noreferrer">
              {topic.title}
            </a>
          </li>
        ))}
      </ul>
    </div></div>
  );
};

export default TrendingTopics;
