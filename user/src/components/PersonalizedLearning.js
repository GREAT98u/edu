import React, { useState } from "react";
import SearchForm from "./SearchForm";
import VideoRecommendations from "./VideoRecommendations";
import "./../styles/PersonalizedLearning.css";
import LandingPage from "./LandingPage";

const PersonalizedLearning = () => {
  const [videos, setVideos] = useState([]); // Store fetched videos
  const [loading, setLoading] = useState(false); // Loading state
  const [responseMessage, setResponseMessage] = useState(""); // Store response message

  // Function to fetch video recommendations from Flask backend
  const fetchVideoRecommendations = async (formData) => {
    setLoading(true);
    setVideos([]);
    setResponseMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/suggest_videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.videos && data.videos.length > 0) {
        setVideos(data.videos);
        setResponseMessage(`Found ${data.videos.length} videos!`);
      } else {
        setResponseMessage("No videos found for this topic.");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setResponseMessage("Error fetching videos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="learning-container">
      <LandingPage/>
      <h2>🎓 Personalized Learning</h2>
      <SearchForm onSubmit={fetchVideoRecommendations} loading={loading} />
      <VideoRecommendations videos={videos} loading={loading} responseMessage={responseMessage} />
    </div>
  );
};

export default PersonalizedLearning;
