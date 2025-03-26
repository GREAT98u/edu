import React from "react";
import "./../styles/VideoRecommendation.css";

const VideoRecommendation = () => {
  const videoIds = [
    "zVxQUhKk2lY",
    "Jg5wfXy6I08",
    "8zKuoqZLyKg",
    "LQF-CuKnqII",
    "QwN0ekIdXiM",
    "Y7WfgJZodQE",
    "pN6jk0uUrD8",
  ];

  return (
    <div className="video-recommendation">
      <h3>Recommended Videos</h3>
      <div className="video-list">
        {videoIds.map((videoId, index) => (
          <iframe
            key={index}
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Recommended Video ${index + 1}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ))}
      </div>
    </div>
  );
};

export default VideoRecommendation;
