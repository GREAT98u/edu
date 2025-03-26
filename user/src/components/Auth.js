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
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Auth;
