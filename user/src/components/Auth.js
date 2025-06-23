import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Auth = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country: "",
    state: "",
    role: "",
    language: "",
    class_name: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    alert(data.message);
    console.log(data);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow-lg rounded-4">
            <h3 className="text-center text-primary mb-4">User Sign-Up</h3>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Country"
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="State"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Select name="role" onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select name="language" onChange={handleChange} required>
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                  </Form.Select>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Select name="class_name" onChange={handleChange} required>
                  <option value="">Select Class</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </Form.Select>
              </Form.Group>

              <div className="d-grid">
                <Link to="/first">
                  <Button variant="primary" type="submit">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
