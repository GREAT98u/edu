import React from "react";
import { Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";

const VideoRecommendations = ({ videos, loading, responseMessage }) => {
  return (
    <div className="mt-4">
      <h3 className="text-center mb-4">📺 Recommended Videos</h3>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading videos...</span>
        </div>
      ) : responseMessage ? (
        <Alert variant="info" className="text-center">
          {responseMessage}
        </Alert>
      ) : null}

      {videos.length > 0 && (
        <Row>
          {videos.map((video, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.video_id}`}
                    title={video.title}
                    allowFullScreen
                  ></iframe>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6">{video.title}</Card.Title>
                  <Button
                    variant="outline-primary"
                    href={`https://www.youtube.com/watch?v=${video.video_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto"
                  >
                    Watch on YouTube
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default VideoRecommendations;
