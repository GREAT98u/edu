import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import LandingPage from "./LandingPage"; // keep if it's needed

const GetBook = () => {
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    setError("");
    setBooks([]);

    if (!subject.trim() || !className.trim() || isNaN(className)) {
      setError("Please enter a valid subject and numeric class.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/get_books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, class: parseInt(className) }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setBooks(data.books);
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow rounded-4">
            <h2 className="text-center mb-4 text-primary">Find Books</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Subject (e.g., Mathematics)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter Class (e.g., 10)"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" onClick={fetchBooks}>
                  Search
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        {books.length > 0 ? (
          books.map((book, index) => (
            <Col key={index} md={6} lg={4} className="mb-3">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="text-truncate">{book.title}</Card.Title>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary btn-sm mt-2"
                  >
                    View Book
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={8} className="text-center text-muted mt-3">
            <p>No books found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default GetBook;
