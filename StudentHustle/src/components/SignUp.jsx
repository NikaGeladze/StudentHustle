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

function SignUp() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) {
      setError("User already exists.");
      setSuccess("");
      return;
    }
    users.push({ name, surname, email, password });
    saveUsers(users);
    setSuccess("Account created! You can now sign in.");
    setError("");
    setTimeout(() => navigate("/signin"), 1500); // Redirect to SignIn page
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        required
        onChange={(e) => setSurname(e.target.value)}
      />
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
      <button type="submit">Sign Up</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <div className="redirect-link">
        <button type="button" onClick={() => navigate("/signin")}>
          Already have an account? Sign In
        </button>
      </div>
    </form>
  );
}

export default SignUp;
