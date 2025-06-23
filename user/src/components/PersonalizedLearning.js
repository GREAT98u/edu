import React, { useState } from "react";
import SearchForm from "./SearchForm";
import VideoRecommendations from "./VideoRecommendations";

import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import LandingPage from "./LandingPage";

const PersonalizedLearning = () => {
  const [videos, setVideos] = useState([]); // Store fetched videos
  const [loading, setLoading] = useState(false); // Loading state
  const [responseMessage, setResponseMessage] = useState(""); // Store response message


  // Function to fetch video recommendations from Flask backend
 // Inside PersonalizedLearning component

const saveSearchToHistory = (searchData) => {
  const existingHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Add new search at the beginning
  const updatedHistory = [searchData, ...existingHistory].slice(0, 20); // Keep last 20 searches
  localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
};

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

    // Save to history regardless of success
    saveSearchToHistory(formData);
    console.log(formData)

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
      <Container>
        <Row className="justify-content-center mb-4">
          <Col xs={12} sm={10} md={8} lg={12}>
            <Card className="shadow-sm p-3">
              
              <SearchForm onSubmit={fetchVideoRecommendations} loading={loading} />
            </Card>
          </Col>
        </Row>



        <Row className="justify-content-center">
          <Col xs={12} lg={20}>
            <VideoRecommendations
              videos={videos}
              loading={loading}
              responseMessage={responseMessage}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PersonalizedLearning;

