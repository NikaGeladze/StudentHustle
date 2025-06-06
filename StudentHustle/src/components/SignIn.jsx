import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";

const SignIn = ({ setUser }) => {
  const [formData, setFormData] = useState({
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
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem("user", JSON.stringify(matchedUser)); // Save logged-in user data
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign In</h2>
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
      <button type="submit">Sign In</button>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          style={{
            background: "none",
            border: "none",
            color: "#6366f1",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignIn;
