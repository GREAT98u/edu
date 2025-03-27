import React, { useState } from "react";
import "./../styles/GetBook.css";
import LandingPage from "./LandingPage";

const GetBook = () => {
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    setError(""); // Clear previous errors
    setBooks([]); // Clear previous book results

    if (!subject.trim() || !className.trim() || isNaN(className)) {
      setError("Please enter a valid subject and numeric class.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/get_books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  return (<div> <LandingPage/>
    <div className="get-book-container">
     
      <h2>Find Books</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Subject (e.g., Mathematics)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Class (e.g., 10)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button onClick={fetchBooks}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="books-list">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="book-card">
              <a href={book.url} target="_blank" rel="noopener noreferrer">
                {book.title}
              </a>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default GetBook;
