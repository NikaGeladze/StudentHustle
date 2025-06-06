import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";

const SignUp = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = `${formData.name} ${formData.surname}`.toLowerCase(); // Generate username
    const userData = { ...formData, username };

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (userExists) {
      alert("An account with this email already exists.");
      return;
    }

    // Save the new user to localStorage
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser(userData); // Set the user information in state
    localStorage.setItem("user", JSON.stringify(userData)); // Save logged-in user data to localStorage
    navigate("/"); // Redirect to the home page
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        required
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="surname"
        placeholder="Surname"
        value={formData.surname}
        required
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        required
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        required
        onChange={handleInputChange}
      />
      <button type="submit">Sign Up</button>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button
          type="button"
          onClick={() => navigate("/signin")}
          style={{
            background: "none",
            border: "none",
            color: "#6366f1",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Already have an account? Sign In
        </button>
      </div>
    </form>
  );
};

export default SignUp;
