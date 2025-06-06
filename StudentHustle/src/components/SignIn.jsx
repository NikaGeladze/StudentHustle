import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../auth.css";

// Utility functions for localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function SignIn({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    setUser(user); // Set the logged-in user
    navigate("/"); // Redirect to the home page
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
      {error && <div className="error">{error}</div>}
      <div className="redirect-link">
        <button type="button" onClick={() => navigate("/signup")}>
          Don't have an account? Sign Up
        </button>
      </div>
    </form>
  );
}

export default SignIn;
