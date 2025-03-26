import React, { useState } from "react";

const Auth = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
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
        console.log(data)
    };

    return (
        <div>
            <h2>User Sign-Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="first_name" name="first_name" placeholder="Name" onChange={handleChange} required /><br />
                <input type="last_name" name="last_name" placeholder="last_name" onChange={handleChange} required /><br />
                <input type="email" name="email" placeholder="email" onChange={handleChange} required /><br />
                <input type="password" name="password" placeholder="password" onChange={handleChange} required /><br />
                <input type="country" name="country" placeholder="country" onChange={handleChange} required /><br />
                <input type="state" name="state" placeholder="state" onChange={handleChange} required /><br />
                <label>Role:</label>
                <select name="role" onChange={handleChange} required>
                    <option value="">Select Role</option>  {/* Default placeholder */}
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select><br />
                <label>Language:</label>
                <select name="Language" onChange={handleChange} required>
                    <option value="">Select Language</option>  {/* Default placeholder */}
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                </select><br />
                <label>Class:</label>
                <select name="class" onChange={handleChange} required>
                    <option value="">Select class</option>  {/* Default placeholder */}
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select><br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Auth;
