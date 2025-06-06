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
    setUser(userData); // Set the user information in state
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
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
    </form>
  );
};

export default SignUp;
