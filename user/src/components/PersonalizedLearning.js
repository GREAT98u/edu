import React, { useState } from "react";
import "./../styles/PersonalizedLearning.css";

const PersonalizedLearning = () => {
  const [inputs, setInputs] = useState({
    classLevel: "",
    language: "",
    subject: "",
    topic: "",
  });

  const [videos, setVideos] = useState([]); // Store fetched YouTube videos
  const [responseMessage, setResponseMessage] = useState(""); // Store response message
  const [loading, setLoading] = useState(false); // Add loading state

  // Handle input changes
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Function to fetch video recommendations from Flask backend
  const fetchVideoRecommendations = async () => {
    // Reset previous state
    setVideos([]);
    setResponseMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/suggest_videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: inputs.subject,
          topic: inputs.topic,
          language: inputs.language,
          class: parseInt(inputs.classLevel), // Convert class to integer
        }),
      });

      const data = await response.json(); // Receive JSON response

      if (data.videos && data.videos.length > 0) {
        setVideos(data.videos); // Store video recommendations
        setResponseMessage(`Found ${data.videos.length} videos!`);
      } else {
        setVideos([]);
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
      <h2>🎓 Personalized Learning</h2>

      {/* Form Inputs */}
      <div className="form-section">
        <div className="form-group">
          <label>Classlevel:</label>
          <input
            type="number"
            name="classLevel"
            value={inputs.classLevel}
            onChange={handleChange}
            placeholder="Enter class (e.g., 10)"
            min="6"
            max="12"
          />
        </div>

        <div className="form-group">
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={inputs.language}
            onChange={handleChange}
            placeholder="Enter language (e.g., English)"
          />
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <select name="subject" value={inputs.subject} onChange={handleChange}>
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select>
        </div>

        <div className="form-group">
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={inputs.topic}
            onChange={handleChange}
            placeholder="Enter topic (e.g., Algebra)"
          />
        </div>

        <button 
          className="recommend-button" 
          onClick={fetchVideoRecommendations}
          disabled={loading}
        >
          {loading ? "Searching..." : "Get Recommendations"}
        </button>
      </div>

      {/* Response Message */}
      {responseMessage && (
        <p className="response-message">{responseMessage}</p>
      )}

      {/* Video Recommendations Section */}
      <div className="video-section">
        <h3>📺 Recommended Videos</h3>
        
        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length > 0 ? (
          <div className="video-grid">
            {videos.map((video, index) => (
              <div key={index} className="video-card">
                <div className="video-thumbnail">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.video_id}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                    width="100%"
                    height="200"
                  ></iframe>
                </div>
                <div className="video-details">
                  <h4>{video.title}</h4>
                  <div className="video-links">
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.video_id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="youtube-link"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos found. Try adjusting your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default PersonalizedLearning;