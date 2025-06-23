import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, CardDeck } from "react-bootstrap";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero text-center text-white d-flex align-items-center" style={{ minHeight: "100vh", backgroundColor: "#2c3e50" }}>
        <Container>
          <Row>
            <Col>
              <h1 className="display-4">AI-Powered Learning for Rural India</h1>
              <p className="lead">Learn in your language with AI-driven personalized education.</p>
              <Link to="/get_trend">
                <Button variant="primary" size="lg" className="cta-button">Get Updated!</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Features Section */}
      <section className="features pt-5 pb-5">
        <Container>
          <h2 className="text-center mb-4">Features</h2>
          <Row>
            {/* Personalized Learning */}
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <Card.Title className="text-center">Personalized Learning</Card.Title>
                  <Link to="/PersonalizedLearning">
                    <Button variant="info" block>Explore</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* AI Tutor Support */}
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <Card.Title className="text-center">AI Tutor Support</Card.Title>
                  <Link to="/chatbot">
                    <Button variant="info" block>Explore</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Get Books */}
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <Card.Title className="text-center">Get Books</Card.Title>
                  <Link to="/get_books">
                    <Button variant="info" block>Explore</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Quiz Section */}
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <Card.Title className="text-center">Quiz</Card.Title>
                  <Link to="/Quiz">
                    <Button variant="info" block>Explore</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Teacher Support */}
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <Card.Title className="text-center">Teacher Support</Card.Title>
                  <Link to="/teach">
                    <Button variant="info" block>Explore</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
