import React, { useState } from "react";
import "./../styles/Chatbot.css";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { FiSend } from "react-icons/fi"; 

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      const botMessage = {
        sender: "Bot",
        text: data.response || "Error getting response.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: "Server error." },
      ]);
    }
    setInput("");
  };

  return (
    <Container className="py-5" style={{ minHeight: "90vh" }}>
      <Card className="p-4 shadow-lg border-0 rounded-4 bg-light">
        <h3 className="text-center mb-4 text-primary">💬Tutor</h3>

        <div
          className="chatbox mb-3 p-3 rounded"
          style={{
            height: "400px",
            overflowY: "auto",
            background: "#f8f9fa",
            border: "1px solid #dee2e6",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 d-flex ${
                msg.sender === "You" ? "justify-content-end" : "justify-content-start"
              }`}
            >
              <div
                className={`p-3 rounded shadow-sm ${
                  msg.sender === "You"
                    ? "bg-primary text-white"
                    : "bg-secondary text-white"
                }`}
                style={{
                  maxWidth: "75%",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                <strong>{msg.sender}:</strong> <br />
                {msg.text}
              </div>
            </div>
          ))}
        </div>

<InputGroup>
  <Form.Control
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type your message..."
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  />
  <InputGroup.Text
    onClick={sendMessage}
    style={{ cursor: "pointer", backgroundColor: "#0d6efd", color: "white" }}
  >
    <FiSend size={18} />
  </InputGroup.Text>
</InputGroup>

      </Card>
    </Container>
  );
};

export default Chatbot;
