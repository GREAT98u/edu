import React, { useState } from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";

const SearchForm = ({ onSubmit, loading }) => {
  const [inputs, setInputs] = useState({
    classLevel: "",
    language: "",
    subject: "",
    topic: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      subject: inputs.subject,
      topic: inputs.topic,
      language: inputs.language,
      class: parseInt(inputs.classLevel),
    });
  };

  return (
    <Container className="d-flex justify-content-center mt-4 mb-4">
      <Card style={{ width: "100%", maxWidth: "1100px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
        <Card.Body>
          <h3 className="mb-4 text-center">🔍 Get Personalized Learning Recommendations</h3>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={3} sm={6}>
                <Form.Group>
                  <Form.Label>Class Level</Form.Label>
                  <Form.Control
                    type="number"
                    name="classLevel"
                    value={inputs.classLevel}
                    onChange={handleChange}
                    placeholder="e.g. 10"
                    min="6"
                    max="12"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={3} sm={6}>
                <Form.Group>
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    name="language"
                    value={inputs.language}
                    onChange={handleChange}
                    placeholder="e.g. English"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={3} sm={6}>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Select name="subject" value={inputs.subject} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3} sm={6}>
                <Form.Group>
                  <Form.Label>Topic</Form.Label>
                  <Form.Control
                    type="text"
                    name="topic"
                    value={inputs.topic}
                    onChange={handleChange}
                    placeholder="e.g. Algebra"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" variant="primary" size="lg" disabled={loading} style={{ padding: "0.6rem 2rem", fontWeight: "500" }}>
                {loading ? "Searching..." : "Get Recommendations"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SearchForm;
