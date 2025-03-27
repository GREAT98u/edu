import React from "react";
import "./../styles/TeacherSupport.css";
import LandingPage from "./LandingPage";

const teachers = [
  {
    id: 1,
    name: "Dr. A. Sharma",
    subject: "Mathematics",
    email: "sharma.maths@example.com",
    contact: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Ms. R. Verma",
    subject: "Physics",
    email: "verma.physics@example.com",
    contact: "+91 98765 12345",
  },
  {
    id: 3,
    name: "Mr. K. Yadav",
    subject: "Chemistry",
    email: "yadav.chem@example.com",
    contact: "+91 98765 56789",
  },
  {
    id: 4,
    name: "Mrs. P. Singh",
    subject: "English",
    email: "singh.english@example.com",
    contact: "+91 98765 98765",
  },
  {
    id: 5,
    name: "Dr. M. Iyer",
    subject: "Biology",
    email: "iyer.bio@example.com",
    contact: "+91 98765 65432",
  },
  {
    id: 6,
    name: "Mr. T. Reddy",
    subject: "Computer Science",
    email: "reddy.cs@example.com",
    contact: "+91 98765 67890",
  },
  {
    id: 7,
    name: "Ms. N. Gupta",
    subject: "Economics",
    email: "gupta.economics@example.com",
    contact: "+91 98765 34567",
  },
];

const TeacherSupport = () => {
  return (<div><LandingPage/>
    <div className="teacher-container">
      <h2>📚 Teacher Support</h2>
      <p>Find expert teachers for your learning needs.</p>

      <div className="teacher-grid">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <h3>{teacher.name}</h3>
            <p><strong>Subject:</strong> {teacher.subject}</p>
            <p><strong>Email:</strong> <a href={`mailto:${teacher.email}`}>{teacher.email}</a></p>
            <p><strong>Contact:</strong> <a href={`tel:${teacher.contact}`}>{teacher.contact}</a></p>
          </div>
        ))}
      </div>
    </div></div>
  );
};

export default TeacherSupport;
