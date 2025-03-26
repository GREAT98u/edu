import React, { useState } from "react";
import "./../styles/Chatbot.css";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      if (data.response) {
        setMessages([...messages, userMessage, { sender: "Bot", text: data.response }]);
      } else {
        setMessages([...messages, userMessage, { sender: "Bot", text: "Error getting response." }]);
      }
    } catch (error) {
      setMessages([...messages, userMessage, { sender: "Bot", text: "Server error." }]);
    }
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <h3>AI Chatbot</h3>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "You" ? "user-message" : "bot-message"}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;