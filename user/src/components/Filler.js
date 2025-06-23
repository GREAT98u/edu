import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../styles/FillerSection.css";

const Filler = () => {
  return (
    <div className="filler-container py-5 bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="mb-3">Enhance Your Learning Experience</h2>
            <p className="text-muted">
              Unlock a world of knowledge with AI-powered learning. Explore new subjects, connect with teachers,
              and gain access to valuable resources tailored for you.
            </p>
            <Link to="/get_trend">
              <Button variant="primary" size="lg">Get Updated</Button>
            </Link>
          </Col>
          <Col md={6}>
            <Image
              src="https://kidaha.com/wp-content/uploads/2017/09/m212-1.jpg"
              alt="Learning"
              fluid
              rounded
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Filler;

