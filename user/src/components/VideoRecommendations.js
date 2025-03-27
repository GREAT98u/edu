import React from "react";

const VideoRecommendations = ({ videos, loading, responseMessage }) => {
  return (
    <div className="video-section">
      <h3>📺 Recommended Videos</h3>

      {loading ? (
        <p>Loading videos...</p>
      ) : responseMessage ? (
        <p className="response-message">{responseMessage}</p>
      ) : null}

      {videos.length > 0 && (
        <div className="video-grid">
          {videos.map((video, index) => (
            <div key={index} className="video-card">
              <div className="video-thumbnail">
                <iframe src={`https://www.youtube.com/embed/${video.video_id}`} title={video.title} frameBorder="0" allowFullScreen width="100%" height="200"></iframe>
              </div>
              <div className="video-details">
                <h4>{video.title}</h4>
                <a href={`https://www.youtube.com/watch?v=${video.video_id}`} target="_blank" rel="noopener noreferrer" className="youtube-link">
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoRecommendations;
