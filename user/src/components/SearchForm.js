import React, { useState } from "react";

const SearchForm = ({ onSubmit, loading }) => {
  const [inputs, setInputs] = useState({
    classLevel: "",
    language: "",
    subject: "",
    topic: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Handle form submission
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
    <form className="form-section" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Class Level:</label>
        <input type="number" name="classLevel" value={inputs.classLevel} onChange={handleChange} placeholder="Enter class (e.g., 10)" min="6" max="12" required />
      </div>

      <div className="form-group">
        <label>Language:</label>
        <input type="text" name="language" value={inputs.language} onChange={handleChange} placeholder="Enter language (e.g., English)" required />
      </div>

      <div className="form-group">
        <label>Subject:</label>
        <select name="subject" value={inputs.subject} onChange={handleChange} required>
          <option value="">Select Subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>
      </div>

      <div className="form-group">
        <label>Topic:</label>
        <input type="text" name="topic" value={inputs.topic} onChange={handleChange} placeholder="Enter topic (e.g., Algebra)" required />
      </div>

      <button type="submit" className="recommend-button" disabled={loading}>
        {loading ? "Searching..." : "Get Recommendations"}
      </button>
    </form>
  );
};

export default SearchForm;
