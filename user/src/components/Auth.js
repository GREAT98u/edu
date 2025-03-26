import React, { useState } from "react";

function App() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        country: "",
        state: "",
        role: "Student",
        language: "English",
        class: "",
    });

    const [message, setMessage] = useState("");
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Signup API Call
    const handleSignup = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, class: parseInt(formData.class) }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("✅ Signup successful!");
            } else {
                setMessage("❌ Signup failed: " + data.message);
            }
        } catch (error) {
            setMessage("⚠️ Error: " + error.message);
        }
    };

    // Login API Call
    const handleLogin = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),

            });

            const data = await response.json();
            if (response.ok) {
                setMessage(`✅ Login successful! Role: ${data.role}`);
            } else {
                setMessage("❌ Login failed: " + data.message);
            }
        } catch (error) {
            setMessage("⚠️ Error: " + error.message);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Signup</h2>
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} /><br />
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} /><br />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
            <input type="text" name="country" placeholder="Country" onChange={handleChange} /><br />
            <input type="text" name="state" placeholder="State" onChange={handleChange} /><br />
            <select name="role" onChange={handleChange}>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
            </select><br />
            <input type="text" name="language" placeholder="Language" onChange={handleChange} /><br />
            <input type="number" name="class" placeholder="Class (only for students)" onChange={handleChange} /><br />
            <button onClick={handleSignup}>Signup</button>

            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleLoginChange} /><br />
            <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} /><br />
            <button onClick={handleLogin}>Login</button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default App;
