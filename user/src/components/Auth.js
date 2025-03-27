import React, { useState } from "react";
import "./../styles/Auth.css"
import {Link} from 'react-router-dom';

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
        class_name: "" // Renamed from 'class' to 'class_name' to avoid keyword conflict
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://127.0.0.1:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        alert(data.message);
        console.log(data);
    };

    return (
        <div>
        <div className="background" id="background">
        <div className="signup-container">
          <h2>User Sign-Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="nameo">
            <input className="fullname" type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
            <input className="fullname" type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
            </div>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
            <input type="text" name="state" placeholder="State" onChange={handleChange} required />
  
            <label>Role:</label>
            <select name="role" onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
  
            <label>Language:</label>
            <select name="language" onChange={handleChange} required>
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
            </select>
  
            <label>Class:</label>
            <select name="class_name" onChange={handleChange} required>
              <option value="">Select Class</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
  
            <Link to = '/first'><button type="submit">Sign Up</button></Link>
          </form>
        </div>
      </div></div>
    );
};

export default Auth;
