import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("searchHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Search History</Card.Title>

              {history.length === 0 ? (
                <p>No search history found.</p>
              ) : (
                <>
                  <ListGroup variant="flush">
                    {history.map((entry, index) => (
                      <ListGroup.Item key={index}>
                        <strong>Topic:</strong> {entry.topic || "Unknown"}
                        {entry.subject && <span> | <strong>subject:</strong> {entry.subject}</span>}
                        {entry.language && <span> | <strong>Language:</strong> {entry.language}</span>}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <div className="mt-3 text-end">
                    <Button variant="danger" onClick={clearHistory}>Clear History</Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default History;
