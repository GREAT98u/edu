import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import {Link} from 'react-router-dom'
import "./../styles/Sidebar.css"; // Add custom styles here

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <div className="sidebar-toggle-button">
        <Button variant="outline-dark" onClick={handleToggle}>
          <ThreeDotsVertical size={24} />
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleToggle} placement="end" className="animated-sidebar">
        
          <Offcanvas.Title>Menu</Offcanvas.Title>
        
        <Offcanvas.Body>
          <ul className="list-unstyled sidebar-menu">
            <li><Link to="/PersonalizedLearning">🎓 Personalized Learning</Link></li>
            <li><Link to="/chatbot">🤖 AI Tutor</Link></li>
            <li><Link to="/get_books">📚 Get Books</Link></li>
            <li><Link to="/Quiz">🧠 Quiz</Link></li>
            <li><Link to="/teach">👨‍🏫 Teacher Support</Link></li>
            <li><Link to="/get_trend">📡 Get Trend</Link></li>
            <li><Link to="/History">📡History</Link></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
